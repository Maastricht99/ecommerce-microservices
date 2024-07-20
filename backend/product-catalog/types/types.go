package types

type CreateProductRequest struct {
	Name  string  `json:"name"`
	Price float32 `json:"price"`
}

type Product struct {
	ID     string  `bson:"_id,omitempty" json:"id,omitempty"`
	UserID string  `bson:"userId" json:"userId"`
	Name   string  `bson:"name" json:"name"`
	Price  float32 `bson:"price" json:"price"`
}
