from pydantic import BaseModel,EmailStr
from typing import Optional

class Client(BaseModel):
    company:str
    contact:str
    email:EmailStr
    industry:str
    project:str
    startDate:str
    status:str

class ClientPatch(BaseModel):
    company:Optional[str] = None
    contact:Optional[str] = None
    email:Optional[str] = None
    industry:Optional[str] = None
    project:Optional[str] = None
    startDate:Optional[str] = None
    status:Optional[str] = None