import { createContext } from "react";

interface ITodoHandler {
  handleToggleTodo: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
}

const todoHandlerContext = createContext<ITodoHandler | null>(null);
export default todoHandlerContext;
