import express from 'express';
import { register, login, logout, isLoggedIn } from '../controller/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/isLoggedIn', isLoggedIn);
// router.get('/isAdmin', isAdmin);

export default router;