// routes/foodRoutes.js
const express = require("express");
const axios = require("axios");
const Food = require("../models/Food");

const router = express.Router();

// Ruta para obtener y guardar un alimento de Open Food Facts
router.post("/fetch-and-save", async (req, res) => {
    const { barcode } = req.body;

    if (!barcode) {
        return res.status(400).json({ message: "El código de barras es obligatorio" });
    }

    try {
        // Petición a Open Food Facts
        const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
        const product = response.data.product;

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado en Open Food Facts" });
        }

        // Extraer datos relevantes
        const foodData = {
            name: product.generic_name || product.product_name || "Desconocido",
            description: product.product_name || "Sin descripción",
            type: product.food_groups_tags?.[0] || "Otro",
            quantity: product.product_quantity || 0,
            quantity_unit: product.product_quantity_unit || "",
            calories: product.nutriments?.["energy-kcal"] || 0,
            protein: product.nutriments?.proteins || 0,
            carbs: product.nutriments?.carbohydrates || 0,
            fat: product.nutriments?.fat || 0,
            saturated_fat: product.nutriments?.["saturated-fat"] || 0,
            sugar: product.nutriments?.sugars || 0,
            sodium: product.nutriments?.sodium || 0,
            fiber: product.nutriments?.fiber || 0,
            source_url: product.sources?.[0]?.url || "Sin fuente",
        };

        // Guardar en MongoDB
        const newFood = new Food(foodData);
        await newFood.save();

        res.status(201).json({ message: "Alimento guardado correctamente", food: newFood });
    } catch (error) {
        console.error("Error al obtener o guardar el alimento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;
