import React, {Dispatch, SetStateAction} from 'react';
import {Answer} from '../Answer/Answer';
import styles from './Question.scss';
import {QuestionField} from '../QuestionField/QuestionField';

type questionCard = {
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  rightAnswer: string;
};
export type {questionCard};
type questionOptions = {
  questionCard: questionCard;
  UpQuestionNumber: () => void;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  isClickedAnswer: boolean;
  setIsClickedAnswer: Dispatch<SetStateAction<boolean>>;
};
export const Question: React.FC<questionOptions> = ({
  questionCard,
  UpQuestionNumber,
  setOpenModal,
  isClickedAnswer,
  setIsClickedAnswer,
}) => {
  return (
    <div className={styles.root}>
      <QuestionField question={questionCard.question} />
      <Answer
        A={questionCard.A}
        B={questionCard.B}
        C={questionCard.C}
        D={questionCard.D}
        rightAnswer={questionCard.rightAnswer}
        setOpenModal={setOpenModal}
        upQuestionNumber={UpQuestionNumber}
        setIsClickedAnswer={setIsClickedAnswer}
        isClickedAnswer={isClickedAnswer}
      />
    </div>
  );
};
