import { useCallback, useEffect } from "react";
import { IButton, ITodoList } from "../global/types";

const useFilter = (
  todoList: ITodoList, 
  todoRef: React.MutableRefObject<HTMLUListElement | null>, 
  selectedButton: IButton, 
  inputRef: React.MutableRefObject<HTMLInputElement | null>
): [(regex: RegExp) => void, () => void] => {
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
    [todoList, todoRef]
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
  }, [selectedButton.rightButton, todoList, todoRef]);

  useEffect(() => {
    const value = (inputRef.current as HTMLInputElement)?.value;
    if (value !== null) {
      const regex = new RegExp(value, "i");
      searchTodo(regex);
    }
    filterByButton();
  }, [selectedButton, todoList, searchTodo, filterByButton, inputRef]);

  return [searchTodo, filterByButton]
}
export default useFilter;
