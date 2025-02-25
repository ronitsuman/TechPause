import bcrypt from "bcrypt"
import {User} from "../models/user.model.js";


const signupController = async(req,res)=>{
   try {
    const {name ,email,password , category,phone}=req.body;

    if(!name|| !email || !password || !category || !phone){
        return res.status(400).json({message:"All fields are required"});
    }

    const existingUser = await User.findOne({email});

    if(existingUser.length > 0){
        return res.status(400).json({message:"email already exists"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = new User({
        name,  
        email,
        password:hashedPassword,
        category,
        phone,
    });
    await user.save();
    res.status(200).json({message:"user created successfully"}
        );
    
   } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
    
   }

}
export { signupController};