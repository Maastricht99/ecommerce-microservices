from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import config

app = FastAPI()

class RegisterDTO(BaseModel):
    username: str
    password: str 

@app.post("/register")
async def register(dto: RegisterDTO):
    return dto

if __name__ == "__main__":
    uvicorn.run(app, port=config.SERVER_PORT)