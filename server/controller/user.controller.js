import bcrypt from "bcrypt"
import {User} from "../models/user.model.js";
import {sendEmail} from "../services/nodemailer.js";
import {confirmationEmailTemplate} from "../htmltemplate/html.mail.js";
import crypto from "crypto";

////////////////////// sign up  ------------------------------------------------------------------------- 
const signupController = async(req,res)=>{
   try {
    // step 1 : geting name,email,password,category ,phone from body
    const {name ,email,password , category,phone,isVerified}=req.body;
   
    // step 2: checking all fields are fileld or not if any one of field is not wrote user get reponse 

    if(!name|| !email || !password || !category || !phone){
        return res.status(400).json({message:"All fields are required"});
    }
   
    //step 3 checking user already exist or not if exist then return response

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(400).json({message:"email already exists"})
    }

    // step 4 hasshing password before saving in db (because we never store the password plain in db there 
    //  is risk of getting hacked so we store password in hashed form)

    const hashedPassword = await bcrypt.hash(password,10)

    // step 5 : creating email token for verification crypto is package for creating random token
    // and randomBytes is method for creating random bytes and toString is method for converting bytes to string
   // 12 is length of token in bytes=define length of token and to string is for converting bytes to string 
   //and hex is for converting bytes to hexa decimal
    const emailToken = crypto.randomBytes(12).toString("hex");

    // step6 saving user in db

    const user = new User({
        name,  
        email,
        password:hashedPassword,
        category,
        phone,
        isVerified,
        emailToken,
    });

    // await always use in db function here we are saving in db so we use await 

    await user.save();

    // step 7 sending email for verification
    //

    //     geting created user id

    // getting creating user id and email token for verification

    const signedUser = await User.findOne({email});

    // getting user id and we are converting object id to string because we are getting object id
    //

    const id = signedUser._id.toString();

    // getting email token for verification

    const savedMailToken = signedUser.emailToken;

    //  cehcking user and the token we are getting

    console.log("user",signedUser ,"userDetail" ,id, savedMailToken);

    // sending email for verification
    // we use nodemailer for sending email
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
            return res.status(401).json({ message: "Invalid email" }); // Changed condition
        }

        // Step 4: Compare the provided password with stored password in the database
        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return res.status(400).json({ message: "Incorrect password" });
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


    
export { signupController , verifyEmailController,loginController};