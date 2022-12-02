import { useRef } from "react";
import todoHandleContext, {
  ITodoHandler,
} from "../../contexts/todoHandleContext";
import { ITodo } from "../../global/types";

type Props = {
  todo: ITodo;
};

const Todo = ({ todo }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEditButton = () => {
    inputRef.current?.removeAttribute("disabled");
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
  };

  return (
    <todoHandleContext.Consumer>
      {value => {
        const {
          handleToggleTodo,
          handleDeleteTodo,
          handleStarButton,
          handleEditTodo,
          handleDescriptionButton,
        } = value as ITodoHandler;
        return (
          <li>
            <input
              type="checkbox"
              onClick={() => handleToggleTodo(todo.id)}
              defaultChecked={todo.isCompleted}
            />
            <input
              id="label"
              className={todo.isCompleted ? "completed" : ""}
              ref={inputRef}
              type="text"
              defaultValue={todo.todoName}
              onKeyDown={e => handleEditTodo(e, todo.id)}
              onBlur={e => {
                e.target.setAttribute("disabled", "true");
              }}
              disabled={true}
            />
            <div className="button">
              <button title="Edit title" onClick={handleEditButton}>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                title="Description"
                onClick={() => handleDescriptionButton(todo.id)}
              >
                <i className="fa-regular fa-note-sticky"></i>
              </button>
              <button title="Star" onClick={() => handleStarButton(todo.id)}>
                <i
                  className={
                    todo.isMarked
                      ? "fa-solid fa-star marked"
                      : "fa-regular fa-star"
                  }
                ></i>
              </button>
              <button title="Remove" onClick={() => handleDeleteTodo(todo.id)}>
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
