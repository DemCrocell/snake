import { createContext } from 'react';

import {initState} from '../store/reducers/game';
import { IGameData, IUseGame } from '../types/common';

export const GameContext = createContext<IUseGame>({
  data: initState,
  pause: () => {
    throw new Error('not initial');
  },
  reset: () => {
    throw new Error('not initial');
  },
  updateGame: (data: Partial<IGameData>) => {
    throw new Error('not initial');
  },
  resume: () => {
    throw new Error('not initial');
  },
});