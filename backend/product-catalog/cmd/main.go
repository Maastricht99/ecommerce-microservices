package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/google/uuid"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type CreateProductRequest struct {
	Name  string  `json:"name"`
	Price float32 `json:"price"`
}

type Product struct {
	ID    string  `bson:"_id,omitempty" json:"id,omitempty"`
	Name  string  `bson:"name" json:"name"`
	Price float32 `bson:"price" json:"price"`
}

type ApiError struct {
	StatusCode int
	Msg        any
}

func InternalServerError() *ApiError {
	return &ApiError{
		StatusCode: 500,
		Msg:        "Internal Server Error",
	}
}

func (e ApiError) Error() string {
	return fmt.Sprintf("Api error: %v", e.StatusCode)
}

type HandlerFunc func(w http.ResponseWriter, r *http.Request) error

func SendJSONResponse(w http.ResponseWriter, statusCode int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(data)
}

func Make(h HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := h(w, r); err != nil {
			if apiErr, ok := err.(ApiError); ok {
				SendJSONResponse(w, apiErr.StatusCode, apiErr)
			} else {
				err := InternalServerError()
				SendJSONResponse(w, err.StatusCode, err)
			}
		}
	}
}

type Config struct {
	serverPort string
	dbHost     string
	dbPort     string
	dbUser     string
	dbPassword string
	dbName     string
}

func LoadConfig() *Config {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Couldn't load .env file", err)
	}

	return &Config{
		serverPort: os.Getenv("SERVER_PORT"),
		dbHost:     os.Getenv("DB_HOST"),
		dbPort:     os.Getenv("DB_PORT"),
		dbUser:     os.Getenv("DB_USER"),
		dbPassword: os.Getenv("DB_PASSWORD"),
		dbName:     os.Getenv("DB_NAME"),
	}
}

var env = LoadConfig()

func InitDBClient() (*mongo.Client, error) {

	connectionUri := fmt.Sprintf("mongodb://%s:%s@%s:%s/%s?authSource=admin", env.dbUser, env.dbPassword, env.dbHost, env.dbPort, env.dbName)

	clientOptions := options.Client().ApplyURI(connectionUri)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return nil, err
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return nil, err
	}

	return client, nil
}

func main() {

	client, err := InitDBClient()
	if err != nil {
		log.Fatal(err)
	}

	mux := http.NewServeMux()

	mux.HandleFunc("GET /products", Make(func(w http.ResponseWriter, r *http.Request) error {
		collection := client.Database(env.dbName).Collection("products")
		cursor, err := collection.Find(context.TODO(), bson.M{})
		if err != nil {
			return err
		}

		var results []bson.M
		if err = cursor.All(context.TODO(), &results); err != nil {
			return err
		}

		SendJSONResponse(w, 200, results)
		return nil
	}))

	mux.HandleFunc("POST /products", Make(func(w http.ResponseWriter, r *http.Request) error {
		var req CreateProductRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			return err
		}

		defer r.Body.Close()

		uuid, err := uuid.NewRandom()
		if err != nil {
			return nil
		}

		product := Product{
			ID:    uuid.String(),
			Name:  req.Name,
			Price: req.Price,
		}

		collection := client.Database(env.dbName).Collection("products")

		_, err = collection.InsertOne(context.TODO(), product)
		if err != nil {
			return err
		}

		SendJSONResponse(w, 201, product.ID)

		return nil
	}))

	http.ListenAndServe(":"+env.serverPort, mux)
}
