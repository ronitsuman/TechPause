const authChecker = async (req,res,next)=>{
    try {
        const token =req.cookies
        console.log(token)
        next()
        
    } catch (error) {
        console.error(error);
        return res.status(401).json({message:"you are not authorized"})

    }


}

export default authChecker: