db = connect("mongodb://localhost:27017/nutrifit_db");

// Importar los datos exportados
const foods = [
  {
    "_id": ObjectId("6752c57e8c46b82a74057851"),
    "name": "Rice Noodles",
    "description": "Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning",
    "type": "en:cereals-and-potatoes",
    "quantity": 155,
    "quantity_unit": "g",
    "calories": 385,
    "protein": 9.62,
    "carbs": 71.15,
    "fat": 7.69,
    "saturated_fat": 1.92,
    "sugar": 13.46,
    "sodium": 0.288,
    "fiber": 1.9,
    "source_url": "https://api.nal.usda.gov/ndb/reports/?ndbno=45108002&type=f&format=json&api_key=DEMO_KEY",
    "createdAt": ISODate("2024-12-06T09:35:58.084Z"),
    "__v": 0
  },
  {
    "_id": ObjectId("67532b7830a48a5d517f9517"),
    "name": "Crème glacée caramel (9.9%) et éclats de biscuit (4.6%) enrobage cacao (32%)",
    "description": "Twix glacé x6",
    "type": "en:milk-and-dairy-products",
    "quantity": 258.6,
    "quantity_unit": "ml",
    "calories": 279,
    "protein": 2.9,
    "carbs": 34,
    "fat": 14,
    "saturated_fat": 8.9,
    "sugar": 27,
    "sodium": 0.079,
    "fiber": 0,
    "source_url": "Sin fuente",
    "createdAt": ISODate("2024-12-06T16:51:04.364Z"),
    "__v": 0
  },
  {
    "_id": ObjectId("67532b7830a48a5d517f9519"),
    "name": "Coca-Cola",
    "description": "Coca-Cola",
    "type": "en:beverages",
    "quantity": 330,
    "quantity_unit": "ml",
    "calories": 42,
    "protein": 0,
    "carbs": 10.6,
    "fat": 0,
    "saturated_fat": 0,
    "sugar": 10.6,
    "sodium": 0,
    "fiber": 0,
    "source_url": "https://www.openfood.ch/en/products/12929",
    "createdAt": ISODate("2024-12-06T16:51:04.532Z"),
    "__v": 0
  },
  {
    "_id": ObjectId("67532ea943c7814659d9455b"),
    "name": "Pan integral",
    "description": "Pan de trigo integral",
    "type": "en:bread",
    "quantity": 500,
    "quantity_unit": "g",
    "calories": 250,
    "protein": 8,
    "carbs": 48,
    "fat": 2,
    "saturated_fat": 0.5,
    "sugar": 4,
    "sodium": 0.4,
    "fiber": 6,
    "source_url": "https://example.com/pan-integral",
    "createdAt": ISODate("2024-12-06T17:04:41.586Z"),
    "__v": 0
  },
  {
    "_id": ObjectId("677ad8714348eb6177de2f1d"),
    "name": "Manzana Roja",
    "description": "Fruta fresca y dulce",
    "type": "Fruta",
    "quantity": 1,
    "quantity_unit": "pieza",
    "calories": 52,
    "protein": 0.3,
    "carbs": 14,
    "fat": 0.2,
    "saturated_fat": 0,
    "sugar": 10.4,
    "sodium": 0,
    "fiber": 2.4,
    "source_url": "Sin fuente",
    "createdAt": ISODate("2025-01-05T19:07:29.505Z"),
    "__v": 0
  }
];

// Inserta los alimentos en la colección "foods"
db.foods.insertMany(foods);

