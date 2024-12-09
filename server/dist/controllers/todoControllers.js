var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Todo from "../schemas/todo";
import User from "../schemas/user";
import Organisation from "../schemas/organisation";
// Create a Todo
export const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, deadline, createdBy, assignedTo, organisation } = req.body;
        // Validate required fields
        if (!title || !deadline || !createdBy || !organisation) {
            res.status(400).json({ message: "Title, deadline, createdBy, and organisation are required" });
            return;
        }
        // Verify organisation exists
        const organisationExists = yield Organisation.findById(organisation);
        if (!organisationExists) {
            res.status(404).json({ message: "Organisation not found" });
            return;
        }
        // Verify user exists
        const userExists = yield User.findById(createdBy);
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
        const savedTodo = yield todo.save();
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
