import express from "express";
import {
    createOrder,
    getOrders,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered
} from '../controller/order.js';

import isAdmin  from '../util/isAdmin.js';

const router = express.Router();

router.post('/orders', createOrder)
    // admin route
    .get('/orders', isAdmin, getOrders);

router.get('/orders/myorders', getMyOrders);
router.put('/orders/:id/pay', updateOrderToPaid);
router.get('/orders/:id', getOrderById);

// admin routes
router.put('/orders/:id/deliver', isAdmin,updateOrderToDelivered);

export default router;