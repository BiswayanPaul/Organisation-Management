import jwt from "jsonwebtoken";
import express from "express"
import { JWT_SECRET } from "../config/dotenv.js";

interface JwtPayload {
    id: string;
    email: string;
    iat: number;
    exp: number;
    organisationId: string
}

export const addOrganisationIdToRequest = (req: express.Request, res: express.Response, next: Function) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header
        const { id } = req.params;
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        // Attach organisationId to the request body
        const newToken = jwt.sign({ id: decoded.id, email: decoded.email,organisationId: id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ newToken, message: "Added successful" });
        
        next();
    } catch (error) {
        res.status(403).json({ message: "Forbidden" });
    }
};


export const removeOrganisationIdToRequest = (req: express.Request, res: express.Response, next: Function) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        // Attach organisationId to the request body
        const newToken = jwt.sign({ id: decoded.id, email: decoded.email }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ newToken, message: "Removed successful" });
        
        next();
    } catch (error) {
        res.status(403).json({ message: "Forbidden" });
    }
};
