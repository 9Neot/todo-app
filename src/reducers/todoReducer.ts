import { ITodoList, todoAction } from "../global/types";
import { v4 as uuidv4 } from "uuid";

const todoReducer = (todoList: ITodoList, action: todoAction) => {
  switch (action.type) {
    case "add":
      return [
        ...todoList,
        { id: uuidv4(), todoName: action.payload.value, isCompleted: false },
      ];
    case "delete":
      return todoList.filter(todo => todo.id !== action.payload.id);
    case "toggle": {
      return todoList.map(todo => {
        if (todo.id !== action.payload.id) {
          return todo;
        }
        return { ...todo, isCompleted: !todo.isCompleted };
      });
    }
    case "fetchData": {
      return [...action.payload];
    }
    default:
      return todoList;
  }
};

export default todoReducer
