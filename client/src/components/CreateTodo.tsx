// /src/components/CreateTodo.tsx
import React, { useState } from "react";
import { createTodo } from "../services/todoService";
import { TodoIn } from "../types";

const CreateTodo: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const todoIn: TodoIn = { title, description };
        try {
            await createTodo(todoIn);
            alert("Todo created successfully!");
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                Create Todo
            </button>
        </form>
    );
};

export default CreateTodo;
