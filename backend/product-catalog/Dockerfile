FROM golang:1-alpine3.10 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o ./exec ./cmd

FROM golang:1-alpine3.10
WORKDIR /app
COPY --from=builder /app/exec .
CMD ["./exec"]
