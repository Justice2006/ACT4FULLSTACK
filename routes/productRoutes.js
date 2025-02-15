const express = require('express');
const router = express.Router();

// Controladores
const productController = require('../controllers/productController');

// Rutas de productos
router.post('/productos', productController.createProduct);  // Crear producto
router.get('/productos', productController.getAllProducts);  // Obtener todos los productos
router.get('/productos/:id', productController.getProductById); // Obtener producto por ID
router.put('/productos/:id', productController.updateProduct); // Actualizar producto por ID
router.delete('/productos/:id', productController.deleteProduct); // Eliminar producto por ID

module.exports = router;
