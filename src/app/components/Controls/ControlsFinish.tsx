import React, {FC, memo, useMemo} from 'react';
import Button from '../UI/Button';

interface IControlsFinishProps {
  snakeLength: number;
  gameOver: boolean;
  onChange: () => void;
}

const ControlsFinish: FC<IControlsFinishProps> = ({ snakeLength, gameOver, onChange }) => {
  const totals = useMemo(() => snakeLength - 2, [snakeLength]);
  return gameOver ? (
    <div className='snake-over'>
      <h2>Totals: {totals}</h2>
      <Button onClick={onChange}>New Game</Button>
    </div>
  ) : null;
};

export default memo(ControlsFinish);