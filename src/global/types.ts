interface ITodo {
  id: string;
  todoName: string;
  isCompleted: boolean;
  isMarked: boolean;
  index: number;
}

type ITodoList = ITodo[];

interface IButton {
  leftButton: number | null;
  rightButton: number | null;
  searchButton: boolean;
  starButton: boolean;
  arrangeButton: boolean
}

type todoAction =
  | {
      type: "add";
      payload: {
        value: string;
      };
    }
  | {
      type: "delete";
      payload: {
        id: string;
      };
    }
  | {
      type: "toggle";
      payload: {
        id: string;
      };
    }
  | {
      type: "mark";
      payload: {
        id: string;
      };
    }
  | {
      type: "fetchData";
      payload: ITodoList;
    }
    
export type {ITodo, IButton, ITodoList, todoAction};
