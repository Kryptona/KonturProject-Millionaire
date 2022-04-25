import styles from './Settings.scss';
import React from 'react';
import {SoundSettings} from './SoundSettings/SoundSettings';
import {HexagonViewUse} from '../shared/HexagonView/HexagonView';
import {HexagonLink} from '../shared/HexagonLink/HexagonLink';

export const Settings: React.FC = () => {
  return (
    <div className={styles.root}>
      <p className={styles.labelSoundLevel}>Уровень громкости</p>
      <SoundSettings />
      <HexagonLink className={styles.bt} use={HexagonViewUse.secondary} to={'/'}>
        Назад
      </HexagonLink>
    </div>
  );
};
