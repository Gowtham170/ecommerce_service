import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { User } from '../model/index.js';
import generateToken from '../util/generateToken.js';

//JWT_SECRET_KEY
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// register 
export const register = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        if (name && email && password) {
            // checking for the existence of the user
            const emailExist = await User.findOne({ email });
            if (emailExist) {
                return res.status(400).json('user already exists');
            }

            // hashing a password
            const salt = await bcryptjs.genSalt(12);
            const hashedPassword = await bcryptjs.hash(password, salt);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                isAdmin
            });
            const user = await newUser.save();
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            });
        } else {
            return res.status(400).json({ message: 'all fields are required' });
        }
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

// login 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //checking for the existence of the user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        //checking the correctness of the password
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        user.password.unselect;
        //creating token
        generateToken(res, user);
    } catch (error) {
        return res.status(400).json(`Error: ${error}`);
    }
}

// logout
export const logout = (req, res) => {
    res.clearCookie('auth_token');
    return res.status(200).json({ message: 'logout successful' });
}

// isLoggedIn
export const isLoggedIn = (req, res) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.json(false);
    }

    return jwt.verify(token, JWT_SECRET_KEY, (err) => {
        if (err) {
            return res.json(false);
        }
        return res.json(true);
    });
}
