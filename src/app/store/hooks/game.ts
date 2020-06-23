import {useCallback, useEffect, useReducer, useState} from 'react';

import {BODY, FOOD} from '../../constants/common';
import {getNextIndex} from '../../utils/common';
import { pause, reset, updateGame } from '../actions/game';
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

  const tick = useCallback(() => {
    let { direction } = state;
    const { snake, canvas, numRows, numCols } = state;
    const newCanvas = [...canvas];
    let newSnake = [...snake];
    const head = getNextIndex(snake[0], direction, numRows, numCols);

    if (snake.indexOf(head) !== -1) {
      dispatch(updateGame({gameOver: true}));
      return;
    }

    if (canvas[head] === FOOD || snake.length === 1) {
      let ii;
      const numCells = numRows * numCols;
      do { ii = Math.floor(Math.random() * numCells); } while (canvas[ii]);
      newCanvas[ii] = FOOD;
    } else {
      const tail = newSnake.pop();
      if (tail) { newCanvas[tail] = null; }
    }
    newSnake = [head, ...newSnake];
    newCanvas[head] = BODY;

    if (nextDirection) {
      direction = nextDirection;
      setNextDirection(null);
    }

    dispatch(updateGame({
      canvas: newCanvas,
      direction,
      snake: newSnake,
    }));

  }, [state, updateGame, nextDirection]);

  const resumeAction = () => {
    if (state.gameOver || !state.paused) { return; }
    dispatch(updateGame({ paused: false }));
  };

  const handleUpdateGame = (data: Partial<typeof initState>) => {
    const { canvas, numCols, numRows } = state;
    let newCanvas = null;
    if (data.numCols || data.numRows) {
      const newNumCols = data.numCols || numCols;
      const newNumRows = data.numRows || numRows;
      newCanvas = new Array(newNumCols * newNumRows).fill(null).map((val, i) => canvas[i] || val);
    }
    dispatch(updateGame(newCanvas ? {...data, canvas: newCanvas} : data));
  };

  useEffect(() => {
    if (!state.paused) {
      setTimeout(tick, state.speed);
    }
  }, [state.paused, state.snake]);

  return {
    data: state,
    pause: () => dispatch(pause()),
    reset: () => dispatch(reset()),
    updateGame: handleUpdateGame,
    resume: resumeAction,
  };
};
