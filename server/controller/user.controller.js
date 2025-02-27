import bcrypt from "bcrypt"
import {User} from "../models/user.model.js";
import {sendEmail} from "../services/nodemailer.js";
import {confirmationEmailTemplate} from "../htmltemplate/html.mail.js";
import crypto from "crypto";


const signupController = async(req,res)=>{
   try {
    const {name ,email,password , category,phone,isVerified}=req.body;

    if(!name|| !email || !password || !category || !phone){
        return res.status(400).json({message:"All fields are required"});
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(400).json({message:"email already exists"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const emailToken = crypto.randomBytes(12).toString("hex");

    const user = new User({
        name,  
        email,
        password:hashedPassword,
        category,
        phone,
        isVerified,
        emailToken,
    });
    await user.save();

    //     geting created user id
    const signedUser = await User.findOne({email});

    const id = signedUser._id.toString();
    const savedMailToken = signedUser.emailToken;

    console.log("user",signedUser ,"userDetail" ,id, savedMailToken);

    const Subject = "verification email from "
    sendEmail(email,Subject,
        confirmationEmailTemplate.replace("{name}",name ).replace
        ("{link}",`http://localhost:3000/api/verify-email/${id}/${savedMailToken}`) );
    
    res.status(200).json({message:"user created successfully",success:true,}
        );
    
   } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
    
   }

}

const verifyEmailController = async(req,res)=>{
    try {
        const {id,token} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        if(user.emailToken !== token){
            return res.status(400).json({message:"Invalid Token"});
        }
        user.emailToken = null;
        user.isVerified = true;
        await user.save();
        res.status(200).json({message:"Email verified successfully Now You Can Sign In"});
        
        console.log("user",user,"id verified",id,token);
        
    }
    catch (error) {
        console.error("Email Verification Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
       }
    }
export { signupController , verifyEmailController};