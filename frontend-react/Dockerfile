# Utiliza una imagen oficial de Node.js para construir el proyecto
FROM node:18 AS build

WORKDIR /app

# Copia los archivos necesarios para construir el frontend
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Usa una imagen de Nginx para servir la aplicación
FROM nginx:1.23

# Copia los archivos generados por el build de React al servidor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80 para Nginx
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]

