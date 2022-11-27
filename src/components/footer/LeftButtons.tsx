import buttonHandlerContext from "../../contexts/buttonHandleContext";

const LeftButtons = () => {
  return (
    <buttonHandlerContext.Consumer>
      {value => (
        <div className="button">
          <button
            title="Add New"
            className={value?.selectedButton.leftButton === 1 ? "selected" : ""}
            onClick={() => {
              value?.clearInput();
              if (value?.selectedButton.leftButton !== 1) {
                value?.setSelectedButton(pre => {
                  return {
                    ...pre,
                    leftButton: 1,
                    searchButton: false,
                    rightButton: null,
                  };
                });
              } else {
                value?.setSelectedButton(pre => {
                  return {
                    ...pre,
                    leftButton: null,
                  };
                });
              }
              value?.focusInput();
            }}
          >
            <i className="fa-sharp fa-solid fa-plus"></i>
          </button>
          <button
            title="Filter"
            className={value?.selectedButton.leftButton === 2 ? "selected" : ""}
            onClick={() => {
              value?.clearInput();
              if (value?.selectedButton.leftButton !== 2) {
                value?.setSelectedButton(pre => {
                  return { ...pre, leftButton: 2 };
                });
              } else {
                value?.setSelectedButton(pre => {
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
      )}
    </buttonHandlerContext.Consumer>
  );
};

export default LeftButtons;
