import { createContext } from "react";

export interface ITodoHandler {
  handleToggleTodo: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleStarButton: (id: string) => void;
}

const todoHandlerContext = createContext<ITodoHandler | null>(null);

export default todoHandlerContext;
