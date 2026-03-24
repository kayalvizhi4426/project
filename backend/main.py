# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from routes.clientRouter import clientRouter
# from routes.equipmentRouter import equipmentRouter

# from database import db
# from pydantic import BaseModel
# from typing import List
# from pymongo import MongoClient

# app = FastAPI()

# MONGO_URL = "mongodb+srv://23cs040_db_user:jNlP2VP5VMr06ZTF@cluster0.cimp7f8.mongodb.net/labdb"

# client = MongoClient(MONGO_URL)

# db = client["projectdb"]   # database name
# equipment_collection = db["equipment"]

# class Equipment(BaseModel):
#     name: str
#     type: str
#     price: float

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# def home():
#     return {"message": "Backend is running"}

# app.include_router(clientRouter)

# profile_collection = db["profile"]

# # Profile Schema
# class Profile(BaseModel):
#     lab_name: str
#     lab_type: str
#     department: str
#     contact_person: str
#     email: str
#     mobile: str
#     country: str
#     state: str
#     city: str 
#     area: str
#     pincode: str
#     systems: str
#     internet: str
#     facilities: List[str]


# # ✅ SAVE PROFILE (POST)
# @app.post("/profile")
# def save_profile(profile: Profile):
#     data = profile.model_dump() 
#     result= profile_collection.insert_one(data)
#     return {"success":True,"message": "Profile Saved Successfully","id":str(result.inserted_id)}


# # ✅ GET PROFILE (GET)
# @app.get("/profile")
# def get_profile():
#     data = profile_collection.find_one()
#     if data:
#         data["_id"] = str(data["_id"])
#         return data
#     return {}
# app.include_router(equipmentRouter)@app.post("/equipment")
# def add_equipment(equipment: Equipment):
#     data = equipment.model_dump()
#     result = equipment_collection.insert_one(data)
#     return {
#         "success": True,
#         "message": "Equipment Added",
#         "id": str(result.inserted_id)
#     }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.clientRouter import clientRouter
from routes.equipmentRouter import equipmentRouter
from database import equipment_collection
from routes.labbookingRouter import router as labbooking_router
from pydantic import BaseModel
from typing import List
from pymongo import MongoClient

app = FastAPI()

# ✅ MongoDB Atlas Connection
MONGO_URL = "mongodb+srv://Kayalvizhi:<db_password>@lab.2n0vszp.mongodb.net/?appName=Lab"

client = MongoClient(MONGO_URL)

db = client["labdb"]

equipment_collection = db["equipment"]
profile_collection = db["profile"]

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Home API
@app.get("/")
def home():
    return {"message": "Backend is running"}

# ✅ Routers
app.include_router(clientRouter)
app.include_router(equipmentRouter)
app.include_router(labbooking_router)


# ===============================
# PROFILE MODEL
# ===============================

class Profile(BaseModel):
    lab_name: str
    lab_type: str
    department: str
    contact_person: str
    email: str
    mobile: str
    country: str
    state: str
    city: str
    area: str
    pincode: str
    systems: str
    internet: str
    facilities: List[str]


# ✅ SAVE PROFILE
@app.post("/profile")
def save_profile(profile: Profile):
    data = profile.model_dump()
    result = profile_collection.insert_one(data)

    return {
        "success": True,
        "message": "Profile Saved Successfully",
        "id": str(result.inserted_id)
    }


# ✅ GET PROFILE
@app.get("/profile")
def get_profile():
    data = profile_collection.find_one()

    if data:
        data["_id"] = str(data["_id"])
        return data

    return {}


# ===============================
# EQUIPMENT MODEL
# ===============================

class Equipment(BaseModel):
    name: str
    type: str
    price: float


# ✅ ADD EQUIPMENT
@app.post("/equipment")
def add_equipment(equipment: Equipment):

    data = equipment.model_dump()

    result = equipment_collection.insert_one(data)

    return {
        "success": True,
        "message": "Equipment Added",
        "id": str(result.inserted_id)
    }


# ✅ GET EQUIPMENT
# @app.get("/equipment")
# def get_equipment():

#     data = list(equipment_collection.find())

#     for item in data:
#         item["_id"] = str(item["_id"])

#     return data
@app.get("/equipment")
def get_equipment():

    equipments = []

    for eq in equipment_collection.find():
        eq["_id"] = str(eq["_id"])
        equipments.append(eq)

    return equipments

from fastapi.responses import FileResponse

@app.get("/favicon.ico")
async def favicon():     return FileResponse("favicon.ico") 