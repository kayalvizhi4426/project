

from pymongo import MongoClient
MONGO_URI = "mongodb+srv://Kayalvizhi:kayal123@lab.2n0vszp.mongodb.net/?appName=Lab"  
client = MongoClient(MONGO_URI)
db = client["lab_dashboard"]  
users_collection = db["users"]
profile_collection = db["profiles"]
collabration_collection = db["collaboration"]
dashboard_collection = db["dashboard"]
client_collection = db["client"]
equipment_collection = db["equipment"]


