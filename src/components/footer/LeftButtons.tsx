import buttonHandlerContext, {
  IButtonHandler,
} from "../../contexts/buttonHandleContext";

const LeftButtons = () => {
  return (
    <buttonHandlerContext.Consumer>
      {value => {
        const { selectedButton, setSelectedButton, clearInput, focusInput } =
          value as IButtonHandler;
        return (
          <div className="leftButton">
            <button
              title="Add New"
              className={selectedButton.leftButton === 1 ? "selected" : ""}
              onClick={() => {
                clearInput();
                if (selectedButton.leftButton !== 1) {
                  focusInput();
                  setSelectedButton(pre => ({
                    ...pre,
                    leftButton: 1,
                    searchButton: false,
                    rightButton: null,
                    starButton: false,
                    arrangeButton: false,
                  }));
                } else {
                  setSelectedButton(pre => {
                    return {
                      ...pre,
                      leftButton: null,
                    };
                  });
                }
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
                  setSelectedButton(pre => ({ ...pre, leftButton: 2 }));
                } else {
                  setSelectedButton(pre => ({
                    ...pre,
                    leftButton: null,
                    rightButton: null,
                    searchButton: false,
                    starButton: false,
                    arrangeButton: false,
                  }));
                }
              }}
            >
              <i className="fa-solid fa-filter"></i>{" "}
            </button>
          </div>
        );
      }}
    </buttonHandlerContext.Consumer>
  );
};

export default LeftButtons;
