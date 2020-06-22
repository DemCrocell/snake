import React, { FC, memo } from 'react';
import {BODY, FOOD} from '../../constants/common';

import './styles.css';

interface IProps {
  numRows: number;
  numCols: number;
  canvas: Array<number|null>;
}

const CanvasCells: FC<IProps> = ({ numRows, numCols, canvas }) => {
  let cells: JSX.Element[] = [];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const code = canvas[numCols * row + col];
      const type = code === BODY ? 'body' : code === FOOD ? 'food' : 'null';
      cells = [
        ...cells,
        <div key={`CanvasCells-${row}-${col}`} className={`${type}-cell`} />,
      ];
    }
  }
  return <>{cells}</>;
};

export default memo(CanvasCells);
