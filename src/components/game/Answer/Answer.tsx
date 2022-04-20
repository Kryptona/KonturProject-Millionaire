import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
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
  const delayedCalls = useRef<NodeJS.Timeout[]>([]);
  const timeChangeQuestion = 4001;
  const gameOverTime = 4000;
  const timeAnimation = 2000;

  const checkRightAnswer = (selectedAnswer: string, letter: 'A' | 'B' | 'C' | 'D'): void => {
    stopSoundTimer();
    if (selectedAnswer === rightAnswer) {
      if (isSoundActive) {
        const id = setTimeout(() => {
          soundRightAnswer();
        }, timeAnimation);
        delayedCalls.current.push(id);
      }

      const id = setTimeout(() => {
        upQuestionNumber();
      }, timeChangeQuestion);
      delayedCalls.current.push(id);
    } else {
      if (activeRightToWrong) {
        setActiveRightToWrong(false);
        deactivateAnswer(letter);
        return;
      }

      let id = setTimeout(() => {
        setIsClickedRightAnswer(false);
      }, timeAnimation);
      delayedCalls.current.push(id);

      id = setTimeout(() => {
        setIsAnswerBacklight(true);
        if (isSoundActive) soundLoseAnswer();
      }, timeAnimation);
      delayedCalls.current.push(id);

      id = setTimeout(() => setOpenModal(true), gameOverTime);
      delayedCalls.current.push(id);
    }
  };
  const getNameClassByAnswer = (answer: string) => {
    return answer === rightAnswer;
  };

  useEffect(() => {
    return () => {
      for (let id of delayedCalls.current) {
        clearTimeout(id);
      }
    };
  }, []);

  return (
    <div className={styles.root}>
      {[
        {answer: A, letter: 'A'} as const,
        {answer: B, letter: 'B'} as const,
        {answer: C, letter: 'C'} as const,
        {answer: D, letter: 'D'} as const,
      ].map((x) => (
        <AnimationAnswerButton
          letter={x.letter}
          onClick={() => checkRightAnswer(x.answer, x.letter)}
          answerText={x.answer}
          isDisable={isClickedAnswer}
          setIsDisable={setIsClickedAnswer}
          classNameFieldAnswer={getNameClassByAnswer(x.answer)}
          isAnswerBacklight={isAnswerBacklight}
          setIsAnswerBacklight={setIsAnswerBacklight}
          isSoundActive={isSoundActive}
        />
      ))}
    </div>
  );
};
