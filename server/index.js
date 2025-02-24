import express from "express";
import dbConnect from "./database/dbConnect.js";
import cors from "cors";
import {Route }from "./Routes/users.route.js";
import env from "dotenv"


env.config(); // to use env variables
const app = express();
const PORT = process.env.PORT ||5000;




// Database Connection & Server Start
(async () => {
    try {
        await dbConnect();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log("db is connected ")
        });
    } catch (error) {
        console.error("Database connection failed:", error);
    }
})();

// Middleware
app.use(cors());
app.use(express.json());



app.use("/api",Route)