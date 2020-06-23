import cx from 'classnames';
import React, {FC, memo, useCallback, useContext, useState} from 'react';

import { TABLE_SETTINGS } from '../../constants/settings';
import {GameContext} from '../../contexts/game';
import Button from '../UI/Button';
import SettingsRow from './SettingsRow';

import './styles.css';

const Settings: FC = () => {
  const { data, updateGame } = useContext(GameContext);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = useCallback(() => {
    setShowForm(!showForm);
  }, [showForm, setShowForm]);

  return (
    <div className={cx('snake-settings', { _show: showForm })}>
      <Button className='snake-settings-control' onClick={toggleForm} />
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