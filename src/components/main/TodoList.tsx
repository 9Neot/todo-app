import { ITodoList } from "../../global/types";
import Todo from "./Todo";

type Props = {
  todoList: ITodoList;
  arrangeButton: boolean;
};

const TodoList = ({ todoList, arrangeButton }: Props) => {
  return (
    <>
      {arrangeButton
        ? todoList
            .sort((a, b) => a.todoName.localeCompare(b.todoName))
            .map(todo => <Todo todo={todo} key={todo.id} />)
        : todoList
            .sort((a, b) => a.id.localeCompare(b.id))
            .map(todo => <Todo todo={todo} key={todo.id} />)}
    </>
  );
};

export default TodoList;
