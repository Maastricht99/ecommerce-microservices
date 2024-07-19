FROM golang:latest AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o ./exec ./cmd

FROM golang:latest
WORKDIR /app
COPY --from=builder /app/exec .
CMD ["./exec"]
