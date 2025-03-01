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
            
        },
        category:{
            type:String,
            required:[true, "category is required field"]
        },
        isVerified:{type:Boolean,
            default:false},
        emailToken:{type:String,
            default:null
        },
    },
    {timestamps:true});

    export const User = mongoose.model("User",userSchema);

