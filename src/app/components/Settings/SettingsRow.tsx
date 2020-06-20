import React, { ChangeEvent, FC, memo } from 'react';

interface IProps {
  name: string;
  label: string;
  max: number;
  min: number;
  value: number;
  onChange?: (val: {[key: string]: number}) => void;
}

const SettingsRow: FC<IProps> = ({
   name,
   max,
   min,
   label,
   onChange,
   value,
}) => {
  const handleSubmit = (val: {[key: string]: number}) => {
    if (onChange) { onChange(val); }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const targetMin = +event.target.min;
    const targetMax = +event.target.max;
    const targetValue = +event.target.value;
    const newValue = Math.min(targetMax, targetValue);
    const resultValue = Math.max(targetMin, newValue);

    handleSubmit({ [name]: resultValue} );
  };


  const handleBlur = (event: any) => {
    handleSubmit({ [event.target.name]: +event.target.value });
  };



  const handleKey = (event: any) => {
    if (event.keyCode === 13) {
      handleSubmit({ [event.target.name]: event.target.value });
    }
  };

  return (
    <div className='snake-settings-row'>
      <label className='snake-settings-label'>{label}</label>
      <input
        className='snake-settings-input'
        onChange={handleChange}
        onKeyDown={handleKey}
        name={name}
        type='number'
        value={value}
        max={max}
        min={min}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default memo(SettingsRow);