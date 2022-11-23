import Todo from "./Todo";
import { ITodoList } from "./App";

type Props = {
  todoList: ITodoList;
};

const TodoList = ({ todoList }: Props) => {
  return (
    <>
      {todoList.map(todo => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </>
  );
};

export default TodoList;
