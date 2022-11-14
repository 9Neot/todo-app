import React, { useCallback, useRef } from "react";
import { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import LeftButtons from "./LeftButtons";
import HiddenButtons from "./HiddenButtons";
import TextBar from "./TextBar";

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

const TODOLIST_STORAGE = "todoStorage";

function App() {
  const [todoList, setTodoList] = useState<ITodoList>([]);
  const [selectedButton, setSelectedButton] = useState<IButton>({
    leftButton: null,
    rightButton: null,
    searchButton: false,
  });
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
    const newList = JSON.parse(
      localStorage.getItem(TODOLIST_STORAGE) as string
    );
    setTodoList(newList);
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
        setTodoList(pre => [
          ...pre,
          { id: uuidv4(), todoName: value, isCompleted: false },
        ]);
      }
      (e.target as HTMLInputElement).value = "";
    }
  };

  const handleChangeState = (id: string) => {
    const newList = [...todoList];
    const todo = newList.find(todo => todo.id === id);
    todo!.isCompleted = !todo!.isCompleted;
    setTodoList(newList);
  };

  const handleDeleteTodo = (id: string) => {
    const newList = todoList.filter(todo => todo.id !== id);
    setTodoList(newList);
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
          <TodoList
            todoList={todoList}
            handleChangeState={handleChangeState}
            handleDeleteTodo={handleDeleteTodo}
            todoRef={todoRef}
          />
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
