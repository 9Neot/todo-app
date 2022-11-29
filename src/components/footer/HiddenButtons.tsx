import buttonHandlerContext, {
  IButtonHandler,
} from "../../contexts/buttonHandleContext";

const HiddenButtons = () => {
  return (
    <buttonHandlerContext.Consumer>
      {value => {
        const { selectedButton, setSelectedButton, clearInput, focusInput } =
          value as IButtonHandler;
        return (
          <ul className={selectedButton.leftButton === 2 ? "move" : ""}>
            <li>
              <button
                title="Search"
                className={selectedButton.searchButton ? "selected" : ""}
                onClick={() => {
                  if (selectedButton.searchButton === false) {
                    focusInput();
                  } else {
                    clearInput();
                    setSelectedButton(pre => {
                      return { ...pre, searchButton: !pre.searchButton };
                    });
                  }
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
            <li>
              <button
                title="Important"
                className={selectedButton.starButton ? "selected" : ""}
                onClick={() => {
                  setSelectedButton(pre => {
                    return { ...pre, starButton: !selectedButton.starButton };
                  });
                }}
              >
                <i className="fa-regular fa-star"></i>
              </button>
            </li>
          </ul>
        );
      }}
    </buttonHandlerContext.Consumer>
  );
};

export default HiddenButtons;
