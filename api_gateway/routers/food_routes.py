from fastapi import APIRouter, HTTPException
import requests

router = APIRouter()

FOOD_SERVICE_URL = "http://127.0.0.1:3001/api/foods"  # URL del microservicio food_service

@router.get("/{food_id}")
def get_food(food_id: str):
    response = requests.get(f"{FOOD_SERVICE_URL}/{food_id}")
    if response.status_code == 404:
        raise HTTPException(status_code=404, detail="Food not found")
    return response.json()
