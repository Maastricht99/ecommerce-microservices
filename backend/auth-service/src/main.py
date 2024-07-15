from fastapi import FastAPI, Request, Depends
from pydantic import BaseModel
import uvicorn
import config
from utils import decode_token, generate_token, is_password_valid, get_hashed_password, extract_token_from_headers
from db import engine, db_dependency
from models import Base, User, add_user, get_user_by_username

app = FastAPI()

Base.metadata.create_all(bind=engine)

class RegisterDTO(BaseModel):
    username: str
    password: str 
    role: str

@app.post("/register")
async def register(dto: RegisterDTO, db: db_dependency):
    db_user = get_user_by_username(dto.username, db)
    if db_user:
        raise Exception("User already exists.")
    hashed_password = get_hashed_password(dto.password)
    new_user = User(**{
        "username": dto.username,
        "password": hashed_password,
        "role": dto.role
    })
    add_user(new_user, db)
    token = generate_token(str(new_user.id), new_user.role)
    return { "token": token }

class LoginDTO(BaseModel):
    username: str
    password: str

@app.post("/login")
async def login(dto: LoginDTO, db: db_dependency):
    db_user = get_user_by_username(dto.username, db)
    if not db_user:
        raise Exception("User does not exist.")
    is_valid = is_password_valid(dto.password, db_user.password)
    if not is_valid:
        raise Exception("Password is not valid.")
    token = generate_token(str(db_user.id), db_user.role)
    return { "token": token }


@app.get("/authenticate")
async def authenticate(request: Request):
    token = extract_token_from_headers(request)
    if token is None:
        raise Exception("No token found in headers.")
    payload = decode_token(token)
    return payload

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=config.SERVER_PORT)