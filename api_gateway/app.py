from fastapi import FastAPI
from routers import user_routes, food_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia esto a ["http://localhost:5173"] para mayor seguridad
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Registrar las rutas de los microservicios
app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(food_routes.router, prefix="/foods", tags=["Foods"])

@app.get("/")
def root():
    return {"message": "API Gateway is running!"}

