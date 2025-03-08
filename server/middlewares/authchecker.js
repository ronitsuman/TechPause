import customError from "../util/Error.js";
import jwt from "jsonwebtoken";

const authChecker = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        console.log(token)

        if (!token){
            throw new customError(401,"Invalid token")
        }
        const decoded = jwt.verify(token,"ronit")
        if(!decoded) {
            throw new customError(401,"Invalid token")
        }
        console.log("user",decoded)
        req.user = decoded
        next()
        
    } catch (error) {
        console.error(error);
        return res.status(401).json({message:"you are not authorized"})

    }


}

export default authChecker;