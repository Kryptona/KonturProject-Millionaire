import React, {Dispatch, SetStateAction} from 'react';
import {Answer} from '../Answer/Answer';
import styles from './Question.scss';
import {QuestionField} from '../QuestionField/QuestionField';
import {QuestionModel} from '../../../models/QuestionModel';

type questionOptions = {
  questionCard: QuestionModel;
  UpQuestionNumber: () => void;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  isClickedAnswer: boolean;
  setIsClickedAnswer: Dispatch<SetStateAction<boolean>>;
  activeRightToWrong: boolean;
  setActiveRightToWrong: Dispatch<SetStateAction<boolean>>;
  stopSoundTimer: () => void;
};

export const Question: React.FC<questionOptions> = ({
  questionCard,
  UpQuestionNumber,
  setOpenModal,
  isClickedAnswer,
  setIsClickedAnswer,
  setActiveRightToWrong,
  activeRightToWrong,
  stopSoundTimer,
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
        activeRightToWrong={activeRightToWrong}
        setActiveRightToWrong={setActiveRightToWrong}
        stopSoundTimer={stopSoundTimer}
      />
    </div>
  );
};
