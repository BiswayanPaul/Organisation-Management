import express from "express";
import { createTodo, deleteTodo, getAllTodos, getTodosByOrganisation, getTodosByUser, updateTodo } from "../controllers/todoControllers.js";


const router = express.Router();

// Route to get all users
router.get("/getTodos",getAllTodos );
router.get("/getTodo/:id",getTodosByUser );
router.get("/getTodo/org/:id",getTodosByOrganisation );
router.post("/createTodo", createTodo);
router.put("/editTodo/:id",updateTodo );
router.delete("/deleteTodo/:id", deleteTodo);

export default router;
