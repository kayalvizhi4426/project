from fastapi import APIRouter
from database import labbooking_collection

router = APIRouter()

# ✅ CREATE LAB BOOKING
@router.post("/lab-booking")
async def create_labbooking(data: dict):

    booking = {
        "labName": data.get("labName"),
        "time": data.get("time"),
        "name": data.get("name"),
        "college": data.get("college"),
        "department": data.get("department"),
        "address": data.get("address"),
        "contact": data.get("contact"),
        "whatsapp": data.get("whatsapp")
    }

    result = labbooking_collection.insert_one(booking)

    return {
        "message": "Lab Booking Saved Successfully",
        "id": str(result.inserted_id)
    }