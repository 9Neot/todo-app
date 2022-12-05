import React from "react";
import { IButton } from "../../global/types";

type Props = {
  selectedButton: IButton;
  handleAddTodo: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleSearchTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedButton: React.Dispatch<React.SetStateAction<IButton>>;
};

const TextBar = ({
  selectedButton,
  handleAddTodo,
  inputRef,
  handleSearchTodo,
  setSelectedButton,
}: Props) => {
  return (
    <input
      className={selectedButton.leftButton ? "visibleInput" : "hidden"}
      type="text"
      placeholder={
        selectedButton.leftButton === 1
          ? "Add New"
          : selectedButton.leftButton === 2
          ? "Search"
          : ""
      }
      onKeyDown={selectedButton.leftButton === 1 ? handleAddTodo : () => {}}
      onChange={selectedButton.leftButton === 2 ? handleSearchTodo : () => {}}
      ref={inputRef}
      onFocus={
        selectedButton.leftButton === 2
          ? () => {
              setSelectedButton(pre => ({ ...pre, searchButton: true }));
            }
          : () => {}
      }
      onBlur={
        selectedButton.leftButton === 2
          ? () => {
              setSelectedButton(pre => ({ ...pre, searchButton: false }));
            }
          : selectedButton.leftButton === 1
          ? () =>
              setTimeout(() => {
                setSelectedButton(pre => ({ ...pre, leftButton: null }));
              }, 122)
          : () => {}
      }
    />
  );
};

export default TextBar;
