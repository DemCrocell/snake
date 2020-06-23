import React, { FC, memo, useContext } from 'react';

import {GameContext} from '../../contexts/game';
import ControlsFinish from './ControlsFinish';
import ControlsPlay from './ControlsPlay';

import './styles.css';

const Controls: FC = () => {
  const { data, resume, reset } = useContext(GameContext);
  const { paused, gameOver, snake } = data;

  return (
    <div className='snake-controls'>
      <ControlsPlay onChange={resume} paused={paused} />
      <ControlsFinish gameOver={gameOver} snakeLength={snake.length} onChange={reset} />
    </div>
  );
};

export default memo(Controls);