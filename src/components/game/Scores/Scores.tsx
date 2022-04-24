import styles from './Scores.scss';
import React from 'react';
import {scores} from '../../../resources/scores';
import {ScoreItem} from './ScoreItem';
import {ScoreModel} from '../../../models/ScoreModel';

interface Props {
  readonly id: number;
}

export const Scores: React.FC<Props> = ({id}) => {
  const currentScore = scores.find((x) => x.id === id) as ScoreModel;

  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {scores
          .map((score) => (
            <li key={score.id}>
              <ScoreItem value={score} isChecked={id === score.id} />
            </li>
          ))
          .reverse()}
      </ul>
      <div className={styles.item}>
        <ScoreItem value={currentScore} isChecked={true} />
      </div>
    </div>
  );
};
