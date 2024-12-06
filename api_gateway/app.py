from fastapi import FastAPI
from routers import user_routes, food_routes

app = FastAPI()

# Registrar las rutas de los microservicios
app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(food_routes.router, prefix="/foods", tags=["Foods"])

@app.get("/")
def root():
    return {"message": "API Gateway is running!"}

