import React from "react";
import { IButton } from "./App";

type Props = {
  selectedButton: IButton;
  handleAddTodo: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleSearchTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextBar = ({
  selectedButton,
  handleAddTodo,
  inputRef,
  handleSearchTodo,
}: Props) => {
  return (
    <>
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
    </>
  );
};

export default TextBar;
