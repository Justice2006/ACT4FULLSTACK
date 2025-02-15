require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Conexión a MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔥 Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB:", error);
    process.exit(1);  // Detener el proceso si no puede conectar
  }
}

connectToDatabase();

// Rutas de autenticación
const authRoutes = require('./routes/authroutes.js');
app.use('/api/auth', authRoutes);

// Rutas de productos
const productRoutes = require('./routes/productRoutes.js');
const { protect } = require('./middlewares/authMiddleware.js');
app.use('/api/products', protect, productRoutes); // Usamos el middleware protect para las rutas de productos

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente! 🚀");
});

// Iniciar servidor solo si no estamos en entorno de pruebas
if (process.env.NODE_ENV !== 'test') {
  // No es necesario especificar un puerto fijo, Vercel asigna uno dinámicamente
  app.listen(process.env.PORT || 3000, () => {
    console.log(`⚡ Servidor corriendo en el puerto: ${process.env.PORT || 3000}`);
  });
}

module.exports = app;  // Exportamos la app para las pruebas
