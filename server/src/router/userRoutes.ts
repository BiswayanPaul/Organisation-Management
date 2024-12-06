import express from "express";
import { getAllUsers, getUserByIdController } from "../controllers/userController.js";

const router = express.Router();

// Route to get all users
router.get("/getusers", getAllUsers);

// Route to get a user by ID
router.get("/getuser/:id", getUserByIdController);

export default router;
