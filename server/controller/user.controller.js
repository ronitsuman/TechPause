import bcrypt from "bcrypt"
import {User} from "../models/user.model.js";
import {sendEmail} from "../services/nodemailer.js";
import {confirmationEmailTemplate, otpEmail} from "../htmltemplate/html.mail.js";
import crypto from "crypto";
import {generateOTP} from "../services/generateOtp.js";

////////////////////// sign up  ------------------------------------------------------------------------- 
const signupController = async (req, res) => {
    try {
      // ** Step 1: Getting name, email, password, category, phone from request body**
      const { name, email, password, category, phone, isVerified ,otp } = req.body;
  
      // ** Step 2: Checking if all required fields are provided**
      if (!name || !email || !password || !category || !phone) {
        return res.status(400).json({ success: false, message: "❌ All fields are required!" });
      }
  
      // ** Step 3: Check if the user already exists**
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ success: false, message: "❌ Email already registered!" });
      }
      const UserNumber = await User.findOne({phone})
      if (UserNumber) {
        return res.status(400).json({ success: false, message: " this number is already registerd change the number " });
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
  
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ success: false, message: "❌ Internal Server Error! Please try again later." });
    }
  };
/////////////////////////verify email///////////////////////

const verifyEmailController = async(req,res)=>{
    try {

        // geting id and token from params
        const {id,token} = req.params;

        // checking user exist or not
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        // checking user email token and token we are getting from params
        if(user.emailToken !== token){
            return res.status(400).json({message:"Invalid Token"});
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
        
    }
    catch (error) {
        console.error("Email Verification Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
       }
    }
// ///////////////////////////////////login////////

const loginController = async (req, res) => {
    try {
        // Step 1: Get email and password from request body
        const { email, password } = req.body;

        // Step 2: Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Step 3: Check if the user exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({success:false, message: " Email not exist" }); // Changed condition
        }

        // Step 4: Compare the provided password with stored password in the database
        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return res.status(400).json({ success:false, message: "Incorrect password" });
        }

        // Step 5: Sending success response 
        return res.status(200).json({
            message: "Login Successful",
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// check email is exist or not if exist then the next process otp generate 


const emailChecker = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email exists in DB
    const user = await User.findOne({ email }); 

    if (!user) {
      return res
        .status(400)
        .json({  success: false, message: "Email does not exist" });
    }

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

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// verify otp 
const verifyOTP = async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      
  
      // Find user in DB
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      // OTP Check
      if ( user.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
  
      //  OTP Verified Successfully
      res.json({ success: true, message: "OTP verified successfully! You can reset your password now." });
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
// password change
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;  

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    //  Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //   Hashing ( newPassword )
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    //  Update password in DB
    user.password = hashedPassword;
    user.otp = null; // Remove OTP after password reset
    
    await user.save();

    res.json({ success: true, message: "Password changed successfully!" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};





    
export { signupController , verifyEmailController,loginController, emailChecker,verifyOTP,resetPassword };