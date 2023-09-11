import { Order } from "../model/index.js";

const createOrder = async (req, res) => {
    try {
        console.log(req.user);
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            totalPrice
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400).json('No  order items');
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
        const orders = await Order.find({ }).populate('user', 'id name');
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
        if (order) {
            return res.status(200).json(order);
        } else {
            return res.status(404).json('Order not found');
        }
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

const updateOrderToPaid = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            }

            const updateOrder = await order.save();

            res.status(200).json(updateOrder);
        } else {
            res.status(404).json('Order not found');
        }
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

const updateOrderToDelivered = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id);
        console.log(order); 
        if(order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();

            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json('Order not found');
        }
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

export {
    createOrder,
    getOrders,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered
}