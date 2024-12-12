var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import Todo from "../schemas/todo.js";
import User from "../schemas/user.js";
import Organisation from "../schemas/organisation.js";
import { JWT_SECRET } from "../config/dotenv.js";
// Create a Todo
export const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "No token provided" });
            return;
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const createdBy = decoded.id;
        const organisation = decoded.organisationId;
        const { title, description, deadline, assignedTo } = req.body;
        if (!organisation || !createdBy) {
            res.status(400).json({ message: "organisation not selected yet" });
            return;
        }
        // Validate required fields
        if (!title || !deadline || !assignedTo) {
            res.status(400).json({ message: "Title, deadline & assignedTo are required" });
            return;
        }
        // Verify organisation exists
        const organisationExists = yield Organisation.findById(organisation);
        if (!organisationExists) {
            res.status(404).json({ message: "Organisation not found" });
            return;
        }
        // Verify user exists
        const userExists = yield User.findByIdAndUpdate(createdBy);
        if (!userExists) {
            res.status(404).json({ message: "User (createdBy) not found" });
            return;
        }
        const existingTodo = yield Todo.findOne({ title, assignedTo });
        if (existingTodo) {
            res.status(400).json({ message: "Todo with the same title already exist" });
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
        const savedTodo = yield todo.save();
        yield User.findByIdAndUpdate(assignedTo, {
            $push: {
                todo: { todo: savedTodo._id, deadline: deadline },
            },
        });
        res.status(201).json(savedTodo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating todo" });
    }
});
// Get All Todos
export const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo.find()
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email")
            .populate("organisation", "name");
        res.status(200).json(todos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching todos" });
    }
});
// Get Todos for a Specific Organisation
export const getTodosByOrganisation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { organisationId } = req.params;
        console.log(organisationId);
        const todos = yield Todo.find({ organisation: organisationId })
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email");
        res.status(200).json(todos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching todos for organisation" });
    }
});
// Get Todos Assigned to a Specific User
export const getTodosByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const todos = yield Todo.find({ assignedTo: userId })
            .populate("createdBy", "name email")
            .populate("organisation", "name");
        res.status(200).json(todos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching todos for user" });
    }
});
// Update a Todo
export const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, deadline, isCompleted, assignedTo } = req.body;
        const updatedTodo = yield Todo.findByIdAndUpdate(id, { title, description, deadline, isCompleted, assignedTo }, { new: true, runValidators: true });
        if (!updatedTodo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        res.status(200).json(updatedTodo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating todo" });
    }
});
// Delete a Todo
export const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTodo = yield Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting todo" });
    }
});
