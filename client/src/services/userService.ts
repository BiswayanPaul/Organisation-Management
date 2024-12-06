// /src/services/userService.ts
import api from "./api";
import { UserIn, UserOut } from "../types";

// Create a new user
export const createUser = async (userIn: UserIn): Promise<UserOut> => {
    const response = await api.post("/users", userIn);
    return response.data;
};

// Get all users
export const getUsers = async (): Promise<UserOut[]> => {
    const response = await api.get("/users");
    return response.data;
};

// Get a single user by ID
export const getUserById = async (userId: string): Promise<UserOut> => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

// Update a user
export const updateUser = async (userId: string, userIn: UserIn): Promise<UserOut> => {
    const response = await api.put(`/users/${userId}`, userIn);
    return response.data;
};

// Delete a user
export const deleteUser = async (userId: string): Promise<void> => {
    await api.delete(`/users/${userId}`);
};
