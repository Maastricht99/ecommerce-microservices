from fastapi import FastAPI, Request, Depends
from pydantic import BaseModel
import uvicorn
import config
from util import *
from db import engine, db_dependency, Base
from model import User

app = FastAPI()

Base.metadata.create_all(bind=engine)

fake_db = {
    "xxx": {
        "id": "xxx",
        "username": "xxx",
        "password": "xxx",
        "role": "xxx"
    }
}

class RegisterDTO(BaseModel):
    username: str
    password: str 
    role: str

@app.post("/register")
async def register(dto: RegisterDTO, db: db_dependency):
    db_user = db.query(User).filter(User.username == dto.username).first()
    if db_user:
        raise Exception()
    hashed_password = get_hashed_password(dto.password)
    new_user = User(**{
        "id": dto.username,
        "username": dto.username,
        "password": hashed_password,
        "role": dto.role
    })
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    token = generate_token(new_user["id"], new_user["role"])
    return {
        "token": token
    }

class LoginDTO(BaseModel):
    username: str
    password: str

@app.post("/login")
async def login(dto: LoginDTO, db: db_dependency):
    db_user = db.query(User).filter(User.username == dto.username).first()
    if not db_user:
        raise Exception()
    is_valid = is_password_valid(dto.password, db_user.password)
    if not is_valid:
        raise Exception()
    token = generate_token(db_user.id, db_user.role)
    return token


@app.get("/authenticate")
async def authenticate(request: Request):
    auth_header = request.headers.get("Authorization")
    if auth_header is None or not auth_header.startswith("Bearer "):
        raise Exception()
    token = auth_header.split(" ")[1]
    payload = None
    try:
        payload = decode_token(token)
    except Exception:
        raise Exception()
    if not payload:
        raise Exception()
    return payload

if __name__ == "__main__":
    uvicorn.run(app, port=config.SERVER_PORT)