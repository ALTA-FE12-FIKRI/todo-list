import React from 'react';
import { useNavigate } from "react-router-dom";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Props {
  id: number;
  todo: Todo;
  onEditClick: (todo: Todo) => void;
  onDeleteClick: (id: number) => void;
  onCompleteClick: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ id, todo, onEditClick, onDeleteClick, onCompleteClick }) => {

  const navigate = useNavigate();

  const handleEditClick = () => {
    onEditClick(todo);
  };

  const handleDeleteClick = () => {
    onDeleteClick(todo.id);
  };

  const handleCompleteClick = () => {
    onCompleteClick(todo.id);
  };

  const onClickDetail = () => {
    navigate(`/todos/${id}`)
  }

  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleCompleteClick}
        className="mr-2"
      />
      <div className={`flex-grow ${todo.completed ? 'line-through' : ''}`} onClick={onClickDetail}>{todo.text}</div>
      <button onClick={handleEditClick} className="mr-2 text-sm">
        Edit
      </button>
      <button onClick={handleDeleteClick} className="text-sm text-red-500">
        Delete
      </button>
    </div>
  );
};

export default TodoItem;