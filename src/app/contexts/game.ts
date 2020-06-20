import React from 'react';

export const GameContext = React.createContext(
  {
    numCols: 20,
    numRows: 20,
    speed: 100,
  },
);
