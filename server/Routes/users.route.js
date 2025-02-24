import express from "express";
import {signupController} from "../controller/user.controller.js";

export const Route = express.Router();

Route.get("/signup", signupController);


