import React, { FC } from 'react';
import Canvas from './app/components/Canvas/Canvas';
import Controls from './app/components/Controls/Controls';
import Settings from './app/components/Settings/Settings';


const App: FC = () => (
  <div className='snake-game'>
    <Canvas />
    <Controls />
    <Settings />
  </div>
);

export default App;
