import { User } from '../model/index.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


//JWT_SECRET_KEY
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// register 
export const register = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        
        // checking for the existence of the user
        const emailExist = await User.findOne({ email });
        if(emailExist) {
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
        return res.status(201).json({msg:'New user created!', user: user});
    } catch (err) {
        return res.status(400).json(`Error: ${err}`);
    }
}

// login 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //checking for the existence of the user
        const user = await User.findOne({email}).select('+password');
        if(!user) {
            return res.status(404).json('user not found');
        } 

        //checking the correctness of the password
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json('Invalid password');
        }

        //creating token
        const payload = {
            id: user._id, 
            email: user.email
        }
        const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '1d'});
        return res.cookie('auth_token', token, {
            httpOnly: true 
        }).status(200).json({message: 'login successful'});

    } catch (err) {
        return res.status(400).json(`Error: ${err}`);
    }
}

// logout
export const logout = (req, res) => {
    res.clearCookie('auth_token');
    return res.status(200).json({ message: 'logout successful'});
}

// isLoggedIn
export const isLoggedIn = (req, res) => {
    const token = req.cookies.auth_token;

    if(!token) {
        return res.json(false);
    }

    return jwt.verify(token, JWT_SECRET_KEY, (err) => {
        if(err) {
            return res.json(false);
        }
        return res.json(true);
    });
}

// isAdmin
export const isAdmin = (req, res, next) => {
    console.log(req.user);
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        return res.status(401).json({message: 'Not authorized as admin'})
    }
}