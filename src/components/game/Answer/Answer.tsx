import React, {Dispatch, SetStateAction, useState} from 'react';
import styles from './Answer.scss';
import {AnimationAnswerButton} from '../../shared/AnimationAnswerButton/AnimationAnswerButton';
import {deactivateAnswer, ListActiveAnswer} from '../../../utils/ListActiveAnswers';

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
  activeRightToWrong: boolean;
  setActiveRightToWrong: Dispatch<SetStateAction<boolean>>;
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
  setActiveRightToWrong,
  activeRightToWrong,
}) => {
  const [isAnswerBacklight, setIsAnswerBacklight] = useState(false);
  const checkRightAnswer = (selectedAnswer: string, letter: 'A' | 'B' | 'C' | 'D'): void => {
    if (selectedAnswer === rightAnswer) {
      // alert("Правильный ответ")
      setTimeout(() => {
        upQuestionNumber();
      }, 6001);
    } else {
      // alert("Ошибка");
      // setOpenModal(true)
      if (activeRightToWrong) {
        setActiveRightToWrong(false);
        deactivateAnswer(letter);
        return;
      }
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
        onClick={() => checkRightAnswer(A, 'A')}
        answerText={A}
        isDisable={isClickedAnswer}
        setIsDisable={setIsClickedAnswer}
        classNameFieldAnswer={getNameClassByAnswer(A)}
        isAnswerBacklight={isAnswerBacklight}
        setIsAnswerBacklight={setIsAnswerBacklight}
      />
      <AnimationAnswerButton
        letter={'B'}
        onClick={() => checkRightAnswer(B, 'B')}
        answerText={B}
        isDisable={isClickedAnswer}
        setIsDisable={setIsClickedAnswer}
        classNameFieldAnswer={getNameClassByAnswer(B)}
        isAnswerBacklight={isAnswerBacklight}
        setIsAnswerBacklight={setIsAnswerBacklight}
      />
      <AnimationAnswerButton
        letter={'C'}
        onClick={() => checkRightAnswer(C, 'C')}
        answerText={C}
        isDisable={isClickedAnswer}
        setIsDisable={setIsClickedAnswer}
        classNameFieldAnswer={getNameClassByAnswer(C)}
        isAnswerBacklight={isAnswerBacklight}
        setIsAnswerBacklight={setIsAnswerBacklight}
      />
      <AnimationAnswerButton
        letter={'D'}
        onClick={() => checkRightAnswer(D, 'D')}
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
