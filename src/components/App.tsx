import React, { useCallback, useRef, useReducer, useState } from "react";
import "../styles/App.css";
import TodoList from "./main/TodoList";
import TextBar from "./main/TextBar";
import todoHandlerContext from "../contexts/todoHandleContext";
import { IButton, ITodoList } from "../global/types";
import todoReducer from "../reducers/todoReducer";
import Button from "./footer/Button";
import buttonHandlerContext from "../contexts/buttonHandleContext";
import useLocalStorage from "../hooks/useLocalStorage";
import useFilter from "../hooks/useFilter";

const initialTodoList: ITodoList = [];

function App() {
  const [selectedButton, setSelectedButton] = useState<IButton>({
    leftButton: null,
    rightButton: null,
    searchButton: false,
    starButton: false,
    arrangeButton: false,
  });
  const [todoList, todoDispatch] = useReducer(todoReducer, initialTodoList);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const todoRef = useRef<HTMLUListElement | null>(null);
  const firstRender = useRef(true);
  const [searchTodo, filterByButton] = useFilter(
    todoList,
    todoRef,
    selectedButton,
    inputRef
  );
  useLocalStorage(todoDispatch, todoList, firstRender);

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value;

      if (value) {
        todoDispatch({ type: "add", payload: { value: value } });
      }
      (e.target as HTMLInputElement).value = "";
    }
  };

  const handleToggleTodo = (id: string) => {
    todoDispatch({ type: "toggle", payload: { id: id } });
  };

  const handleDeleteTodo = (id: string) => {
    todoDispatch({ type: "delete", payload: { id: id } });
  };

  const handleSearchTodo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const regex = new RegExp(value, "i");
      searchTodo(regex);
      filterByButton();
    },
    [filterByButton, searchTodo]
  );

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleStarButton = (id: string) => {
    todoDispatch({ type: "mark", payload: { id: id } });
  };

  return (
    <div className="container">
      <section>
        <h1>THINGS TO DO</h1>
        <main>
          <TextBar
            selectedButton={selectedButton}
            handleAddTodo={handleAddTodo}
            handleSearchTodo={handleSearchTodo}
            inputRef={inputRef}
            setSelectedButton={setSelectedButton}
          />
          <ul ref={todoRef}>
            <todoHandlerContext.Provider
              value={{
                handleToggleTodo,
                handleDeleteTodo,
                handleStarButton,
              }}
            >
              <TodoList
                todoList={todoList}
                arrangeButton={selectedButton.arrangeButton}
              />
            </todoHandlerContext.Provider>
          </ul>
        </main>
      </section>
      <footer>
        <buttonHandlerContext.Provider
          value={{
            selectedButton,
            setSelectedButton,
            clearInput,
            focusInput,
          }}
        >
          <Button></Button>
        </buttonHandlerContext.Provider>
        <em>{todoList.length} items left</em>
      </footer>
    </div>
  );
}

export default App;
