import express from 'express';
import {
    getUsers,
    getUserFriends,
    addRemoveFriend
} from '../controllers/users.js'
import { verifyToken } from '../middleware/middleware.js';

 const userRoutes = express.Router();


 userRoutes.get("/:id", verifyToken , getUsers);
 userRoutes.get("/:id/friends", verifyToken , getUserFriends);

// UPDATE
userRoutes.patch("/:id/:friendId", verifyToken , addRemoveFriend);

export { userRoutes};