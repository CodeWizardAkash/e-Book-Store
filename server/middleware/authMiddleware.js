import jwt from "jsonwebtoken";

export const protect = (req, res, next)=>{
    try{
        const token = req.cookis.jwt;

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, token missing",
            })
        }

        // verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Save decoded data for later use
        req.user = decoded;

        next();
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
}