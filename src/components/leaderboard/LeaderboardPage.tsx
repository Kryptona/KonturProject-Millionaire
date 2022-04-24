import React, {useEffect, useState} from 'react';
import styles from './LeaderboardPage.scss';
import {HighScore} from '../../models/HighScore';
import {highScoresRepository} from '../../data/highScoresRepository';
import {LeaderboardItem} from './LeaderboardItem/LeaderboardItem';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {GlassLink} from '../shared/GlassView/GlassLink';

export const LeaderboardPage: React.FC = () => {
  const [scores, setScores] = useState<HighScore[]>([]);

  useEffect(() => {
    highScoresRepository.readScores().then((allScores) => {
      setScores(allScores);
    });
  }, []);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <GlassLink className={styles.back_bt} to={'/'}>
          <FontAwesomeIcon color={'white'} size={'lg'} icon={faAngleLeft} />
        </GlassLink>
        <h1>Таблица лидеров</h1>
      </header>

      <div className={styles.scores}>
        {scores.map((score, index) => (
          <LeaderboardItem highScore={score} index={index + 1} />
        ))}
      </div>
    </div>
  );
};
