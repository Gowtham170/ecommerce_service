import express from 'express';
import checkAuth from '../util/checkAuth.js';
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
router.get('/users', checkAuth, isAdmin, getUsers);
router.get('/users/:id', checkAuth, isAdmin, getUserById)
      .put('/users/:id', checkAuth, isAdmin, updateUser)
      .delete('/users/:id', checkAuth, isAdmin, deleteUserById);

export default router;