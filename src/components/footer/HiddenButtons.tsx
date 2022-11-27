import { Props } from "./LeftButtons";

const HiddenButtons = ({
  selectedButton,
  focusInput,
  clearInput,
  setSelectedButton,
}: Props) => {
  let className = "";
  if (selectedButton.leftButton === 2) {
    className = "move";
  }

  return (
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
  );
};

export default HiddenButtons;
