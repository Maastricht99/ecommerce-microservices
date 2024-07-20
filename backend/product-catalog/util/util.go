package util

import (
	"encoding/json"
	"net/http"
	"product-catalog/config"
	"product-catalog/errors"

	"github.com/dgrijalva/jwt-go"
)

type CustomClaims struct {
	UserID string `json:"user_id"`
	jwt.StandardClaims
}

func ValidateToken(tokenString string) (string, error) {
	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(config.Env.JWTSecret), nil
	})

	if claims, ok := token.Claims.(*CustomClaims); ok && token.Valid {
		return claims.UserID, nil
	} else {
		return "", err
	}
}

func SendJSONResponse(w http.ResponseWriter, statusCode int, data any) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	return json.NewEncoder(w).Encode(data)
}

type handlerFunc func(w http.ResponseWriter, r *http.Request) error

func MakeHandler(h handlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := h(w, r); err != nil {
			if apiErr, ok := err.(errors.ApiError); ok {
				SendJSONResponse(w, apiErr.StatusCode, apiErr)
			} else {
				err := errors.InternalServerError()
				SendJSONResponse(w, err.StatusCode, err)
			}
		}
	}
}
