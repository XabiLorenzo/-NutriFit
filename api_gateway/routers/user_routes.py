from fastapi import APIRouter, HTTPException, Header
import requests

router = APIRouter()
# USER_SERVICE_URL = "http://127.0.0.1:5000"  # URL del user_service
USER_SERVICE_URL = "http://user_service:5000"

# Ruta para registrar un usuario
@router.post("/register")
def register_user(data: dict):
    response = requests.post(f"{USER_SERVICE_URL}/register", json=data)
    if response.status_code != 201:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return response.json()

# Ruta para iniciar sesión
@router.post("/login")
def login_user(data: dict):
    response = requests.post(f"{USER_SERVICE_URL}/login", json=data)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return response.json()

# Ruta para obtener detalles de un usuario por ID
@router.get("/users/{user_id}")
def get_user(user_id: int, authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header is required")
    token = authorization.split(" ")[1]  # Extrae el token del header Authorization
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{USER_SERVICE_URL}/users/{user_id}", headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return response.json()

# Ruta para actualizar objetivos nutricionales
@router.put("/users/{user_id}/goals")
def update_goals(user_id: int, data: dict, authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header is required")
    token = authorization.split(" ")[1]
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.put(f"{USER_SERVICE_URL}/users/{user_id}/goals", json=data, headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return response.json()

# Ruta para registrar una actividad
@router.post("/users/{user_id}/activity")
def add_activity(user_id: int, data: dict, authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header is required")
    token = authorization.split(" ")[1]
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(f"{USER_SERVICE_URL}/users/{user_id}/activity", json=data, headers=headers)
    if response.status_code != 201:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return response.json()

# Ruta para consultar actividades
@router.get("/users/{user_id}/activity")
def get_activities(user_id: int, authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header is required")
    token = authorization.split(" ")[1]
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{USER_SERVICE_URL}/users/{user_id}/activity", headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return response.json()
