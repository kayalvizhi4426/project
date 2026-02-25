
# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi

# uri = "mongodb+srv://Kayalvizhi:kayal123@lab.2n0vszp.mongodb.net/?appName=Lab"

# # Create a new client and connect to the server
# client = MongoClient(uri, server_api=ServerApi('1'))


# db = client["testdb"]
# client_collection = db["clients"]

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

# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv

# # Load .env file
# load_dotenv()

# # Get MongoDB URL from .env
# MONGO_URL = os.getenv("MONGO_URL")

# # Connect to MongoDB Atlas
# client = MongoClient(MONGO_URL)

# # Create / Connect Database
# db = client["labdb"]

# # Create / Connect Collection
# equipment_collection = db["equipment"]
