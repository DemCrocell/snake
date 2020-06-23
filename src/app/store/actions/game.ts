import {
  PAUSE,
  RESET,
  UPDATE_GAME,
} from '../../constants/game';
import {IGameData} from '../../types/common';

export const reset = () => ({
  type: RESET,
});

export const updateGame = (payload: Partial<IGameData>) => ({
  payload,
  type: UPDATE_GAME,
});

export const pause = () => ({
  type: PAUSE,
});