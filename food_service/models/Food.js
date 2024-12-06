// models/Food.js
const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nombre del alimento
    description: { type: String, required: false }, // Descripción general
    type: { type: String, required: true }, // Tipo de alimento (ej. cereales, carne)
    quantity: { type: Number, required: false }, // Cantidad del producto
    quantity_unit: { type: String, required: false }, // Unidad de medida de la cantidad (g, ml, etc.)
    calories: { type: Number, required: true }, // Calorías totales
    protein: { type: Number, required: true }, // Proteínas en gramos
    carbs: { type: Number, required: true }, // Carbohidratos en gramos
    fat: { type: Number, required: true }, // Grasas en gramos
    saturated_fat: { type: Number, required: false }, // Grasas saturadas en gramos
    sugar: { type: Number, required: false }, // Azúcares en gramos
    sodium: { type: Number, required: false }, // Sodio en miligramos
    fiber: { type: Number, required: false }, // Fibra en gramos
    source_url: { type: String, required: false }, // Fuente externa de referencia
    createdAt: { type: Date, default: Date.now }, // Fecha de registro
});

module.exports = mongoose.model("Food", FoodSchema);
