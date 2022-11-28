import { useEffect } from "react";
import { ITodoList, todoAction } from "../global/types";

const TODOLIST_STORAGE = "todoStorage";

const useLocalStorage = (todoDispatch: React.Dispatch<todoAction>, todoList: ITodoList, firstRender: React.MutableRefObject<boolean>) => {
  useEffect(() => {
    const newList: ITodoList = JSON.parse(
      localStorage.getItem(TODOLIST_STORAGE) as string
    );
    todoDispatch({ type: "fetchData", payload: newList });
  }, [todoDispatch]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem(TODOLIST_STORAGE, JSON.stringify(todoList));
  }, [todoList, firstRender]);
}

export default useLocalStorage
