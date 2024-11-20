import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: String,
    // profilePicture: String,
    // coverPicture: String,
    // about: String,
    // livesin: String,
    // worksAt: String,
    // relationship: String,
    // followers: [],
    // following: []

   


}, {timestamps: true})
const User=mongoose.model("User", userSchema);
export default User;