// // config.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("MongoDB conectado");
//     } catch (error) {
//         console.error("Error al conectar MongoDB:", error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;

const connectDB = async () => {
    const MONGO_URI = "mongodb://db_food_service:27017/nutrifit_db"; // URL de conexión de Docker
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB conectado");
    } catch (error) {
        console.error("Error al conectar MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
