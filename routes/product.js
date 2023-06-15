import express from 'express';
import { getProducts, getProductById } from '../controller/product.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);


export default router;