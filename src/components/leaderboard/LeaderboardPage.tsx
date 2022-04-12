import React, {useEffect, useState} from 'react';
import styles from './LeaderboardPage.scss';
import {HighScore} from '../../models/HighScore';
import {appRepository} from '../../data/appRepository';
import {Item} from './Item';

export const LeaderboardPage: React.FC = () => {
  const [scores, setScores] = useState<HighScore[]>([]);

  useEffect(() => {
    appRepository.readScores().then((allScores) => {
      setScores(allScores);
    });
  }, []);

  return (
    <div className={styles.root}>
      <h1>Leaderboard</h1>
      <div className={styles.scores}>
        {scores.map((score, index) => (
          <Item highScore={score} index={index + 1} />
        ))}
      </div>
    </div>
  );
};
