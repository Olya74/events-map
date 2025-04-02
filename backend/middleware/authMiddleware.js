import jwt from "jsonwebtoken";
import 'dotenv/config.js';

export const authMiddleware = (req, res, next) => {
    const token = req.headers["Authorization"];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try{
        const decoded = jwt.verify(token.replace("Bearer", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
   
}