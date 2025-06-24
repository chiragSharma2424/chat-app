import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

export const protectRoute = async (req, resizeBy, next) => {
    try {
        const token = req.cookies.jwt

        if(!token) {
            return resizeBy.status(401).json({message: "unauthorized - no token provided"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(400).json({
                message: "unauthorized - invalid token"
           });
        } 

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(400).json({
                message: "user not found"
            })
        }

        req.user = user;
        next();
    } catch(err) {
        console.log("error", err);
        res.status(500).json({
            message: "internal server error"
        });
    }
}