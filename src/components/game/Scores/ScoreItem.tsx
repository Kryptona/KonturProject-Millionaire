import React from 'react';
import cn from 'classnames';
import styles from './ScoreItem.scss';
import {ScoreModel} from '../../../models/ScoreModel';

interface Props {
  readonly value: ScoreModel;
  readonly isChecked: boolean;
}

export const ScoreItem: React.FC<Props> = ({value, isChecked}) => {
  return (
    <span className={cn(styles.root, {[styles.selected]: isChecked, [styles.fireproof]: value.fireproof})}>
      <span className={styles.id}>{value.id}</span>
      <span className={styles.amount}>{value.amount} руб.</span>
    </span>
  );
};
