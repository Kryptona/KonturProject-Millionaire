import React, {Dispatch, useEffect, useRef, useState} from 'react';
import {QuestionField} from '../QuestionField/QuestionField';
import {QuestionModel} from '../../../models/QuestionModel';
import {AnimationAnswerButton} from '../../shared/AnimationAnswerButton/AnimationAnswerButton';
import useSound from 'use-sound';
import {deactivateAnswer} from '../../../utils/ListActiveAnswers';
import styles from './Question.scss';
import audioFileLost from '/src/sounds/loss.mp3';
import audioFileRight from '/src/sounds/rightAnswer.mp3';

interface Props {
  questionCard: QuestionModel;
  onSwitchQuestion: () => void;
  onSelectAnswer: () => void;
  onRightAnswer: () => void;
  onWrongAnswer: () => void;
  onGameOver: () => void;
  isClickedAnswer: boolean;
  setIsClickedAnswer: Dispatch<boolean>;
  activeRightToWrong: boolean;
  setActiveRightToWrong: Dispatch<boolean>;
  setIsClickedRightAnswer: Dispatch<boolean>;
  isSoundActive: boolean;
  isEndGame: boolean;
}

const timeChangeQuestion = 4001;
const gameOverTime = 4000;
const timeAnimation = 2000;
export const Question: React.FC<Props> = ({
  questionCard,
  onSwitchQuestion,
  onSelectAnswer,
  onRightAnswer,
  onWrongAnswer,
  onGameOver,
  isClickedAnswer,
  setIsClickedAnswer,
  setActiveRightToWrong,
  activeRightToWrong,
  setIsClickedRightAnswer,
  isSoundActive,
  isEndGame,
}) => {
  const [isAnswerBacklight, setIsAnswerBacklight] = useState(false);
  const [soundLoseAnswer] = useSound(audioFileLost, {volume: 1});
  const [soundRightAnswer] = useSound(audioFileRight, {volume: 1});
  const delayedCalls = useRef<NodeJS.Timeout[]>([]);

  const onSelectAnswerWrapper = (selectedAnswer: string, letter: 'A' | 'B' | 'C' | 'D'): void => {
    onSelectAnswer();

    if (selectedAnswer === questionCard.rightAnswer) {
      const rightAnswerTimerId = setTimeout(() => {
        onRightAnswer();
        if (isSoundActive) {
          soundRightAnswer();
        }
      }, timeAnimation);
      delayedCalls.current.push(rightAnswerTimerId);

      const switchQuestionTimerId = setTimeout(() => {
        onSwitchQuestion();
      }, timeChangeQuestion);
      delayedCalls.current.push(switchQuestionTimerId);
    } else {
      if (activeRightToWrong) {
        setActiveRightToWrong(false);
        deactivateAnswer(letter);
        return;
      }

      const wrongAnswerTimerId = setTimeout(() => {
        onWrongAnswer();
        setIsClickedRightAnswer(false);
        setIsAnswerBacklight(true);
        if (isSoundActive) {
          soundLoseAnswer();
        }
      }, timeAnimation);
      delayedCalls.current.push(wrongAnswerTimerId);

      const gameOverTimerId = setTimeout(() => {
        onGameOver();
      }, gameOverTime);
      delayedCalls.current.push(gameOverTimerId);
    }
  };

  useEffect(() => {
    return () => {
      for (let id of delayedCalls.current) {
        clearTimeout(id);
      }
    };
  }, []);

  useEffect(() => {
    for (let id of delayedCalls.current) {
      clearTimeout(id);
      setIsAnswerBacklight(false);
    }
  }, [isEndGame]);

  return (
    <div className={styles.root}>
      <QuestionField question={questionCard.question} />
      <div className={styles.answers}>
        {[
          {answer: questionCard.A, letter: 'A'} as const,
          {answer: questionCard.B, letter: 'B'} as const,
          {answer: questionCard.C, letter: 'C'} as const,
          {answer: questionCard.D, letter: 'D'} as const,
        ].map((x) => (
          <AnimationAnswerButton
            letter={x.letter}
            onClick={() => onSelectAnswerWrapper(x.answer, x.letter)}
            answerText={x.answer}
            isDisable={isClickedAnswer}
            setIsDisable={setIsClickedAnswer}
            classNameFieldAnswer={x.answer === questionCard.rightAnswer}
            isAnswerBacklight={isAnswerBacklight}
            setIsAnswerBacklight={setIsAnswerBacklight}
            isSoundActive={isSoundActive}
            isEndGame={isEndGame}
          />
        ))}
      </div>
    </div>
  );
};
