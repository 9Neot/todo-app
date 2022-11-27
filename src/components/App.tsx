import React, { useCallback, useRef, useReducer, useState } from "react";
import "./App.css";
import TodoList from "./main/TodoList";
import { useEffect } from "react";
import LeftButtons from "./footer/LeftButtons";
import HiddenButtons from "./footer/HiddenButtons";
import TextBar from "./main/TextBar";
import { todoHandleContext } from "../contexts/todoHandleContext";
import { IButton, ITodoList } from "../types/types";
import todoReducer from "../reducers/todoReducer";

const initialTodoList: ITodoList = [];
const TODOLIST_STORAGE = "todoStorage";

function App() {
  const [selectedButton, setSelectedButton] = useState<IButton>({
    leftButton: null,
    rightButton: null,
    searchButton: false,
  });
  const [todoList, todoDispatch] = useReducer(todoReducer, initialTodoList);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const todoRef = useRef<HTMLUListElement | null>(null);
  const firstRender = useRef(true);

  const searchTodo = useCallback(
    (regex: RegExp) => {
      todoList.forEach((todo, index) => {
        if (regex.test(todo.todoName)) {
          (todoRef.current as HTMLUListElement).children[index].className = "";
        } else {
          (todoRef.current as HTMLUListElement).children[index].className =
            "null";
        }
      });
    },
    [todoList]
  );

  const filterByButton = useCallback(() => {
    if (selectedButton.rightButton === 1) {
      todoList.forEach((todo, index) => {
        if (todo.isCompleted) {
          (todoRef.current as HTMLUListElement).children[index].className =
            "null";
        }
      });
    }
    if (selectedButton.rightButton === 2) {
      todoList.forEach((todo, index) => {
        if (!todo.isCompleted) {
          (todoRef.current as HTMLUListElement).children[index].className =
            "null";
        }
      });
    }
  }, [selectedButton.rightButton, todoList]);

  useEffect(() => {
    const newList: ITodoList = JSON.parse(
      localStorage.getItem(TODOLIST_STORAGE) as string
    );
    todoDispatch({ type: "fetchData", payload: newList });
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem(TODOLIST_STORAGE, JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    const value = (inputRef.current as HTMLInputElement)?.value;
    if (value !== null) {
      const regex = new RegExp(value, "i");
      searchTodo(regex);
    }
    filterByButton();
  }, [selectedButton, todoList, searchTodo, filterByButton]);

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

  const handleSearchTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = new RegExp(value, "i");
    searchTodo(regex);
    filterByButton();
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
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
          />
          <ul ref={todoRef}>
            <todoHandleContext.Provider
              value={{ handleToggleTodo, handleDeleteTodo }}
            >
              <TodoList todoList={todoList} />
            </todoHandleContext.Provider>
          </ul>
        </main>
      </section>
      <footer>
        <LeftButtons
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          clearInput={clearInput}
          focusInput={focusInput}
        />
        <HiddenButtons
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          clearInput={clearInput}
          focusInput={focusInput}
        />
        <em>{todoList.length} items left</em>
      </footer>
    </div>
  );
}

export default App;
