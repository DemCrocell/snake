import { useCallback, useEffect, useReducer } from 'react';

import { BODY, FOOD } from '../../constants/common';
import { IGameData } from '../../types/common';
import { getArray, getNextIndex } from '../../utils/common';
import { updateGame } from '../actions/game';
import { initState, reducer } from '../reducers/game';

export const useGame = (store = initState) => {
  const [state, dispatch] = useReducer(reducer, store);

  const resumeAction = () => {
    if (state.gameOver || !state.paused) { return; }
    dispatch(updateGame({ paused: false }));
  };

  const handleUpdateGame = useCallback((data: Partial<IGameData>) => {
    const { canvas, numCols, numRows } = state;
    let newCanvas = null;
    if (data.numCols || data.numRows) {
      const newNumCols = data.numCols || numCols;
      const newNumRows = data.numRows || numRows;
      newCanvas = getArray(newNumCols * newNumRows).map((val, i) => canvas[i] || val);
    }
    dispatch(updateGame(newCanvas ? {...data, canvas: newCanvas} : data));
  }, [dispatch, state]);

  const tick = useCallback(() => {
    const { direction } = state;
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

    handleUpdateGame({
      canvas: newCanvas,
      snake: newSnake,
    });

  }, [state, updateGame]);

  useEffect(() => {
    if (!state.paused) {
      setTimeout(tick, (300/state.speed) * 50);
    }
  }, [state.paused, state.snake]);

  return {
    data: state,
    pause: () => dispatch(updateGame({ paused: true })),
    reset: () => dispatch(updateGame({...initState})),
    updateGame: handleUpdateGame,
    resume: resumeAction,
  };
};
