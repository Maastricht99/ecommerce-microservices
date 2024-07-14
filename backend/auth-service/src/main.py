from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import config
from util import *

app = FastAPI()

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
async def register(dto: RegisterDTO):
    db_user = fake_db.get(dto.username)
    if db_user:
        raise Exception()
    hashed_password = get_hashed_password(dto.password)
    new_user = {
        "id": dto.username,
        "username": dto.username,
        "password": hashed_password,
        "role": dto.role
    }
    fake_db[new_user["id"]] = new_user
    token = generate_token(new_user["id"], new_user["role"])
    return token

class LoginDTO(BaseModel):
    username: str
    password: str

@app.post("/login")
async def login(dto: LoginDTO):
    db_user = fake_db.get(dto.username)
    if not db_user:
        raise Exception()
    is_valid = is_password_valid(dto.password, db_user.password)
    if not is_valid:
        raise Exception()
    token = generate_token(db_user.id, db_user.role)
    return token


@app.get("/authenticate")
async def authenticate():
    token = "xxx"
    payload = decode_token(token)
    if not payload:
        raise Exception()
    return payload

if __name__ == "__main__":
    uvicorn.run(app, port=config.SERVER_PORT)