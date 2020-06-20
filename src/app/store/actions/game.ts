import {
  PAUSE,
  RESET,
  RESUME,
  UPDATE_GAME,
} from '../../constants/game';

export const reset = () => ({
  type: RESET,
});

export const resume = (payload: any) => ({
  payload,
  type: RESUME,
});

export const updateGame = (payload: any) => ({
  payload,
  type: UPDATE_GAME,
});

export const pause = () => ({
  type: PAUSE,
});