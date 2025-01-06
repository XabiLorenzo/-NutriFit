FROM python:3.9-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo requirements.txt desde la raíz del proyecto
COPY ../requirements.txt ./requirements.txt

# Instala las dependencias desde el archivo copiado
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo el contenido de la carpeta api_gateway al contenedor
COPY ./ .

# Exponer el puerto 8000
EXPOSE 8000

# Comando para ejecutar el API Gateway
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]




