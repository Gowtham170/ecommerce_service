import express from 'express';
import { register, login, logout, isLoggedIn } from '../controller/auth.js';

const router = express.Router();

router.post('/users/register', register);
router.post('/users/login', login);
router.get('/users/logout', logout);
router.get('/users/isLoggedIn', isLoggedIn);

export default router;