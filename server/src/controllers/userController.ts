import { Request, Response, NextFunction } from "express";
import User from "../schemas/user.js";
import { getUserById } from "../utils/user.js";

// Controller to fetch all users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error fetching users:", error);
        next(error); // Pass the error to the next middleware
    }
};

// Controller to fetch a user by ID
export const getUserByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ success: false, message: "User ID is required" });
            return;
        }

        const user = await getUserById(id);

        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        next(error); // Pass the error to the next middleware
    }
};
