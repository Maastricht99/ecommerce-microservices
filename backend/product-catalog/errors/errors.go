package errors

import "fmt"

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
