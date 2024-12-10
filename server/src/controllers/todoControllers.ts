import { Request, Response } from "express";
import Todo from "../schemas/todo.js";
import User from "../schemas/user.js";
import Organisation from "../schemas/organisation.js";

// Create a Todo
export const createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, deadline, createdBy, assignedTo, organisation } = req.body;

        // Validate required fields
        if (!title || !deadline || !createdBy || !organisation) {
            res.status(400).json({ message: "Title, deadline, createdBy, and organisation are required" });
            return;
        }

        // Verify organisation exists
        const organisationExists = await Organisation.findById(organisation);
        if (!organisationExists) {
            res.status(404).json({ message: "Organisation not found" });
            return;
        }

        // Verify user exists
        const userExists = await User.findById(createdBy);
        if (!userExists) {
            res.status(404).json({ message: "User (createdBy) not found" });
            return;
        }

        // Create the todo
        const todo = new Todo({
            title,
            description,
            deadline,
            createdBy,
            assignedTo,
            organisation,
        });

        const savedTodo = await todo.save();

        res.status(201).json(savedTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating todo" });
    }
};

// Get All Todos
export const getAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos = await Todo.find()
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email")
            .populate("organisation", "name");

        res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching todos" });
    }
};

// Get Todos for a Specific Organisation
export const getTodosByOrganisation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { organisationId } = req.params;

        const todos = await Todo.find({ organisation: organisationId })
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email");

        res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching todos for organisation" });
    }
};

// Get Todos Assigned to a Specific User
export const getTodosByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const todos = await Todo.find({ assignedTo: userId })
            .populate("createdBy", "name email")
            .populate("organisation", "name");

        res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching todos for user" });
    }
};

// Update a Todo
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description, deadline, isCompleted, assignedTo } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, description, deadline, isCompleted, assignedTo },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating todo" });
    }
};

// Delete a Todo
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting todo" });
    }
};
