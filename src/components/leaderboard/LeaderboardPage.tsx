import React, {useEffect, useState} from 'react';
import styles from './LeaderboardPage.scss';
import {HighScore} from '../../models/HighScore';
import {highScoresRepository} from '../../data/highScoresRepository';
import {LeaderboardItem} from './LeaderboardItem/LeaderboardItem';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';

export const LeaderboardPage: React.FC = () => {
  const rout = useNavigate();
  const [scores, setScores] = useState<HighScore[]>([]);

  useEffect(() => {
    highScoresRepository.readScores().then((allScores) => {
      setScores(allScores);
    });
  }, []);

  const onMenu = () => {
    rout('/');
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <button className={styles.back_bt} onClick={onMenu}>
          <FontAwesomeIcon icon={faAngleLeft} color={'white'} size={'lg'} />
        </button>
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
