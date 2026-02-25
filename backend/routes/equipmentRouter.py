from fastapi import APIRouter
from database import equipment_collection

equipmentRouter = APIRouter()

# POST - Add Equipment
@equipmentRouter.post("/equipment")
def add_equipment(data: dict):
    equipment_collection.insert_one(data)
    return {"message": "Equipment saved successfully"}

# GET - Get All Equipment
@equipmentRouter.get("/equipment")
def get_equipment():
    equipments = list(equipment_collection.find({}, {"_id": 0}))
    return equipments
