import React, { FC, memo } from 'react';
import {BODY, FOOD} from '../../constants/common';
import {getArray} from '../../utils/common';

import './styles.css';

interface IProps {
  numRows: number;
  numCols: number;
  canvas: Array<number|null>;
}

const CanvasCells: FC<IProps> = ({ numRows, numCols, canvas }) => {
  return <>
    {
      getArray(numRows).map((numRow, row) =>
        getArray(numCols).map((numCol, col) => {
          const code = canvas[numCols * row + col];
          const type = code === BODY ? 'body' : code === FOOD ? 'food' : 'null';
          return <div key={`CanvasCells-${row}-${col}`} className={`${type}-cell`} />;
        }),
      )
    }
  </>;
};

export default memo(CanvasCells);
