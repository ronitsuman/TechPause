import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "name is required field"]
        },
        email:{
            type:String,
            required:[true,"email is required field"],
            unique:true
        },
        password:{
            type:String,
            required:[true, "password is required field"]
        },
        phone:{
            type:String,
            required:[true,"phone is required field "],
            unique:true
        },
        category:{
            type:String,
            required:[true, "category is required field"]
        }
    },
    {timestamps:true});

    export const User = mongoose.model("User",userSchema);

