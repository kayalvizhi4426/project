
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



# # ================= EQUIPMENT MODEL =================

# class Equipment(BaseModel):
#     image: str
#     equipmentName: str
#     equipmentCount: str


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

