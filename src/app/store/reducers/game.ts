import {
  BODY,
  CELL_SIZE,
  KEYS,
  START,
} from '../../constants/common';
import { UPDATE_GAME } from '../../constants/game';
import {getArray} from '../../utils/common';

const getCanvas = () => getArray(400).map((val, i) => i === START ? BODY : null);

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

export const reducer = (state: typeof initState, action: { type: string; payload: Partial<typeof initState> }) => {
  switch (action.type) {
    case UPDATE_GAME:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};