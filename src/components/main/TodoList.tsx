import { ITodoList } from "../../global/types";
import Todo from "./Todo";

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
