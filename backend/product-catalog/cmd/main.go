package main

import (
	"product-catalog/api"
	"product-catalog/config"
	"product-catalog/store"
)

func main() {
	var store store.MongoStore
	server := api.NewApiServer(config.Env.ServerPort, &store)
	server.Run()
}
