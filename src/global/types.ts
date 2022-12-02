interface ITodo {
  id: string;
  todoName: string;
  isCompleted: boolean;
  isMarked: boolean;
  index: number;
  description: string;
  isSelected: boolean
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
        name: string;
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
  | {
      type: "edit";
      payload: {
        id: string;
        name: string;
      }
    }  
  | {
      type: "select";
      payload: {
        id: string;
      }
    }
  | {
    type: "changeDescription";
    payload: {
      id: string;
      description: string;
    }
  }

export type {ITodo, IButton, ITodoList, todoAction};
