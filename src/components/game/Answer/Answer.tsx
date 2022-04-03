import React, {Dispatch, SetStateAction} from 'react';
import styles from './Answer.scss';
import {AnswerCustomButton} from '../../shared/AnswerCustomButton/AnswerCustomButton';

type Props = {
  A: string;
  B: string;
  C: string;
  D: string;
  rightAnswer: string;
  upQuestionNumber: () => void;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};
export const Answer: React.FC<Props> = ({A, B, C, D, rightAnswer, upQuestionNumber, setOpenModal}) => {
  const checkRightAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === rightAnswer) {
      // alert("Правильный ответ")
      upQuestionNumber();
    } else {
      // alert("Ошибка");
      setOpenModal(true);
    }
  };

  return (
    <div className={styles.root}>
      <AnswerCustomButton className={styles.variantA} letter={'A'} onClick={() => checkRightAnswer(A)}>
        {A}
      </AnswerCustomButton>
      <AnswerCustomButton className={styles.variantB} letter={'B'} onClick={() => checkRightAnswer(B)}>
        {B}
      </AnswerCustomButton>
      <AnswerCustomButton className={styles.variantC} letter={'C'} onClick={() => checkRightAnswer(C)}>
        {C}
      </AnswerCustomButton>
      <AnswerCustomButton className={styles.variantD} letter={'D'} onClick={() => checkRightAnswer(D)}>
        {D}
      </AnswerCustomButton>
    </div>
  );
};
