import express from "express";
import {signupController,verifyEmailController,loginController , emailChecker,verifyOTP, resetPassword } from "../controller/user.controller.js";
import asyncHandler from "../util/asyncHandler.js";

export const Route = express.Router();

Route.post("/signup",asyncHandler(signupController) );

Route.get("/verify-email/:id/:token", verifyEmailController);


Route.post("/login",loginController)

Route.post("/check-email-otp" ,authChecker, emailChecker)

Route.post("/verify-OTP" , verifyOTP )

Route.post("/reset-password", resetPassword )

