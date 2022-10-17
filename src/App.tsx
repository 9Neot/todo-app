import React, { useRef } from "react";
import { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

export interface ITodo {
  id: string;
  todoName: string;
  isCompleted: boolean;
}

export type ITodoList = ITodo[];

interface IButton {
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
      todoList.forEach((todo, index) => {
        if (regex.test(todo.todoName)) {
          (todoRef.current as HTMLUListElement).children[index].className = "";
        } else {
          (todoRef.current as HTMLUListElement).children[index].className =
            "null";
        }
      });
    }
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
  }, [selectedButton, todoList]);

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let value = (e.target as HTMLInputElement).value;

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
    const value = (e.target as HTMLInputElement).value;
    const regex = new RegExp(value, "i");
    todoList.forEach((todo, index) => {
      if (regex.test(todo.todoName)) {
        (todoRef.current as HTMLUListElement).children[index].className = "";
      } else {
        (todoRef.current as HTMLUListElement).children[index].className =
          "null";
      }
    });
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
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  let className = "";
  if (selectedButton.leftButton === 2) {
    className = "move";
  }
  return (
    <div className="container">
      <section>
        <h1>THINGS TO DO</h1>
        <main>
          {selectedButton.leftButton === 1 ? (
            <input
              type="text"
              placeholder="Add New"
              onKeyDown={handleAddTodo}
              className="input"
              ref={inputRef}
            />
          ) : selectedButton.leftButton === 2 ? (
            <input
              type="text"
              placeholder="Search"
              onChange={handleSearchTodo}
              className="input"
              ref={inputRef}
            ></input>
          ) : (
            <input className="null"></input>
          )}
          <TodoList
            todoList={todoList}
            handleChangeState={handleChangeState}
            handleDeleteTodo={handleDeleteTodo}
            todoRef={todoRef}
          />
        </main>
      </section>
      <footer>
        <div className="button">
          <button
            title="Add New"
            className={selectedButton.leftButton === 1 ? "selected" : ""}
            onClick={() => {
              clearInput();
              if (selectedButton.leftButton !== 1) {
                setSelectedButton(pre => {
                  return {
                    ...pre,
                    leftButton: 1,
                    searchButton: false,
                    rightButton: null,
                  };
                });
              } else {
                setSelectedButton(pre => {
                  return {
                    ...pre,
                    leftButton: null,
                  };
                });
              }
              focusInput();
            }}
          >
            <i className="fa-sharp fa-solid fa-plus"></i>
          </button>
          <button
            title="Filter"
            className={selectedButton.leftButton === 2 ? "selected" : ""}
            onClick={() => {
              clearInput();
              if (selectedButton.leftButton !== 2) {
                setSelectedButton(pre => {
                  return { ...pre, leftButton: 2 };
                });
              } else {
                setSelectedButton(pre => {
                  return {
                    ...pre,
                    leftButton: null,
                    rightButton: null,
                    searchButton: false,
                  };
                });
              }
            }}
          >
            <i className="fa-solid fa-filter"></i>{" "}
          </button>
        </div>
        <ul className={className}>
          <li>
            <button
              title="Search"
              className={selectedButton.searchButton ? "selected" : ""}
              onClick={() => {
                if (selectedButton.searchButton === false) {
                  focusInput();
                } else {
                  clearInput();
                }
                setSelectedButton(pre => {
                  return { ...pre, searchButton: !pre.searchButton };
                });
              }}
            >
              <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
            </button>
          </li>
          <li>
            <button
              title="Active"
              className={selectedButton.rightButton === 1 ? "selected" : ""}
              onClick={() => {
                setSelectedButton(pre => {
                  return { ...pre, rightButton: null };
                });
                if (selectedButton.rightButton !== 1) {
                  setSelectedButton(pre => {
                    return { ...pre, rightButton: 1 };
                  });
                }
              }}
            >
              <i className="fa-solid fa-spinner"></i>
            </button>
          </li>
          <li>
            <button
              title="Completed"
              className={selectedButton.rightButton === 2 ? "selected" : ""}
              onClick={() => {
                setSelectedButton(pre => {
                  return { ...pre, rightButton: null };
                });
                if (selectedButton.rightButton !== 2) {
                  setSelectedButton(pre => {
                    return { ...pre, rightButton: 2 };
                  });
                }
              }}
            >
              <i className="fa-regular fa-square-check"></i>{" "}
            </button>
          </li>
        </ul>
        <p>{todoList.length} items left</p>
      </footer>
    </div>
  );
}

export default App;
