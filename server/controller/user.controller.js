import bcrypt from "bcrypt"
import {User} from "../models/user.model.js";
import {sendEmail} from "../services/nodemailer.js";
import {confirmationEmailTemplate, otpEmail} from "../htmltemplate/html.mail.js";
import crypto from "crypto";
import {generateOTP} from "../services/generateOtp.js";
import jwt from "jsonwebtoken";

import customError from "../util/Error.js";

////////////////////// sign up  ------------------------------------------------------------------------- 
const signupController = async (req, res) => {
  
      // ** Step 1: Getting name, email, password, category, phone from request body**
      const { name, email, password, category, phone, isVerified ,otp } = req.body;
  
      // ** Step 2: Checking if all required fields are provided**
      if (!name || !email || !password || !category || !phone) {
        throw new customError (400,"all fields are required ")
      }
  
      // ** Step 3: Check if the user already exists**
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        throw new customError (400,"Email already in Use ")
      }
      const UserNumber = await User.findOne({phone})
      if (UserNumber) {
        throw new customError (400,"Phone no already exist  ")
      }
  
      // **   Step 4: Hashing password before saving in DB**
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // ** Step 5: Creating email verification token**
      const emailToken = crypto.randomBytes(12).toString("hex");
  
      // ** Step 6: Saving user in the database**
      const user = new User({
        name,
        email,
        password: hashedPassword,
        category,
        phone,
        isVerified: false, // By default user is not verified
        emailToken,
        otp,
      });
  
      await user.save();
  
      // ** Step 7: Fetch the newly created user for verification**
      const signedUser = await User.findOne({ email });
  
      if (!signedUser) {
        return res.status(500).json({ success: false, message: "❌ Error fetching user data. Please try again!" });
      }
  
      const id = signedUser._id.toString();
      const savedMailToken = signedUser.emailToken;
  
      console.log("User Created:", signedUser, "User ID:", id, "Email Token:", savedMailToken);
  
      // ** Step 8: Sending verification email**
      const subject = " Verification Email from TechPause ";
      
      try {
        sendEmail(email, subject,
          confirmationEmailTemplate.replace("{name}", name)
            .replace("{link}", `http://localhost:3000/api/verify-email/${id}/${savedMailToken}`)
        );
      } catch (emailError) {
        console.error("Email Sending Error:", emailError);
        return res.status(500).json({ success: false, message: "❌ Error sending verification email. Try again later!" });
      }
  
      // ** Success Response**
      res.status(200).json({
        success: true,
        message: "✅ User created successfully! Please check your email for verification.",
      });
}
  
  
/////////////////////////verify email///////////////////////

const verifyEmailController = async(req,res)=>{
   

        // geting id and token from params
        const {id,token} = req.params;

        // checking user exist or not
        const user = await User.findById(id);
        if(!user){
          throw new customError (400,"User not found ")
        }
        // checking user email token and token we are getting from params
        if(user.emailToken !== token){
          throw new customError (400,"Invalid token ")
        }
        // if user exist and token is valid then we are updating user email token to null and isVerified to true 
        user.emailToken = null;
        user.isVerified = true;
        // saving user 
        await user.save();
        // sending response  to  user 
        // res.status(200).json({message:"Email verified successfully Now You Can Sign In" ,redirect: 'https://localhost:5173/auth'  });
        res.redirect("http://localhost:5173/auth?type=login")
        console.log("user",user,"id verified",id,token);
        
    };
  

// ///////////////////////////////////login////////

const loginController = async (req, res) => {
 
        // Step 1: Get email and password from request body
        const { email, password } = req.body;

        // Step 2: Check if email and password are provided
        if (!email || !password) {
          throw new customError (400,"all fields are required ")
        }

        // Step 3: Check if the user exists in the database
        const user = await User.findOne({ email });

        if (!user) {
          throw new customError (400,"Email not exist  ")
        }

        // Step 4: Compare the provided password with stored password in the database
        const result = await bcrypt.compare(password, user.password);

        if (!result) {
          throw new customError (400,"Incoreect Password ")
        }
        const token =jwt.sign({name:user.name,id:user._id},"ronit")
        res.cookie("jwt",token)

        // Step 5: Sending success response 
        return res.status(200).json({
            message: "Login Successful",
        });

};

// check email is exist or not if exist then the next process otp generate 


const emailChecker = async (req, res) => {

    const { email } = req.body;
    const{name,id}=req.user;

    // Check if email exists in DB
    const user = await User.findOne({ email }); 

    if (!user) {
      throw new customError (400,"Email won't exist ")}

    // OTP Generate
    const otp = generateOTP();

    // OTP DB me store karna
    user.otp = otp;
    await user.save();

    // Send verification email
    const subject = "Email from TechPause for Password Change";

    try {
      sendEmail(
        email,
        subject,
        otpEmail.replace("{name}", user.name).replace("{otp}", otp)
      );
    } catch (emailError) {
      console.error("Email Sending Error:", emailError);
      return res
        .status(500)
        .json({
          success: false,
          message: "Error sending password change email. Try again later!",
        });
    }

    
    res.status(200).json({ success: true, message: "Check your email for OTP" });


};

// verify otp 
const verifyOTP = async (req, res) => {
  
      const { email, otp } = req.body;
  
      
  
      // Find user in DB
      const user = await User.findOne({ email });
  
      if (!user) {
        throw new customError (400,"User not found ")
      }
  
      // OTP Check
      if ( user.otp !== otp) {
        throw new customError (400,"Invalid otp ")
      }
  
      //  OTP Verified Successfully
      res.json({ success: true, message: "OTP verified successfully! You can reset your password now." });
  

  };

  
// password change
const resetPassword = async (req, res) => {

    const { email, newPassword } = req.body;  

    if (!email || !newPassword) {
      throw new customError (400,"Password should be not empty ")
    }

    //  Find user
    const user = await User.findOne({ email });

    if (!user) {
      throw new customError (400,"email not found")
    }

    //   Hashing ( newPassword )
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    //  Update password in DB
    user.password = hashedPassword;
    user.otp = null; // Remove OTP after password reset
    
    await user.save();

    res.json({ success: true, message: "Password changed successfully!" });

  }; 






    
export { signupController , verifyEmailController,loginController, emailChecker,verifyOTP,resetPassword };