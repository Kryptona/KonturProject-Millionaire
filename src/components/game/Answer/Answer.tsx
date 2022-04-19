import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import styles from './Answer.scss';
import {AnimationAnswerButton} from '../../shared/AnimationAnswerButton/AnimationAnswerButton';
import {deactivateAnswer} from '../../../utils/ListActiveAnswers';
import useSound from 'use-sound';
import audioFileLost from '/src/sounds/loss.mp3';
import audioFileRight from '/src/sounds/rightAnswer.mp3';

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
  stopSoundTimer: () => void;
  isSoundActive: boolean;
  setIsClickedRightAnswer: Dispatch<SetStateAction<boolean>>;
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
  stopSoundTimer,
  isSoundActive,
  setIsClickedRightAnswer,
}) => {
  const [isAnswerBacklight, setIsAnswerBacklight] = useState(false);
  const [soundLoseAnswer] = useSound(audioFileLost, {volume: 1});
  const [soundRightAnswer] = useSound(audioFileRight, {volume: 1});
  const delayedCalls: NodeJS.Timeout[] = [];

  const checkRightAnswer = (selectedAnswer: string, letter: 'A' | 'B' | 'C' | 'D'): void => {
    stopSoundTimer();
    if (selectedAnswer === rightAnswer) {
      if (isSoundActive) {
        const id = setTimeout(() => {
          soundRightAnswer();
        }, 4000);
        delayedCalls.push(id);
      }
      const id = setTimeout(() => {
        upQuestionNumber();
      }, 6001);
      delayedCalls.push(id);
    } else {
      if (activeRightToWrong) {
        setActiveRightToWrong(false);
        deactivateAnswer(letter);
        return;
      }
      let id = setTimeout(() => {
        setIsClickedRightAnswer(false);
        console.log(123);
      }, 4000);
      delayedCalls.push(id);
      id = setTimeout(() => {
        setIsAnswerBacklight(true);
        if (isSoundActive) soundLoseAnswer();
      }, 4000);
      delayedCalls.push(id);
      id = setTimeout(() => setOpenModal(true), 6000);
      delayedCalls.push(id);
    }
  };
  const getNameClassByAnswer = (answer: string) => {
    return answer === rightAnswer;
  };

  useEffect(() => {
    return () => {
      for (let id of delayedCalls) {
        clearTimeout(id);
      }
    };
  }, []);

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
        isSoundActive={isSoundActive}
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
        isSoundActive={isSoundActive}
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
        isSoundActive={isSoundActive}
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
        isSoundActive={isSoundActive}
      />
    </div>
  );
};
