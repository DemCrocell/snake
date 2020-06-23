import cx from 'classnames';
import React, {FC, KeyboardEvent, memo, useCallback, useContext, useRef} from 'react';

import { DIRS, KEYS } from '../../constants/common';
import { GameContext } from '../../contexts/game';
import Controls from '../Controls/Controls';
import CanvasCells from './CanvasCells';

import './styles.css';

const Canvas: FC = () => {
  const { data, pause, resume, updateGame } = useContext(GameContext);
  const { cellSize, gameOver, numCols, numRows, canvas, paused, direction } = data;
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    if (canvasRef && canvasRef.current) {
      canvasRef.current.focus();
    }
  }, [canvasRef]);

  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const keyCode = event.keyCode;
    const difference = Math.abs(direction - keyCode);

    if (keyCode === KEYS.pause) {
      if (paused) { resume(); }
      else { pause(); }
      return;
    }

    if (DIRS[keyCode] && ![0, 2].includes(difference)) {
      updateGame({ direction: keyCode });
    }
  };

  return (
    <div onClick={handleClick}>
      <div
        ref={canvasRef}
        className={cx('snake-canvas', {'game-over': gameOver})}
        tabIndex={0}
        onBlur={pause}
        onFocus={resume}
        onKeyDown={handleKey}
        style={{width: numCols * cellSize, height: numRows * cellSize}}
      >
        <CanvasCells numRows={numRows} numCols={numCols} canvas={canvas} />
      </div>
      <Controls />
    </div>
  );
};

export default memo(Canvas);
