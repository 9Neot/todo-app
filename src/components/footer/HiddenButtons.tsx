import buttonHandlerContext from "../../contexts/buttonHandleContext";

const HiddenButtons = () => {
  return (
    <buttonHandlerContext.Consumer>
      {value => (
        <ul className={value?.selectedButton.leftButton === 2 ? "move" : ""}>
          <li>
            <button
              title="Search"
              className={value?.selectedButton.searchButton ? "selected" : ""}
              onClick={() => {
                if (value?.selectedButton.searchButton === false) {
                  value?.focusInput();
                } else {
                  value?.clearInput();
                }
                value?.setSelectedButton(pre => {
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
              className={
                value?.selectedButton.rightButton === 1 ? "selected" : ""
              }
              onClick={() => {
                value?.setSelectedButton(pre => {
                  return { ...pre, rightButton: null };
                });
                if (value?.selectedButton.rightButton !== 1) {
                  value?.setSelectedButton(pre => {
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
              className={
                value?.selectedButton.rightButton === 2 ? "selected" : ""
              }
              onClick={() => {
                value?.setSelectedButton(pre => {
                  return { ...pre, rightButton: null };
                });
                if (value?.selectedButton.rightButton !== 2) {
                  value?.setSelectedButton(pre => {
                    return { ...pre, rightButton: 2 };
                  });
                }
              }}
            >
              <i className="fa-regular fa-square-check"></i>{" "}
            </button>
          </li>
        </ul>
      )}
    </buttonHandlerContext.Consumer>
  );
};

export default HiddenButtons;
