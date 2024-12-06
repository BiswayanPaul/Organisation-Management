// /src/services/todoService.ts
import api from "./api";
import { TodoIn, TodoOut } from "../types/index";

// Create a new todo
export const createTodo = async (todoIn: TodoIn): Promise<TodoOut> => {
    const response = await api.post("/todos", todoIn);
    return response.data;
};

// Get all todos
export const getTodos = async (): Promise<TodoOut[]> => {
    const response = await api.get("/todos");
    return response.data;
};

// Get a single todo by ID
export const getTodoById = async (todoId: string): Promise<TodoOut> => {
    const response = await api.get(`/todos/${todoId}`);
    return response.data;
};

// Update a todo
export const updateTodo = async (todoId: string, todoIn: TodoIn): Promise<TodoOut> => {
    const response = await api.put(`/todos/${todoId}`, todoIn);
    return response.data;
};

// Delete a todo
export const deleteTodo = async (todoId: string): Promise<void> => {
    await api.delete(`/todos/${todoId}`);
};
