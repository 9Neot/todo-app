import todoHandleContext, {
  ITodoHandler,
} from "../../contexts/todoHandleContext";
import { ITodo } from "../../global/types";

type Props = {
  todo: ITodo;
};

const Todo = ({ todo }: Props) => {
  return (
    <todoHandleContext.Consumer>
      {value => {
        const { handleToggleTodo, handleDeleteTodo, handleStarButton } =
          value as ITodoHandler;
        return (
          <li>
            <label className={todo.isCompleted ? "completed" : ""}>
              <input
                type="checkbox"
                onClick={() => handleToggleTodo(todo.id)}
                defaultChecked={todo.isCompleted}
              />
              {todo.todoName}
            </label>
            <div className="button">
              <button onClick={() => handleStarButton(todo.id)}>
                <i
                  className={
                    todo.isMarked
                      ? "fa-solid fa-star marked"
                      : "fa-regular fa-star"
                  }
                ></i>
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)}>
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </li>
        );
      }}
    </todoHandleContext.Consumer>
  );
};

export default Todo;
