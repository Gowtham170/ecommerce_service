import express from 'express';
import { getUserDetails, updateUserDetails } from '../controller/user.js';

const router = express.Router();

router.get('/user', getUserDetails);
router.put('/user/:id', updateUserDetails);

export default router;