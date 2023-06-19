import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

//JWT_SECRET_KEY
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default (res, user) => {
    const payload = {
        id: user._id, 
        email: user.email
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '1d'});
    return res.cookie('auth_token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60
    }).status(200).json({message: 'login successful'});
}

