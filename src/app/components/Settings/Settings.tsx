import React, { FC, memo, useState } from 'react';

import { TABLE_SETTINGS } from '../../constants/settings';
import {useGame} from '../../store/hooks/game';

import SettingsRow from './SettingsRow';

import './styles.css';

const Settings: FC = () => {
  const { data, updateGame } = useGame();
  const [showForm, setShowForm] = useState(false);

  const toggleForm =() => {
    setShowForm(!showForm);
  };

  return (
    <div className={`snake-settings ${showForm && '_show'}`}>
      <button className='snake-settings-control' onClick={toggleForm} />
      <div className='snake-settings-form'>
        {TABLE_SETTINGS.map((value) => (
          <SettingsRow
            key={`settings-${value.name}`}
            name={value.name}
            label={value.label}
            max={value.max}
            min={value.min}
            value={data[value.name]}
            onChange={updateGame}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Settings);