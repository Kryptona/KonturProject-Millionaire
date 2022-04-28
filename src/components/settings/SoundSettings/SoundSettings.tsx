import React from 'react';
import styles from './SoundSettings.scss';
import {useLocalStorage} from '../../../utils/Hooks';

const DEFAULT_VOLUME_LEVEL = 0.1;

export const SoundSettings: React.FC = () => {
  const [soundLevel, setSoundLevel] = useLocalStorage('soundLevel', DEFAULT_VOLUME_LEVEL);

  return (
    <div className={styles.page}>
      <p className={styles.soundLevel}>{soundLevel}</p>
      <div className={styles.range} data-range={true}>
        <input
          type="range"
          list="options"
          className={styles.input}
          min="0"
          max="1"
          step="0.1"
          value={soundLevel}
          onChange={(e) => setSoundLevel(e.target.value)}
        />

        <datalist className={styles.list} id="options">
          {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((x) => (
            <option value={x} data-range-link={'step-' + x.toString()} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export {DEFAULT_VOLUME_LEVEL};
