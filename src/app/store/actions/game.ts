import {
  PAUSE,
  RESET,
  UPDATE_GAME,
} from '../../constants/game';

export const reset = () => ({
  type: RESET,
});

export const updateGame = (payload: any) => ({
  payload,
  type: UPDATE_GAME,
});

export const pause = () => ({
  type: PAUSE,
});