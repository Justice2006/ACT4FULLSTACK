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
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🔥 Conectado a MongoDB"))
  .catch((error) => console.error("❌ Error de conexión a MongoDB:", error));

// Rutas de autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Rutas de productos
const productRoutes = require('./routes/productRoutes');
const { protect } = require('./middlewares/authMiddleware');
app.use('/api/products', protect, productRoutes); // Usamos el middleware protect para las rutas de productos

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente! 🚀");
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`⚡ Servidor corriendo en http://localhost:${PORT}`);
});
