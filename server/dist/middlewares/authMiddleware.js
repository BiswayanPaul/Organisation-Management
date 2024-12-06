import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv";
export const protect = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Add user info to request object
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
