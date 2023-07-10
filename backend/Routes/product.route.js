const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require('../Controllers/product.controller.js');

const express = require('express');
const productRouter = express.Router();

productRouter.get('/getProducts', getAllProducts);
productRouter.get('/getProduct/:id', getProductById);
productRouter.post('/createProduct', createProduct);
productRouter.put('/updateProduct/:id', updateProductById);
productRouter.delete('/deleteProduct/:id', deleteProductById);

module.exports = productRouter;
