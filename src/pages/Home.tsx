import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import TodoItem from "../components/TodoItem";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  useEffect(() => {
    task();
  }, []);

  function task() {
    axios
      .get("https://api.todoist.com/rest/v2/tasks", {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      })
      .then((response) => {
        const todos = response.data.map((item: any) => ({
          id: item.id,
          text: item.content,
          completed: item.completed,
        }));
        setTodos(todos);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editTodo) {
      const updatedTodo = { ...editTodo, text: newTodo };
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodo.id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
      setEditTodo(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    }
    setNewTodo("");
  };

  const handleEditClick = (todo: Todo) => {
    setEditTodo(todo);
    setNewTodo(todo.text);
  };

  const handleDeleteClick = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleCompleteClick = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <Layout>
      <div className="w-full bg-cover bg-center bg-no-repeat">
        <div className="flex h-full w-full flex-wrap items-center justify-center bg-gradient-to-t from-white p-6 dark:from-black">
          <div className="card w-4/5 md:w-full sm:w-full gap-4 bg-glass p-3 shadow-lg shadow-black backdrop-blur-md lg:h-4/5 lg:card-side">
            <div className="card-body justify-between">
              <div className="flex flex-col">
              <form onSubmit={handleNewTodoSubmit} className="mb-4">
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              type="text"
              value={newTodo}
              onChange={handleNewTodoChange}
              className="appearance-none bg-transparent border-none w-full text-slate-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
              placeholder="Add a new todo"
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            >
              {editTodo ? "Edit Todo" : "Add Todo"}
            </button>
          </div>
        </form>
        {todos.map((todo) => (
          <TodoItem
          id={todo.id}
            key={todo.id}
            todo={todo}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onCompleteClick={handleCompleteClick}
          />
        ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
