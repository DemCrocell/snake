import React, {FC, memo, useRef, useState} from 'react';

import {BODY, DIRS, FOOD, KEYS} from '../../constants/common';
import {useGame} from '../../store/hooks/game';
import {getNextIndex} from '../../utils/common';
import CanvasCells from './CanvasCells';

import './styles.css';

const Canvas: FC = () => {
  const { data, pause, resume, updateGame } = useGame();
  const [nextDirection, setNextDirection] = useState(null);

  const {
    cellSize,
    gameOver,
    paused,
  } = data;

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleKey = ( event:any ) => {
    const direction = event.keyCode;
    const difference = Math.abs(data.direction - direction);
    if (direction === KEYS.pause) {
      if (data.paused) { resume(); }
      else { pause(); }
    }
    else if (DIRS[direction] && difference !== 0 && difference !== 2) {
      setNextDirection(direction);
    }
  };

  const tick = () => {
    if (paused) { return; }
    let { direction } = data;
    const { snake, canvas, numRows, numCols, speed } = data;
    const head = getNextIndex(snake[0], direction, numRows, numCols);

    if (snake.indexOf(head) !== -1) {
      updateGame({gameOver: true});
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

    updateGame({
      canvas,
      direction,
      snake: newSnake,
    });

    setTimeout(tick, speed);
  };

  return (
    <div
      ref={canvasRef}
      className={`snake-canvas ${(gameOver ? ' game-over' : '')}`}
      tabIndex={0}
      onBlur={pause}
      onFocus={resume}
      onKeyDown={handleKey}
      style={{width: data.numCols * cellSize, height: data.numRows * cellSize}}
    >
      <CanvasCells numRows={data.numRows} numCols={data.numCols} canvas={data.canvas}/>
    </div>
  );
};

export default memo(Canvas);
