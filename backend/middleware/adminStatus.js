// import {clerkClient} from '@clerk/express';
// import User from '../models/user.js';
// import bodyParser from 'body-parser';
// export const adminStatus=async (req, res, next)=>{
//     const {username}=req.body;
//     try{
//         const currentUser=await User.findOne({username});
//         const isAdmin=process.env.ADMIN_EMAIL===currentUser.username;
//         if(!isAdmin){
//             return res.status(403).json({message: "unauthorized must be an admin"});

//         }
//         next();
        
//     }catch(error){
//         console.log(error);
//         res.status(500).json({message: error.message});
//     }
// }
import { clerkClient } from '@clerk/express';


export const adminStatus = async (req, res, next) => {
    console.log('Request body:', req.body); // Debugging: Log the request body

    const { username } = req.body;  // Access username from the body
    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    try {
        // const currentUser = await User.findOne({ username });
        
        // if (!currentUser) {
        //     return res.status(404).json({ message: "User not found" });
        // }

        const isAdmin = process.env.ADMIN_EMAIL === username;
        
        if (!isAdmin) {
            return res.status(403).json({ message: "Unauthorized: must be an admin" });
        }

        next(); // Continue to the next middleware or route handler

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
