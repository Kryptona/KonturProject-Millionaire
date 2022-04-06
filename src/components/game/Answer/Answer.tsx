import React, {Dispatch, SetStateAction, useState} from 'react';
import styles from './Answer.scss';
import {AnimationAnswerButton} from '../../shared/AnimationAnswerButton/AnimationAnswerButton';

type Props = {
  A: string;
  B: string;
  C: string;
  D: string;
  rightAnswer: string;
  upQuestionNumber: () => void;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  isClickedAnswer: boolean;
  setIsClickedAnswer: Dispatch<SetStateAction<boolean>>;
};
export const Answer: React.FC<Props> = ({
  A,
  B,
  C,
  D,
  rightAnswer,
  upQuestionNumber,
  setOpenModal,
  setIsClickedAnswer,
  isClickedAnswer,
}) => {
  const [isAnswerBacklight, setIsAnswerBacklight] = useState(false);
  const checkRightAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === rightAnswer) {
      // alert("Правильный ответ")
      setTimeout(() => {
        upQuestionNumber();
      }, 6001);
    } else {
      // alert("Ошибка");
      // setOpenModal(true)
      setTimeout(() => setIsAnswerBacklight(true), 4000);
      setTimeout(() => setOpenModal(true), 6000);
    }
  };
  const getNameClassByAnswer = (answer: string) => {
    return answer === rightAnswer;
  };

  return (
    <div className={styles.root}>
      <AnimationAnswerButton
        letter={'A'}
        onClick={() => checkRightAnswer(A)}
        answerText={A}
        isDisable={isClickedAnswer}
        setIsDisable={setIsClickedAnswer}
        classNameFieldAnswer={getNameClassByAnswer(A)}
        isAnswerBacklight={isAnswerBacklight}
        setIsAnswerBacklight={setIsAnswerBacklight}
      />
      <AnimationAnswerButton
        letter={'B'}
        onClick={() => checkRightAnswer(B)}
        answerText={B}
        isDisable={isClickedAnswer}
        setIsDisable={setIsClickedAnswer}
        classNameFieldAnswer={getNameClassByAnswer(B)}
        isAnswerBacklight={isAnswerBacklight}
        setIsAnswerBacklight={setIsAnswerBacklight}
      />
      <AnimationAnswerButton
        letter={'C'}
        onClick={() => checkRightAnswer(C)}
        answerText={C}
        isDisable={isClickedAnswer}
        setIsDisable={setIsClickedAnswer}
        classNameFieldAnswer={getNameClassByAnswer(C)}
        isAnswerBacklight={isAnswerBacklight}
        setIsAnswerBacklight={setIsAnswerBacklight}
      />
      <AnimationAnswerButton
        letter={'D'}
        onClick={() => checkRightAnswer(D)}
        answerText={D}
        isDisable={isClickedAnswer}
        setIsDisable={setIsClickedAnswer}
        classNameFieldAnswer={getNameClassByAnswer(D)}
        isAnswerBacklight={isAnswerBacklight}
        setIsAnswerBacklight={setIsAnswerBacklight}
      />
    </div>
  );
};
