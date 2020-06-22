import React, {FC, memo, useContext, useMemo} from 'react';

import {GameContext} from '../../contexts/game';

import './styles.css';

const Controls: FC = () => {
  const { data, resume, reset } = useContext(GameContext);
  const { paused, gameOver, snake } = data;
  const totals = useMemo(() => snake.length - 2, [snake.length]);

  return (
    <div className='snake-controls'>
      {paused ? <button onClick={resume}>Play</button> : null}
      {gameOver ? (
        <div className='snake-over'>
          <h2>Totals: {totals}</h2>
          <button onClick={reset}>New Game</button>
        </div>
      ) : null}
    </div>
  );
};

export default memo(Controls);