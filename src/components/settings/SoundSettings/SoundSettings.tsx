import React from 'react';
import styles from './SoundSettings.scss';
import {useLocalStorage} from '../../../utils/Hooks';
import {GlassButton} from '../../shared/GlassView/GlassButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';

export const SoundSettings: React.FC = () => {
  const [soundLevel, setSoundLevel] = useLocalStorage('soundLevel', 0.1);

  const upSoundLevel = () => {
    if (soundLevel < 1) {
      setSoundLevel(Math.round((soundLevel + 0.1) * 10) / 10);
    }
  };

  const downSoundLevel = () => {
    if (soundLevel > 0) {
      setSoundLevel(Math.round((soundLevel - 0.1) * 10) / 10);
    }
  };

  return (
    <div className={styles.root}>
      <GlassButton className={styles.button} onClick={upSoundLevel}>
        <FontAwesomeIcon size={'lg'} icon={faPlus} title="Увеличить громкость" />
      </GlassButton>
      <p className={styles.label}>{soundLevel * 10}</p>
      <GlassButton className={styles.button} onClick={downSoundLevel}>
        <FontAwesomeIcon size={'lg'} icon={faMinus} title="Уменьшить громкость" />
      </GlassButton>
    </div>
  );
};
