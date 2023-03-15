import express from 'express';
import {
    getFeedPosts,
    getUsersPosts,
    likeUserPost,
} from '../controllers/userPosts.js'
import { verifyToken } from '../middleware/middleware.js';

const postRoutes = express.Router();


postRoutes.get("/", verifyToken , getFeedPosts);
postRoutes.get("/:userId/posts" , verifyToken , getUsersPosts);

// UPDATE
postRoutes.patch("/:id/like", verifyToken, likeUserPost);

export { postRoutes};
