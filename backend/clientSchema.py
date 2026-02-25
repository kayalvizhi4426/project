def client_data(client):
    return {
        "id":str(client["_id"]),
        "company":client["company"],
        "contact":client["contact"],
        "email":client["email"],
        "industry":client["industry"],
        "project":client["project"],
        "startDate":client["startDate"],
        "status":client["status"]
    }

def all_clients(clients):
    return [client_data(client) for client in clients]