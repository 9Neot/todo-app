import { createContext } from 'react';
import { IButton } from '../global/types';

export interface IButtonHandler {
  selectedButton: IButton
  setSelectedButton: React.Dispatch<React.SetStateAction<IButton>>
  clearInput: () => void
  focusInput: () => void
}

const buttonHandlerContext = createContext<IButtonHandler | null>(null);

export default buttonHandlerContext;
