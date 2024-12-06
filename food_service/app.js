// app.js
const express = require("express");
const connectDB = require("./config");

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar a MongoDB
connectDB();

// Middleware para analizar JSON
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Food Service is running");
});

app.listen(PORT, () => {
    console.log(`Servidor de Food Service ejecutándose en el puerto ${PORT}`);
});
