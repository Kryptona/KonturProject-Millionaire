import styles from './QuestionField.scss';
import React from 'react';

interface PropsQuestionField {
  question: string;
}

export const QuestionField: React.FC<PropsQuestionField> = ({question}) => {
  return <div className={styles.root}>{question}</div>;
};
