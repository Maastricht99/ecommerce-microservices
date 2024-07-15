from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from db import Base
import uuid

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)
