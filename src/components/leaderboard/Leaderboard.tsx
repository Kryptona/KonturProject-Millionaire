import React from 'react';
import styles from './Leaderboard.scss';
import {HighScore} from '../../models/HighScore';
import {getDatabase, ref, set, get, child} from 'firebase/database';
import {appRepository} from '../../data/appRepository';

export const Leaderboard: React.FC = () => {
  const scores: HighScore[] = JSON.parse(localStorage.getItem('scores') as string) || [];

  const highScores = appRepository.readScores();
  console.log(highScores);

  return (
    <div>
      <h1>Leaderboard</h1>
    </div>
  );
};
