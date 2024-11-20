import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.js";
export const register=async (req, res)=>{
    const {username, password, name, email}=req.body;

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password, salt);
    const newUser=new User({username, password: hashedPassword, name, email})
    try{
        await newUser.save();
        res.status(200).json(newUser);



    }
    catch(error){
        res.status(500).json({message: error.message});

        console.log(error);
    }
}
export const login=async (req, res)=>{
    const {username, password}=req.body;
    try{
        const user=await User.findOne({username: username})
        if(user){
            const validity=await bcrypt.compare(password, user.password)
            validity? res.status(200).json(user): res.status(400).json("Wrong password")

        }
        else{
            res.status(404).json("User does not exist");
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error);
    }

}
export const lister=async (req, res)=>{
    const id=req.params.id;
    try{
        const user=await User.findById(id);
        if(user){
            const {password, ...otherDetails}=user._doc
            res.status(200).json(otherDetails)
        }
    }
    catch(error){
        res.status(500).json(error);
    }

}
export const updateUser=async (req, res)=>{
    const id=req.params.id;
    const {currentUserId, currentUserAdminStatus, password}=req.body;
    if(id===currentUserId || currentUserAdminStatus){
        try{
            if(password){
                const salt=bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(password, salt);
            }
            const user=await User.findByIdAndUpdate(id, req.body, {new: true})
            res.status(200).json(user);



        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    }
    else{
        res.status(403).json("Access Denied! You are not authorized to do this");

    }
}
export const deleteUser=async(req, res)=>{
    const id=req.params.id;
    const {currentUserId, currentUserAdminStatus}=req.body;
    if(currentUserId===id || currentUserAdminStatus){
        try{
            await User.findByIdAndDelete(id)
            res.status(200).json("User deleted successfully")
        }
        catch(error){
            res.status(500).json(error)
        }
    }

}
export const followUser=async (req, res)=>{
    const id=req.params.id;
    const {currentUserId}=req.body;
    if(currentUserId===id){
        res.status(403).json("Action forbidden");
    }
    else{
        try{
            const followUser=await User.findById(id)
            const followingUser=await User.findById(currentUserId);
            if(!followUser.followers.includes(currentUserId)){
                await followUser.updateOne({$push: {followers: currentUserId}})
                await followingUser.updateOne({$push: {following: id}})
                res.status(200).json("User followed")


            }
            else{
                res.status(403).json("User is Already followed by you")
            }

        }
        catch(error){
            res.status(500).json(error);

        }
    }
    
}
export const unfollowUser=async (req, res)=>{
    const id=req.params.id;
    const {currentUserId}=req.body;
    if(currentUserId===id){
        res.status(403).json("Action forbidden");
    }
    else{
        try{
            const followUser=await User.findById(id)
            const followingUser=await User.findById(currentUserId);
            if(followUser.followers.includes(currentUserId)){
                await followUser.deleteOne({$pull: {followers: currentUserId}})
                await followingUser.deleteOne({$pull: {following: id}})
                res.status(200).json("User unfollowed")


            }
            else{
                res.status(403).json("User is not followed by you before doing that bro")
            }

        }
        catch(error){
            res.status(500).json(error);

        }
    }
    
}
export const checkAdmin=async (req, res)=>{
    res.status(200).json({admin: true})


}
export const checkPeople = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users); // No need for .json(), just pass the array directly
    } catch (error) {
      console.log(error);
     res.status(400).json({ message: "ther is error"});
   
    }
  }
  