import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;


const dbConnect=async()=>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log("blogging Database connected")
        
    } catch (error) {
        console.log(error.message,"error connecting db")
        
    }
}

export default dbConnect;