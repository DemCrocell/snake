import React, {FC, memo } from 'react';
import Button from '../UI/Button';

interface IControlsPlayProps {
  onChange: () => void;
  paused: boolean;
}

const ControlsPlay: FC<IControlsPlayProps> = ({ onChange, paused }) => {
  return paused ? <Button onClick={onChange}>Play</Button> : null;
};

export default memo(ControlsPlay);