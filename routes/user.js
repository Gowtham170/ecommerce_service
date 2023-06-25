import express from 'express';

import isAdmin  from '../util/isAdmin.js';
import { 
    getUserProfile, 
    updateUserProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUserById
} from '../controller/user.js';

const router = express.Router();

router.get('/user/profile', getUserProfile)
      .put('/user/profile', updateUserProfile);

// admin routes
router.get('/users', isAdmin, getUsers);
router.get('/user/:id', isAdmin, getUserById)
      .put('/user/:id', isAdmin, updateUser)
      .delete('/user/:id', isAdmin, deleteUserById);

export default router;