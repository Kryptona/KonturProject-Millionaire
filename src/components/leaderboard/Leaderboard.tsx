import React from 'react';
import styles from './Leaderboard.scss';
import {HighScore} from '../../models/HighScore';

export const Leaderboard: React.FC = () => {
  const scores: HighScore[] = JSON.parse(localStorage.getItem('scores') as string) || [];

  return (
    <div>
      <h1>Leaderboard</h1>
    </div>
  );
};
