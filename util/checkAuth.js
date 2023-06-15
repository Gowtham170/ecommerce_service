import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from "../model/index.js";

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; 

export const checkAuth = (req, res, next) => {
    const token = req.cookies.auth_token;

    if(!token) {
        return res.status(401).json({message: 'Access Denied: Not authorized to access this route'});
    }

    try {
        const verifyToken = jwt.verify(token, JWT_SECRET_KEY);
        const user = User.findById(verifyToken.id);
        if(!user) {
            return res.status(404).json({message: 'No user found'});
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(400).json({message: 'Invalid Token'});
    }
}