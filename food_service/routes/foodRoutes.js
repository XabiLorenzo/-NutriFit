const express = require("express");
const axios = require("axios");
const Food = require("../models/Food");

const router = express.Router();

/**
 * Ruta para obtener y guardar un alimento de Open Food Facts
 */
router.post("/fetch-and-save", async (req, res) => {
    const { barcode } = req.body;

    if (!barcode) {
        return res.status(400).json({ message: "El código de barras es obligatorio" });
    }

    try {
        const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
        const product = response.data.product;

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado en Open Food Facts" });
        }

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

        const newFood = new Food(foodData);
        await newFood.save();

        res.status(201).json({ message: "Alimento guardado correctamente", food: newFood });
    } catch (error) {
        console.error("Error al obtener o guardar el alimento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

/**
 * Ruta para obtener y guardar múltiples alimentos de Open Food Facts
 */
router.post("/batch-fetch-and-save", async (req, res) => {
    const { barcodes } = req.body;

    if (!barcodes || !Array.isArray(barcodes)) {
        return res.status(400).json({ message: "Debe proporcionar una lista de códigos de barras" });
    }

    const savedFoods = [];
    const errors = [];

    for (const barcode of barcodes) {
        try {
            const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
            const product = response.data.product;

            if (!product) {
                errors.push(`Producto no encontrado para el código de barras ${barcode}`);
                continue;
            }

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

            const newFood = new Food(foodData);
            await newFood.save();

            savedFoods.push(newFood);
        } catch (error) {
            console.error(`Error al procesar el código de barras ${barcode}:`, error);
            errors.push(`Error al procesar el código de barras ${barcode}`);
        }
    }

    res.status(207).json({
        message: "Proceso completado",
        savedFoods,
        errors,
    });
});

/**
 * Ruta para obtener un alimento por ID
 */
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const food = await Food.findById(id);

        if (!food) {
            return res.status(404).json({ message: "Alimento no encontrado" });
        }

        res.status(200).json(food);
    } catch (error) {
        console.error("Error al obtener el alimento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

/**
 * Ruta para obtener todos los alimentos almacenados
 */
router.get("/", async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        console.error("Error al obtener los alimentos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

/**
 * Ruta para eliminar un alimento por ID
 */
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFood = await Food.findByIdAndDelete(id);

        if (!deletedFood) {
            return res.status(404).json({ message: "Alimento no encontrado" });
        }

        res.status(200).json({ message: "Alimento eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el alimento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

/**
 * Ruta para registrar manualmente un alimento
 */
router.post("/manual", async (req, res) => {
    const {
        name,
        description,
        type,
        quantity,
        quantity_unit,
        calories,
        protein,
        carbs,
        fat,
        saturated_fat,
        sugar,
        sodium,
        fiber,
        source_url,
    } = req.body;

    if (!name || !type || !calories) {
        return res.status(400).json({ message: "Nombre, tipo y calorías son obligatorios" });
    }

    try {
        const newFood = new Food({
            name,
            description: description || "Sin descripción",
            type,
            quantity: quantity || 0,
            quantity_unit: quantity_unit || "",
            calories,
            protein: protein || 0,
            carbs: carbs || 0,
            fat: fat || 0,
            saturated_fat: saturated_fat || 0,
            sugar: sugar || 0,
            sodium: sodium || 0,
            fiber: fiber || 0,
            source_url: source_url || "Sin fuente",
        });

        await newFood.save();
        res.status(201).json({ message: "Alimento registrado manualmente", food: newFood });
    } catch (error) {
        console.error("Error al registrar manualmente el alimento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;
