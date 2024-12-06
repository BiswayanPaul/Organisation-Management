// /src/components/TodoList.tsx
import React, { useEffect, useState } from "react";
import { getTodos } from "../services/todoService";
import { TodoOut } from "../types";

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoOut[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const data = await getTodos();
                setTodos(data);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };
        fetchTodos();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Todos</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className="border p-2 mb-2 rounded">
                        {todo.title} - {todo.completed ? "Completed" : "Pending"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
