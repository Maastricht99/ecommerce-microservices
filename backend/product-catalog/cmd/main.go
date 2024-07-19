package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type CreateProductRequest struct {
	Name  string
	Price float32
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

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Couldn't load .env file", err)
	}

	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	connectionUri := fmt.Sprintf("mongodb://%s:%s@%s:%s/%s?authSource=admin", dbUser, dbPassword, dbHost, dbPort, dbName)

	fmt.Println(connectionUri)

	clientOptions := options.Client().ApplyURI(connectionUri)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connection to mongo db successful")
}
