import express from "express";
import {
    createOrder,
    getOrders,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered
} from '../controller/order.js';
import checkAuth from "../util/checkAuth.js";
import isAdmin  from '../util/isAdmin.js';

const router = express.Router();

router.post('/orders', checkAuth, createOrder)
    // admin route
    .get('/orders', checkAuth, isAdmin, getOrders);

router.get('/orders/myorders', checkAuth, getMyOrders);
router.put('/order/:id/pay', checkAuth, updateOrderToPaid);

// admin routes
router.get('/orders/:id', checkAuth, isAdmin, getOrderById);
router.put('/order/:id/deliver', checkAuth, isAdmin,updateOrderToDelivered);

export default router;