import { createContext } from "react";

interface ITodoProps {
  handleToggleTodo: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
}

export const todoHandleContext = createContext<ITodoProps | null>(null);