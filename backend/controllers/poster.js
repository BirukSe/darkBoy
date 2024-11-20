import mongoose from "mongoose";
import Post from "../models/post.js";
export const createPost=async (req, res)=>{
    const newPost=new Post(req.body)
    try{
        await newPost.save()
        res.status(200).json("Post created");
    }
    catch(error){
        res.status(500).json(error);
        console.log(error);
    }

}

export const getPost=async(req, res)=>{
    const id=req.params.id;
    try{
        const post=await Post.findById(id)
        res.status(200).json(post);
    }
    catch(error){
        res.status(500).json(error)
        console.log(error);
    }
}
export const updatePost=async (req, res)=>{
    const id=req.params.id;
    const {userId}=req.body;
    try{
        const post=await PostModel.findById(id);
        if(userId===id){
            await post.updateOne({$set: req.body})
            res.status(200).json("Post updated")

        }
        else{
            res.status(403).json("Action forbidden");
        }

    }
    catch(error){
        res.status(500).json({message: error.message});
        console.log(error);
    }
}


export const likePost=async (req, res)=>{
    const id=req.params.id;
    
    const {currentUserId}=req.body;
    try{
        const post=await Post.findById(id)
        if(post.likes.includes(currentUserId)){
            await post.updateOne({$pull: {likes: currentUserId}})
            res.status(200).json("Post unliked");
        }
        else{
            await post.updateOne({$push: {likes: currentUserId}})
            res.status(200).json("Post Liked");
        }


    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error);
    }
}
export const deletePost=async (req, res)=>{
    const id=req.params.id;
    const {userId}=req.body;
    try{
        if(id===userId){
            await findByIdAndDelete(id);
            res.status(200).json("Post deleted");

        }
        else{
            res.status(403).json("Action forbidden");
        }
       
    }
    catch(error){
        res.status(500).json({message: error.message});
        console.log(error);
    }

}


