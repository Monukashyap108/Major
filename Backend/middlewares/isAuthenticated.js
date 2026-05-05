import jwt from "jsonwebtoken";
import user from "../modules/user.module.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("TOKEN:", token)
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}       