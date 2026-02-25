# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from routes.clientRouter import clientRouter

# app = FastAPI()

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

# @app.get("/profile")
# def get_profile():
#     return {
#         "name": "Kayal",
#         "role": "Lab Admin",
#         "department": "Research Lab"
#     }

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from routes.clientRouter import clientRouter
# from pydantic import BaseModel
# from database import equipment_collection
# from bson import ObjectId

# app = FastAPI()

# # CORS Settings
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ------------------------
# # HOME ROUTE
# # ------------------------
# @app.get("/")
# def home():
#     return {"message": "Backend is running"}

# # ------------------------
# # PROFILE ROUTE
# # ------------------------
# @app.get("/profile")
# def get_profile():
#     return {
#         "name": "Kayal",
#         "role": "Lab Admin",
#         "department": "Research Lab"
#     }

# # ------------------------
# # INCLUDE EXISTING ROUTER
# # ------------------------
# app.include_router(clientRouter)

# # ============================
# # EQUIPMENT SECTION START
# # ============================

# # Equipment Schema
# class Equipment(BaseModel):
#     name: str
#     type: str
#     quantity: int
#     lab: str
#     condition: str


# # POST - Add Equipment
# @app.post("/equipment")
# def add_equipment(equipment: Equipment):
#     data = equipment.dict()
#     result = equipment_collection.insert_one(data)
#     return {
#         "message": "Equipment added successfully",
#         "id": str(result.inserted_id)
#     }


# # GET - Get All Equipment
# @app.get("/equipment")
# def get_equipment():
#     equipments = []
#     for item in equipment_collection.find():
#         item["_id"] = str(item["_id"])
#         equipments.append(item)
#     return equipments

# # ============================
# # EQUIPMENT SECTION END
# # ============================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.clientRouter import clientRouter
from routes.equipmentRouter import equipmentRouter


# ✅ NEW IMPORTS ADDED
from database import db
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend is running"}

app.include_router(clientRouter)

# ===================================================
# 🔥 PROFILE SECTION (MongoDB Connected Version)
# ===================================================

# MongoDB Collection
profile_collection = db["profile"]

# Profile Schema
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


# ✅ SAVE PROFILE (POST)
@app.post("/profile")
def save_profile(profile: Profile):
    data = profile.model_dump() 
    result= profile_collection.insert_one(data)
    return {"success":True,"message": "Profile Saved Successfully","id":str(result.inserted_id)}


# ✅ GET PROFILE (GET)
@app.get("/profile")
def get_profile():
    data = profile_collection.find_one()
    if data:
        data["_id"] = str(data["_id"])
        return data
    return {}
app.include_router(equipmentRouter)

# ================= CORS =================
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ================= USER MODEL =================

# class User(BaseModel):
#     name: str
#     email: str
#     password: str


# # ================= PROFILE MODEL =================

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
#     area: str = ""
#     pincode: str = ""
#     systems: str = ""
#     internet: str = ""
#     facilities: List[str] = []


# # ================= CLIENT MODEL =================

# class Client(BaseModel):
#     company: str
#     contact: str
#     email: str
#     industry: str
#     project: str
#     startDate: str
#     status: str


# # ================= EQUIPMENT MODEL =================

# class Equipment(BaseModel):
#     image: str
#     equipmentName: str
#     equipmentCount: str


# # ================= COLLECTIONS =================

# clients_collection = database.db["clients"]
# equipment_collection = database.db["equipment"]


# # ================= HOME =================

# @app.get("/")
# def home():
#     return {"message": "FastAPI + MongoDB API running 🚀"}


# # ================= USERS APIs =================

# @app.get("/users")
# def get_users():
#     return list(database.users_collection.find({}, {"_id": 0}))


# @app.post("/users")
# def create_user(user: User):
#     database.users_collection.insert_one(user.dict())
#     return {
#         "status": "success",
#         "message": "User added successfully"
#     }


# # ================= PROFILES APIs =================

# @app.get("/profiles")
# def get_profiles():
#     return list(database.profile_collection.find({}, {"_id": 0}))


# @app.post("/profiles")
# def create_profile(profile: Profile):
#     database.profile_collection.insert_one(profile.dict())
#     return {
#         "status": "success",
#         "message": "Lab profile created successfully"
#     }


# # ================= CLIENT APIs =================

# @app.get("/clients")
# def get_clients():

#     clients = []

#     for c in clients_collection.find():
#         clients.append({
#             "_id": str(c["_id"]),
#             "company": c["company"],
#             "contact": c["contact"],
#             "email": c["email"],
#             "industry": c["industry"],
#             "project": c["project"],
#             "startDate": c["startDate"],
#             "status": c["status"],
#         })

#     return clients


# @app.post("/clients")
# def create_client(client: Client):

#     new_client = client.dict()
#     result = clients_collection.insert_one(new_client)

#     return {
#         "_id": str(result.inserted_id),
#         **new_client
#     }


# @app.put("/clients/{client_id}")
# def update_client(client_id: str, client: Client):

#     clients_collection.update_one(
#         {"_id": ObjectId(client_id)},
#         {"$set": client.dict()}
#     )

#     return {
#         "status": "success",
#         "message": "Client updated successfully"
#     }


# @app.delete("/clients/{client_id}")
# def delete_client(client_id: str):

#     clients_collection.delete_one(
#         {"_id": ObjectId(client_id)}
#     )

#     return {
#         "status": "success",
#         "message": "Client deleted successfully"
#     }


# # ================= EQUIPMENT APIs =================

# # -------- GET EQUIPMENT --------
# @app.get("/equipment")
# def get_equipment():

#     equipment_list = []

#     for e in equipment_collection.find():
#         equipment_list.append({
#             "_id": str(e["_id"]),
#             "image": e["image"],
#             "equipmentName": e["equipmentName"],
#             "equipmentCount": e["equipmentCount"],
#         })

#     return equipment_list


# # -------- ADD EQUIPMENT --------
# @app.post("/equipment")
# def add_equipment(item: Equipment):

#     new_item = item.dict()
#     result = equipment_collection.insert_one(new_item)

#     return {
#         "_id": str(result.inserted_id),
#         **new_item
#     }

