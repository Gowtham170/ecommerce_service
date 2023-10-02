import express from 'express';
import { 
      getProducts, 
      getProductById, 
      createProduct, 
      updateProduct, 
      deleteProduct,
      createProductReview,
      getTopProducts
} from '../controller/product.js';

import checkAuth from '../util/checkAuth.js';
import isAdmin  from '../util/isAdmin.js';

const router = express.Router();

router.get('/products', getProducts)
      .post('/products', checkAuth, isAdmin, createProduct);
router.get('/products/top', getTopProducts);
router.get('/products/:id', getProductById)
      .put('/products/:id', checkAuth, isAdmin, updateProduct)
      .delete('/products/:id', checkAuth, isAdmin, deleteProduct);
router.post('/products/:id/reviews', checkAuth, createProductReview);

export default router;