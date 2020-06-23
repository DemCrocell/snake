import {
  BODY,
  CELL_SIZE,
  KEYS,
  START,
} from '../../constants/common';
import {
  PAUSE,
  RESET,
  UPDATE_GAME,
} from '../../constants/game';

const getCanvas = () => {
  const canvas = new Array(400).fill(null).map((val, i) => i === START ? BODY : null);
  return canvas;
};

export const defaultState = {
  canvas: getCanvas(),
  cellSize: CELL_SIZE,
  direction: KEYS.right,
  nextDirection: null,
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

export const reducer = (state: typeof initState, action: any) => {
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
    case UPDATE_GAME:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};