import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [todo, setTodo] = useState<Todo>();
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/${id}`);
  };

  const handleDeleteClick = () => {
    axios
      .delete(`https://api.todoist.com/rest/v2/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const handleCompleteClick = () => {
    axios
      .post(
        `https://api.todoist.com/rest/v2/tasks/${id}/close`,
        {},
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
        }
      )
      .then(() => {
        setTodo((prevState) =>
          prevState ? { ...prevState, completed: true } : prevState
        );
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios
      .get(`https://api.todoist.com/rest/v2/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      })
      .then((response) => {
        const todo = {
          id: response.data.id,
          text: response.data.content,
          completed: response.data.completed,
        };
        setTodo(todo);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!todo) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full bg-cover bg-center bg-no-repeat">
        <div className="flex h-full w-full flex-wrap items-center justify-center bg-gradient-to-t from-white p-6 dark:from-black">
          <div className="card w-4/5 md:w-full sm:w-full gap-4 bg-glass p-3 shadow-lg shadow-black backdrop-blur-md lg:h-4/5 lg:card-side">
            <div className="card-body justify-between">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold mb-2">{todo.text}</h1>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleCompleteClick}
                    className="mr-2"
                  />
                  <span className={todo.completed ? "line-through" : ""}>
                    {todo.completed ? "Completed" : "Incomplete"}
                  </span>
                </div>
                <button
                  className="w-[140px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
                <button
                  className="w-[140px] bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-6"
                  onClick={handleDeleteClick}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
