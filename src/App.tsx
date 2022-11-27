import React, { useCallback, useRef, useReducer, useState } from "react";
import "./App.css";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import LeftButtons from "./LeftButtons";
import HiddenButtons from "./HiddenButtons";
import TextBar from "./TextBar";
import { todoHandleContext } from "./todoHandleContext";

export interface ITodo {
  id: string;
  todoName: string;
  isCompleted: boolean;
}

export type ITodoList = ITodo[];

export interface IButton {
  leftButton: number | null;
  rightButton: number | null;
  searchButton: boolean;
}

type todoAction =
  | {
      type: "add";
      payload: {
        value: string;
      };
    }
  | {
      type: "delete";
      payload: {
        id: string;
      };
    }
  | {
      type: "toggle";
      payload: {
        id: string;
      };
    }
  | {
      type: "fetchData";
      payload: ITodoList;
    };

const initialTodoList: ITodoList = [];
const TODOLIST_STORAGE = "todoStorage";

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
        <p>{todoList.length} items left</p>
      </footer>
    </div>
  );
}

export default App;
