import Todo from "./Todo";
import { ITodoList } from "./App";

type Props = {
  todoList: ITodoList;
  handleToggleTodo(id: string): void;
  handleDeleteTodo(id: string): void;
  todoRef: React.MutableRefObject<HTMLUListElement | null>;
};

const TodoList = ({
  todoList,
  handleToggleTodo,
  handleDeleteTodo,
  todoRef,
}: Props) => {
  return (
    <ul ref={todoRef}>
      {todoList.map(todo => (
        <Todo
          todo={todo}
          handleToggleTodo={handleToggleTodo}
          handleDeleteTodo={handleDeleteTodo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};

export default TodoList;
