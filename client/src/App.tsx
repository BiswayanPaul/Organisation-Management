// /src/App.tsx
import React from "react";
import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <CreateTodo />
      <TodoList />
    </div>
  );
};

export default App;
