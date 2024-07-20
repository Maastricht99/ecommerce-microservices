package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"product-catalog/store"
	"product-catalog/types"
	"product-catalog/util"
	"strings"

	"github.com/google/uuid"
)

type ApiServer struct {
	ListenAddr string
	Store      store.Store
}

func NewApiServer(listenAddr string, store store.Store) *ApiServer {
	return &ApiServer{
		ListenAddr: listenAddr,
		Store:      store,
	}
}

func (s *ApiServer) Run() {
	if err := s.Store.Init(); err != nil {
		log.Fatal(err)
	}

	mux := http.NewServeMux()

	mux.HandleFunc("GET /products", util.MakeHandler(s.HandleGetAllProducts))
	mux.HandleFunc("POST /products", util.MakeHandler(s.HandleCreateProduct))

	http.ListenAndServe(":"+s.ListenAddr, mux)
}

func (s *ApiServer) HandleGetAllProducts(w http.ResponseWriter, r *http.Request) error {
	products, err := s.Store.GetAllProducts()
	if err != nil {
		return err
	}

	return util.SendJSONResponse(w, 200, products)
}

func (s *ApiServer) HandleCreateProduct(w http.ResponseWriter, r *http.Request) error {
	var req types.CreateProductRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		return err
	}

	defer r.Body.Close()

	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return fmt.Errorf("authorization header missing")
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	userID, err := util.ValidateToken(tokenString)
	if err != nil {
		return fmt.Errorf("invalid token")
	}

	uuid, err := uuid.NewRandom()
	if err != nil {
		return nil
	}

	product := types.Product{
		ID:     uuid.String(),
		UserID: userID,
		Name:   req.Name,
		Price:  req.Price,
	}

	result, err := s.Store.CreateProduct(product)
	if err != nil {
		return err
	}

	return util.SendJSONResponse(w, 201, result)

}
