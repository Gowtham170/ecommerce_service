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
        const product = await Product.findById(id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

//create product 
const createProduct = async (req, res) => {
    try {
        const { name, price, image, brand, category, countInStock, numReviews, description } = req.body;
        const product = new Product({
            name,
            price,
            user: req.user._id,
            image,
            brand,
            category,
            countInStock,
            numReviews,
            description
        });

        const createProduct = await product.save();
        res.status(201).json(createProduct);
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

//get all products
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, price, image, brand, category, countInStock } = req.body;
        const product = await Product.findById(id);
        if(product) {
            product.name = name;
            product.price = price;
            product.image = image;
            product.brand = brand;
            product.category = category;
            product.countInStock = countInStock;

            const updateProduct = await product.save();
            return res.status(200).json(updateProduct);
        } else {
            return res.status(404).json('Product not found');
        }

    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

//delete product
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if(product) {
            await Product.deleteOne({ _id: product._id});
            return res.status(200).json({ message: 'Product deleted' });
        } else {
            return res.status(404).json('Product not found');
        }
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

//create review
const createProductReview = async (req, res) => {
    try {
        const id = req.params.id;
        const { rating, comment } = req.body;
        const product = await Product.findById(id);
        if(product) {
            const alreadyReviewed = product.reviews.find(
                (review) => review.user.toString() === req.user._id.toString()
            );
            if(alreadyReviewed) {
                res.status(400).json('Product already reviewed');
            }

            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            }

            product.reviews.push(review);
            product.numReviews = product.reviews.length;

            product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
            await product.save();
            return res.status(201).json({ message: 'Review added' });
        } else {
            return res.status(404).json('Resource not found');
        }
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}


export { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct,
    deleteProduct,
    createProductReview
}