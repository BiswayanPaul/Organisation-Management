import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv.js";
export const protect = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "No token provided" });
            return;
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = (decoded.id);
        req.userEmail = decoded.email;
        // console.log({decoded})
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid token" });
    }
};
