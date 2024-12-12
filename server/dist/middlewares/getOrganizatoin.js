import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv.js";
export const addOrganisationIdToRequest = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Get token from Authorization header
        const { id } = req.params;
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        // Attach organisationId to the request body
        const newToken = jwt.sign({ id: decoded.id, email: decoded.email, organisationId: id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ newToken, message: "Added successful" });
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Forbidden" });
    }
};
export const removeOrganisationIdToRequest = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Get token from Authorization header
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        // Attach organisationId to the request body
        const newToken = jwt.sign({ id: decoded.id, email: decoded.email }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ newToken, message: "Removed successful" });
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Forbidden" });
    }
};
