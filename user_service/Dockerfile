FROM python:3.9-slim

WORKDIR /app

# Copia el archivo requirements.txt desde la raíz del proyecto
COPY requirements.txt ./requirements.txt

# Instala las dependencias desde el archivo copiado
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo el contenido de la carpeta user_service al contenedor
COPY user_service/ .

# Exponer el puerto 5000
EXPOSE 5000

# Comando para ejecutar el microservicio
CMD ["flask", "--app", "app.py", "run", "--host=0.0.0.0", "--port=5000"]

