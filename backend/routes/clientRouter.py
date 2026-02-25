from fastapi import APIRouter,HTTPException
from database import client_collection
from models.clientModel import Client,ClientPatch
from clientSchema import all_clients
from bson import ObjectId

clientRouter = APIRouter()


@clientRouter.get("/clients")
async def get_clients():
    try:
        clients = client_collection.find()
        return all_clients(clients)
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"{e}") 
    
@clientRouter.post("/client")
async def create_client(client:Client):
    try:
        client = client_collection.insert_one(dict(client))
        if not client.inserted_id:
            return HTTPException(status_code=400,detail="Failed to create client")
        return {"success":True,"id":str(client.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"{e}")
    
@clientRouter.patch("/client/{client_id}")
async def update_client(client_id:str,updated_client:ClientPatch):
    try:
        id = ObjectId(client_id)
        existing_client = client_collection.find_one({"_id":id})
        if not existing_client:
            raise HTTPException(status_code=404,detail="Client not found")
        update_data = {k:v for k,v in dict(updated_client).items() if v is not None}
        if not update_data:
            raise HTTPException(status_code=400,detail="No valid fields provided for update")
        resp = client_collection.update_one({"_id":id},{"$set":dict(updated_client)})
        if resp.modified_count == 0:
            raise HTTPException(status_code=400,detail="No changes applied")
        return {"success":True,"message":"Client Updated Successfully"}
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"{e}")
    
@clientRouter.delete("/client/remove/{client_id}")
async def delete_client(client_id:str):
    try:
        id = ObjectId(client_id)
        exisiting_client = client_collection.find_one({"_id":id})
        if not exisiting_client:
            raise HTTPException(status_code=404,detail="Client not found")
        resp = client_collection.delete_one({"_id":id})
        return {"success":True,"message":"Client deleted succesfully"}
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"{e}")