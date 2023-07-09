const express = require('express');
const productRouter = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require('./path/to/your/productController');

productRouter.get('/products', getAllProducts);
productRouter.get('/products/:id', getProductById);
productRouter.post('/products', createProduct);
productRouter.put('/products/:id', updateProductById);
productRouter.delete('/products/:id', deleteProductById);

module.exports = productRouter;
