import Todo from "./Todo";
import { ITodoList } from "./App";

type Props = {
  todoList: ITodoList;
  handleChangeState(id: string): void;
  handleDeleteTodo(id: string): void;
  todoRef: React.MutableRefObject<HTMLUListElement | null>;
};

const TodoList = ({
  todoList,
  handleChangeState,
  handleDeleteTodo,
  todoRef,
}: Props) => {
  return (
    <ul ref={todoRef}>
      {todoList.map(todo => (
        <Todo
          todo={todo}
          handleChangeState={handleChangeState}
          handleDeleteTodo={handleDeleteTodo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};

export default TodoList;
