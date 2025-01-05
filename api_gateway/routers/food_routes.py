from fastapi import APIRouter, HTTPException, Header
import requests

router = APIRouter()
FOOD_SERVICE_URL = "http://127.0.0.1:3001/api/foods"  # URL del microservicio food_service

# Ruta para obtener un alimento por ID
@router.get("/{food_id}")
def get_food(food_id: str):
    response = requests.get(f"{FOOD_SERVICE_URL}/{food_id}")
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return response.json()

# Ruta para obtener todos los alimentos
@router.get("/")
def get_all_foods():
    response = requests.get(f"{FOOD_SERVICE_URL}")
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return response.json()

# Ruta para agregar un alimento por código de barras
@router.post("/fetch-and-save")
def fetch_and_save_food(data: dict):
    if "barcode" not in data:
        raise HTTPException(status_code=400, detail="El código de barras es obligatorio")
    response = requests.post(f"{FOOD_SERVICE_URL}/fetch-and-save", json=data)
    if response.status_code != 201:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return response.json()

# Ruta para agregar múltiples alimentos por código de barras
@router.post("/batch-fetch-and-save")
def batch_fetch_and_save(data: dict):
    if "barcodes" not in data or not isinstance(data["barcodes"], list):
        raise HTTPException(status_code=400, detail="Debe proporcionar una lista de códigos de barras")
    response = requests.post(f"{FOOD_SERVICE_URL}/batch-fetch-and-save", json=data)
    if response.status_code != 207:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return response.json()

# Ruta para registrar manualmente un alimento
@router.post("/manual")
def add_manual_food(data: dict):
    if "name" not in data or "type" not in data or "calories" not in data:
        raise HTTPException(status_code=400, detail="Nombre, tipo y calorías son obligatorios")
    response = requests.post(f"{FOOD_SERVICE_URL}/manual", json=data)
    if response.status_code != 201:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return response.json()

# Ruta para eliminar un alimento por ID
@router.delete("/{food_id}")
def delete_food(food_id: str):
    response = requests.delete(f"{FOOD_SERVICE_URL}/{food_id}")
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return response.json()
