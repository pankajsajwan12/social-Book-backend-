import { Post } from "../models/PostModel.js";
import { User } from "../models/UserModel.js";

// CREATE POST
export const createUserPost = async (req , res) => {
    try{
        const { userId , description , picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName : user.firstName,
            lastName : user.lastName,
            location : user.location,
            description,
            userPicturePath : user.picturePath,
            picturePath,
            like : {},
            comments : []
        })

        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post);
    }
    catch(err){
        res.status(409).json({message: err.message});
    }
}

// GET ALL POSTS
export const getFeedPosts = async (req, res) => {
    try{
        const post = await Post.find();
        res.status(200).json(post);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
};

//GET POST BY USER/ID
export const getUsersPosts = async (req, res) => {
    try{
        const { userId} = req.params;
        const post = await Post.find({ userId});
        res.status(200).json(post);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}

//UPDATE LIKE
export const likeUserPost  = async (req, res) => {
    try{
        const { id } = req.params;
        const { userId } = req.body;

        const post = await Post.findById(id);
        const isLiked = post.like.get(userId);

        if(isLiked){
            post.like.delete(userId);
        }else {
            post.like.set(userId, true);
        }

        const updatePost = await Post.findByIdAndUpdate(
            id,
            { likes : post.like },
            { new : true }
        )

        res.status(200).json(updatePost);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
};