import React, { FC, KeyboardEvent, memo, useContext, useRef } from 'react';

import {
  // BODY,
  DIRS,
  // FOOD,
  KEYS,
} from '../../constants/common';
import { GameContext } from '../../contexts/game';
import Controls from '../Controls/Controls';
// import {getNextIndex} from '../../utils/common';
import CanvasCells from './CanvasCells';

import './styles.css';

const Canvas: FC = () => {
  const { data, pause, resume, updateGame } = useContext(GameContext);
  const {
    cellSize,
    gameOver,
  } = data;
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (canvasRef && canvasRef.current) {
      canvasRef.current.focus();
    }
  };

  const handleKey = ( event: KeyboardEvent<HTMLDivElement>) => {
    const direction = event.keyCode;
    const difference = Math.abs(data.direction - direction);

    if (direction === KEYS.pause) {
      if (data.paused) { resume(); }
      else { pause(); }
      return;
    }

    if (DIRS[direction] && ![0, 2].includes(difference)) {
      // tslint:disable-next-line:no-console
      console.log('handleKey 2', { direction, difference, dir: data.direction });
      updateGame({ nextDirection: direction });
    }
  };

  return (
    <div onClick={handleClick}>
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
      <Controls />
    </div>
  );
};

export default memo(Canvas);
