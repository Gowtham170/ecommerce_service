import { Product } from "../model/index.js";

//get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

//get specific products
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Product.findById(id);
        return res.status(200).json({products});
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

export { getProducts, getProductById }