import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import auth from "./routes/auth.js";
import post from "./routes/post.js";
import cors from 'cors';
dotenv.config();
const app=express();
app.use(cors())
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB, {
          
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        })
    }catch(err){
        console.log(err);
        return;
    }
}
const PORT=process.env.PORT;
app.use("/auth", auth);
app.use("/post", post);
// app.use("/post", post);




app.listen(PORT, ()=>{
    connectDB();
    console.log(`Listening on port ${PORT}`);
})