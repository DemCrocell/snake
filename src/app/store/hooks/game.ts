import { useReducer, useState } from 'react';

import {BODY, FOOD} from '../../constants/common';
import {getNextIndex} from '../../utils/common';
import { pause, reset, resume, updateGame } from '../actions/game';
import { initState, reducer } from '../reducers/game';

export interface IUseGame {
  data: typeof initState;
  pause: () => void;
  reset: () => void;
  updateGame: (data: Partial<typeof initState>) => void;
  resume: () => void;
}

export const useGame = (store: typeof initState = initState) => {
  const [state, dispatch] = useReducer(reducer, store);
  const [nextDirection, setNextDirection] = useState(null);

  const resumeAction = () => {
    if (state.gameOver || !state.paused) { return; }
    dispatch(resume(false));
    tick();
  };

  const tick = () => {
    if (state.paused) { return; }
    let { direction } = state;
    const { snake, canvas, numRows, numCols } = state;
    const head = getNextIndex(snake[0], direction, numRows, numCols);

    if (snake.indexOf(head) !== -1) {
      dispatch(updateGame({gameOver: true}));
      return;
    }

    if (canvas[head] === FOOD || snake.length === 1) {
      let ii;
      const numCells = numRows * numCols;
      do { ii = Math.floor(Math.random() * numCells); } while (canvas[ii]);
      canvas[ii] = FOOD;
    } else {
      const tail = snake.pop();
      if (tail) { canvas[tail] = null; }
    }
    const newSnake = [head, ...snake];
    canvas[head] = BODY;

    if (nextDirection) {
      direction = nextDirection;
      setNextDirection(null);
    }

    dispatch(updateGame({
      canvas,
      direction,
      snake: newSnake,
    }));

    setTimeout(tick, state.speed);
  };

  return {
    data: state,
    pause: () => dispatch(pause()),
    reset: () => dispatch(reset()),
    updateGame: (data: Partial<typeof initState>) => dispatch(updateGame(data)),
    resume: resumeAction,
  };
};
