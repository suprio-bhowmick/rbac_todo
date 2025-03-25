"use client";
import RoleView from "@/Components/RoleView";
import { useRole } from "@/context/RoleContext";
import { useState } from "react";

type ToDo = {
  id: number;
  task: string;
  isCompleted: boolean;
};

const TodoPage = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const { ability } = useRole();

  const handleAddTodo = () => {
    if (currentTodo.trim().length !== 0) {
      let newTodo = {
        id: Date.now() + Math.floor(Math.random() * 100),
        task: currentTodo,
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
      setCurrentTodo("");
    } else {
      alert("Please add a todo");
    }
  };

  const handleToggle = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (id: number) => {
    let updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditClick = (id: number, task: string) => {
    setEditingId(id);
    setEditText(task);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleEditSave = (id: number) => {
    if (editText.trim().length === 0) {
      alert("Todo cannot be empty");
      return;
    }

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task: editText } : todo
    );
    setTodos(updatedTodos);
    setEditingId(null);
  };

  return (
    <div className="max-w-[750px] w-full mx-auto bg-green-100 my-5 rounded-sm shadow-sm py-5 px-3">
      <h1 className="text-2xl font-bold text-center mb-5">
        Simple Todo App with RBAC
      </h1>

      {ability.can("create", "Todo") ? (
        <div>
          <div className="flex gap-3">
            <input
              type="text"
              className="w-full border border-green-600 p-2 rounded outline-0"
              placeholder="Add a new Todo"
              value={currentTodo}
              onChange={(e) => setCurrentTodo(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-600 px-5 rounded text-white cursor-pointer"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-700">
          Only Admin & Editor can add new Todo
        </p>
      )}

      <ul className="mt-5">
        {todos.length === 0 ? (
          <p className="text-center text-gray-700">No Todo Created</p>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-white p-2 border-b border-gray-300 flex justify-between"
            >
              <div className="flex items-center w-full">
                <input
                  onClick={() => handleToggle(todo.id)}
                  type="checkbox"
                  checked={todo.isCompleted}
                  className="mr-5 cursor-pointer"
                  disabled={!ability.can("toggle", "Todo")}
                />

                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={handleEditChange}
                    onBlur={() => handleEditSave(todo.id)}
                    onKeyDown={(e) =>
                      e.key === "Enter" ? handleEditSave(todo.id) : null
                    }
                    className="border border-green-400 p-1 rounded outline-none w-full"
                    autoFocus
                  />
                ) : (
                  <span
                    className={`cursor-pointer ${
                      todo.isCompleted && "line-through"
                    }`}
                    onClick={() =>
                      ability.can("update", "Todo") && handleEditClick(todo.id, todo.task)
                    }
                  >
                    {todo.task}
                  </span>
                )}
              </div>

              <div>
                {ability.can("delete", "Todo") && (
                  <button onClick={() => handleDelete(todo.id)}>❌</button>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
      <RoleView />
    </div>
  );
};

export default TodoPage;
