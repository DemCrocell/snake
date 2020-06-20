import React, {FC, memo} from 'react';
import Canvas from './app/components/Canvas';
import Controls from './app/components/Controls';
import Settings from './app/components/Settings';
import {GameContext} from './app/contexts/game';
import {IUseGame, useGame} from './app/store/hooks/game';


const App: FC = () => {
  const value: IUseGame = useGame();
  return (
    <GameContext.Provider value={value}>
      <div className='snake-game'>
        <Canvas />
        <Controls />
        <Settings />
      </div>
    </GameContext.Provider>
  );
};

export default memo(App);
