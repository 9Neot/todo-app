import { ITodo } from "./App";

type Props = {
  todo: ITodo;
  handleToggleTodo(id: string): void;
  handleDeleteTodo(id: string): void;
};

const Todo = ({ todo, handleToggleTodo, handleDeleteTodo }: Props) => {
  let className = "";
  if (todo.isCompleted) {
    className = "completed";
  }

  const changeStateOnClick = () => {
    handleToggleTodo(todo.id);
  };

  const handleDeleteOnClick = () => {
    handleDeleteTodo(todo.id);
  };

  return (
    <li>
      <label className={className}>
        <input
          type="checkbox"
          onClick={changeStateOnClick}
          defaultChecked={todo.isCompleted}
        />
        {todo.todoName}
      </label>
      <button onClick={handleDeleteOnClick}>
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </li>
  );
};

export default Todo;
