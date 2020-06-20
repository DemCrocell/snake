import { createContext } from 'react';
import {IUseGame} from '../store/hooks/game';
import {initState} from '../store/reducers/game';

export const GameContext = createContext<IUseGame>({
  data: initState,
  pause: () => {
    throw new Error('not initial');
  },
  reset: () => {
    throw new Error('not initial');
  },
  updateGame: (data: Partial<typeof initState>) => {
    throw new Error('not initial');
  },
  resume: () => {
    throw new Error('not initial');
  },
});