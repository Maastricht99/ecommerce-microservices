package store

import (
	"context"
	"fmt"
	"product-catalog/config"
	"product-catalog/types"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Store interface {
	Init() error
	GetAllProducts() (any, error)
	CreateProduct(types.Product) (any, error)
}

type MongoStore struct {
	client *mongo.Client
}

func (s *MongoStore) Init() error {
	connectionUri := fmt.Sprintf("mongodb://%s:%s@%s:%s/%s?authSource=admin", config.Env.DBUser, config.Env.DBPassword, config.Env.DBHost, config.Env.DBPort, config.Env.DBName)

	clientOptions := options.Client().ApplyURI(connectionUri)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return err
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return err
	}

	s.client = client

	return nil
}

func (s *MongoStore) GetAllProducts() (any, error) {
	collection := s.client.Database(config.Env.DBName).Collection("products")
	cursor, err := collection.Find(context.TODO(), bson.M{})
	if err != nil {
		return nil, err
	}

	var results []bson.M
	if err = cursor.All(context.TODO(), &results); err != nil {
		return nil, err
	}

	return results, nil
}

func (s *MongoStore) CreateProduct(product types.Product) (any, error) {
	collection := s.client.Database(config.Env.DBName).Collection("products")

	result, err := collection.InsertOne(context.TODO(), product)
	if err != nil {
		return nil, err
	}

	return result, nil
}
