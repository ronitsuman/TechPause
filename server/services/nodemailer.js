import nodemailer from "nodemailer";
import  env  from "dotenv";
 
env.config();
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;



const transporter = nodemailer.createTransport({
    
    host:MAIL_HOST,
    port:MAIL_PORT,
    secure:false,
    auth:{
        user:MAIL_USER,
        pass:MAIL_PASS,
    },
    // tls: {
    //     rejectUnauthorized: false,
    // },
    

});

  export const sendEmail = async(email,subject,content)=>{
    try {
        await transporter.sendMail({
            from:MAIL_USER,      //sender email
            to:email,  // list of reciever
            subject:subject,
            html: content ,
        })
        console.log("email sent")
        
    } catch (error) {
        console.log("error sending email"+ error.message)
        console.log(" Full Error:", error);
        console.log("MAIL_HOST:", process.env.MAIL_HOST);
        console.log("MAIL_PORT:", process.env.MAIL_PORT);
        console.log("MAIL_USER:", process.env.MAIL_USER);
        console.log("text",process.env.TEXT)
        
    }


}



// import dotcenv from "dotenv";
// dotcenv.config();  // 👈 Load environment variables before anything else

// import nodemailer from "nodemailer";

// // Debugging: Print env variables
// console.log("MAIL_HOST:", process.env.MAIL_HOST);
// console.log("MAIL_PORT:", process.env.MAIL_PORT);
// console.log("MAIL_USER:", process.env.MAIL_USER);

// const transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST || "smtp.gmail.com", // Default if undefined
//     port: process.env.MAIL_PORT || 587,
//     secure: false,
//     auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//     },
//     tls: {
//         rejectUnauthorized: false,
//     },
//     family: 4, // Force IPv4
// });

// const sendEmail = async () => {
//     try {
//         await transporter.sendMail({
//             from: process.env.MAIL_USER,
//             to: "ronitsuman1official@gmail.com",
//             subject: "Confirmation Mail",
//             html: "<b>Hey, you got a confirmation email!</b>",
//         });
//         console.log("✅ Email sent successfully!");
//     } catch (error) {
//         console.log("❌ Error sending email:", error);
//     }
// };

// sendEmail();


// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// // Ensure correct __dirname handling in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load .env from the correct directory
// dotenv.config({ path: path.resolve(__dirname, "../.env") });

// import nodemailer from "nodemailer";

// // Debugging: Check if environment variables are loaded
// console.log("MAIL_HOST:", process.env.MAIL_HOST);
// console.log("MAIL_PORT:", process.env.MAIL_PORT);
// console.log("MAIL_USER:", process.env.MAIL_USER);
// console.log("MAIL_PASS:", process.env.MAIL_PASS ? "****" : "MISSING");

// const transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST || "smtp.gmail.com", // Default if undefined
//     port: process.env.MAIL_PORT || 587,
//     secure: false,
//     auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//     },
//     tls: {
//         rejectUnauthorized: false,
//     },
// });

// const sendEmail = async () => {
//     try {
//         await transporter.sendMail({
//             from: process.env.MAIL_USER,
//             to: "ronitsuman1official@gmail.com",
//             subject: "Confirmation Mail",
//             html: "<b>Hey, you got a confirmation email!</b>",
//         });
//         console.log("✅ Email sent successfully!");
//     } catch (error) {
//         console.log("❌ Error sending email:", error);
//         console.log("❌ Full Error:", error);
//     }
// };

// sendEmail();


