import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv.js";
import { CustomRequest } from "../types/CustomRequest.js";

interface JwtPayload {
    id: string;
    email: string;
    iat: number;
    exp: number;
}

export const protect = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "No token provided" });
            return;
        }


        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.userId = (decoded.id);
        req.userEmail = decoded.email;
        // console.log({decoded})

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid token" });
    }
};
