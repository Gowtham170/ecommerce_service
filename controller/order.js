import { Order } from "../model/index.js";

const createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            totalPrice
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400).json('No order items');
        }

        const newOrder = new Order({
            orderItems: orderItems.map((current_item) => ({
                ...current_item,
                product: current_item._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            totalPrice
        });

        const order = await newOrder.save();
        return res.status(201).json(order);
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

const getMyOrders = async (req, res) => {
    res.send('get my orders');
}

const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id).populate('user', 'name email');
        if(order) {
            return res.status(200).json(order);
        } else {
            return res.status(404).json('Order not found');
        }
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

const updateOrderToPaid = async (req, res) => {
    res.send('update to order paid');
}

const updateOrderToDelivered = async (req, res) => {
    res.send('update order to delivered');
}

export {
    createOrder,
    getOrders,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered
}