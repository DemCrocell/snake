import React, {
  FC, memo, useContext, useRef,
  // useState
} from 'react';

import {
  // BODY,
  // FOOD,
  // BODY, DIRS, FOOD,
  KEYS,
} from '../../constants/common';
import { GameContext } from '../../contexts/game';
// import {getNextIndex} from '../../utils/common';
import CanvasCells from './CanvasCells';

import './styles.css';

const Canvas: FC = () => {
  const { data, pause, resume } = useContext(GameContext);

  const {
    cellSize,
    gameOver,
  } = data;

  const canvasRef = useRef(null);

  const handleKey = ( event:any ) => {
    const direction = event.keyCode;
    // const difference = Math.abs(data.direction - direction);
    if (direction === KEYS.pause) {
      if (data.paused) { resume(); }
      else { pause(); }
    }
    // else if (DIRS[direction] && difference !== 0 && difference !== 2) {
    //   setNextDirection(direction);
    // }
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
      <CanvasCells numRows={data.numRows} numCols={data.numCols} canvas={data.canvas} />
    </div>
  );
};

export default memo(Canvas);
