import { IButton } from "../../types/types";

export type Props = {
  selectedButton: IButton;
  setSelectedButton: React.Dispatch<React.SetStateAction<IButton>>;
  clearInput: () => void;
  focusInput: () => void;
};

const LeftButtons = ({
  selectedButton,
  setSelectedButton,
  clearInput,
  focusInput,
}: Props) => {
  return (
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
  );
};

export default LeftButtons;
