import { ITodo } from "./App";
import { todoHandleContext } from "./todoHandleContext";

type Props = {
  todo: ITodo;
};

const Todo = ({ todo }: Props) => {
  let className = "";
  if (todo.isCompleted) {
    className = "completed";
  }

  return (
    <todoHandleContext.Consumer>
      {value => (
        <li>
          <label className={className}>
            <input
              type="checkbox"
              onClick={() => value?.handleToggleTodo(todo.id)}
              defaultChecked={todo.isCompleted}
            />
            {todo.todoName}
          </label>
          <button onClick={() => value?.handleDeleteTodo(todo.id)}>
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </li>
      )}
    </todoHandleContext.Consumer>
  );
};

export default Todo;
