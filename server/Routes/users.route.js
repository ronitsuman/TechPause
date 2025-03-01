import express from "express";
import {signupController,verifyEmailController,loginController } from "../controller/user.controller.js";

export const Route = express.Router();

Route.post("/signup", signupController);

Route.get("/verify-email/:id/:token", verifyEmailController);


Route.post("/login",loginController)


