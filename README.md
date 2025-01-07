# NutriFit

NutriFit es una aplicación web diseñada para ayudar a los usuarios a gestionar su nutrición y actividades físicas mediante un sistema de perfiles, metas personalizadas y registro de actividades.

## Contenido

- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Tecnologías utilizadas](#tecnologías-utilizadas)

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Docker**: [Descargar Docker](https://www.docker.com/)
- **Docker Compose**: Incluido con Docker Desktop.
- **Node.js** (si deseas ejecutar el frontend sin Docker): [Descargar Node.js](https://nodejs.org/)
- **Python 3.9+** (si deseas ejecutar los microservicios sin Docker): [Descargar Python](https://www.python.org/)

---

## Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu_usuario/nutrifit.git
   cd nutrifit

2. **Configurar variables de entorno**:
    Crea un archivo .env en la raíz del proyecto y configura las siguientes variables según sea necesario:
    ```bash
    USER_SERVICE_URL=http://user_service:5000
    FOOD_SERVICE_URL=http://food_service:3001

## Configuración

- **MySQL**: Los scripts de inicialización de la base de datos están en docker/mysql/init/.
- **MongoDB**: Los datos iniciales para MongoDB se encuentran en docker/mongo/init/.

## Ejecución

1. **Levantar los contenedores con Docker Compose**: Desde la raíz del proyecto, ejecuta:
    ```bash
    docker-compose up --build

2. **Acceder a la aplicación**:
    Frontend: http://localhost:3000

3. **Parar los contenedores**: Para detener todos los servicios, usa:
    docker-compose down

## Tecnologías utilizadas

1. Frontend:
    - React
    - CSS

2. Backend:
    - Flask (User Service)
    - Node.js (Food Service)
    - FastAPI (API Gateway)

3. Base de datos:
    - MySQL (User Service)
    - MongoDB (Food Service)

4. Contenerización:
    - Docker
    - Docker Compose