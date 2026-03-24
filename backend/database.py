# from pymongo import MongoClient
# MONGO_URI = "mongodb+srv://Kayalvizhi:<db_password>@lab.2n0vszp.mongodb.net/?appName=Lab"  
# client = MongoClient(MONGO_URI)
# db = client["lab_dashboard"]  
# users_collection = db["users"]
# profile_collection = db["profiles"]
# collabration_collection = db["collaboration"]
# dashboard_collection = db["dashboard"]
# client_collection = db["client"]
# equipment_collection = db["equipment"]
# labbooking_collection = db["labbooking"]
# # lab_collection = db["lab_bookings"]

from pymongo import MongoClient

# MongoDB Atlas Connection
MONGO_URI = "mongodb+srv://Kayalvizhi:<db_password>@lab.2n0vszp.mongodb.net/?appName=Lab"

client = MongoClient(MONGO_URI)

# Database Name
db = client["lab_dashboard"]
db = client["labdb"]

# Collections
users_collection = db["users"]
profile_collection = db["profiles"]
collaboration_collection = db["collabora tion"]
dashboard_collection = db["dashboard"]
client_collection = db["client"]
equipment_collection = db["equipment"]
labbooking_collection = db["labbooking"]

