import { createContext } from "react";

export interface ITodoHandler {
  handleToggleTodo: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleStarButton: (id: string) => void;
  handleEditTodo: (e: React.KeyboardEvent<HTMLInputElement>, id: string) => void;
  textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  handleDescriptionButton: (id: string) => void;
}

const todoHandlerContext = createContext<ITodoHandler | null>(null);

export default todoHandlerContext;
