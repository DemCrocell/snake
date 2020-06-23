import React, { FC, memo } from 'react';
import Canvas from './app/components/Canvas';
import Settings from './app/components/Settings';
import { GameContext } from './app/contexts/game';
import { useGame } from './app/store/hooks/game';
import { IUseGame } from './app/types/common';


const App: FC = () => {
  const value: IUseGame = useGame();
  return (
    <GameContext.Provider value={value}>
      <div className='snake-game'>
        <Canvas />
        <Settings />
      </div>
    </GameContext.Provider>
  );
};

export default memo(App);
