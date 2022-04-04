import styles from './Scores.scss';
import React from 'react';
import {scores} from '../../../resources/scores';
import {ScoreItem} from './ScoreItem';

interface Props {
  id: number;
}

export const Scores: React.FC<Props> = ({id}) => {
  return (
    <div className={styles.root}>
      <ul>
        {scores
          .map((score) => (
            <li key={score.id}>
              <ScoreItem value={score} isChecked={id === score.id} />
            </li>
          ))
          .reverse()}
      </ul>
    </div>
  );
};
