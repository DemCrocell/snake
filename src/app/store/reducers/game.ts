import { produce } from 'immer';
import {
  BODY,
  CELL_SIZE,
  KEYS,
  START,
} from '../../constants/common';
import {
  PAUSE,
  RESET,
  RESUME,
  UPDATE_GAME,
} from '../../constants/game';

const getCanvas = () => {
  const canvas = [];
  canvas[START] = BODY;
  return canvas;
};

export const defaultState = {
  canvas: getCanvas(),
  cellSize: CELL_SIZE,
  direction: KEYS.right,
  gameOver: false,
  paused: true,
  snake: [START],
};

export const initState = {
  ...defaultState,
  numCols: 20,
  numRows: 20,
  speed: 100,
};

export const reducer = (state: typeof initState, action: any) =>
  produce(state, () => {
    switch (action.type) {
      case PAUSE:
        return {
          ...state,
          paused: true,
        };
      case RESET:
        return {
          ...state,
          ...initState,
        };
      case RESUME:
        return {
          ...state,
          paused: false,
        };
      case UPDATE_GAME:
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  });