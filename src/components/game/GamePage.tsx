import React, {useEffect, useState} from 'react';
import styles from './GamePage.scss';
import {Question} from './Question/Question';
import logo from '/src/img/millionaire_icon.svg';
import {Scores} from './Scores/Scores';
import {scores} from '../../resources/scores';
import {ModalEndGame} from './ModalEndGame/ModalEndGame';
import {Timer} from './Timer/Timer';
import {questionsList} from '../../utils/Questions';
import initQuestionsList from '../../utils/Questions';
import {QuestionModel} from '../../models/QuestionModel';
import {Prompt} from '../shared/Promt/Prompt';
import {Promts} from './Promts/Promts';

const TIME_ANSWER = 30;

export const GamePage: React.FC = () => {
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isEndGame, setIsEndGame] = useState(false);
  const [counter, setCounter] = useState(TIME_ANSWER);
  const [isClickedAnswer, setIsClickedAnswer] = useState(false);
  const [winScores, setWinScores] = useState(0);

  const upQuestionNumber = () => {
    if (questionNumber === 15) {
      setIsEndGame(true);
      setScore(scores[questionNumber].amount);
      return;
    }
    setQuestionNumber(questionNumber + 1);
    setScore(scores[questionNumber].amount);
    setCounter(TIME_ANSWER);
    if (scores[questionNumber + 1].fireproof) {
      setWinScores(scores[questionNumber + 1].amount);
    }
  };

  const resetGame = () => {
    setScore(0);
    setQuestionNumber(0);
    setCounter(TIME_ANSWER);
    initQuestionsList();
  };

  return (
    <div className={styles.root}>
      <div className={styles.display}>
        <img className={styles.image} alt="image" src={logo} />
        <Scores id={questionNumber} />
      </div>
      <Timer
        time={counter}
        setCounter={setCounter}
        setOpenModal={setIsEndGame}
        isDisable={isClickedAnswer}
        isOpenModal={isEndGame}
      />
      <Promts />
      {isEndGame && (
        <ModalEndGame
          resetGame={resetGame}
          setOpenModal={setIsEndGame}
          scores={winScores}
          isOpen={isEndGame}
          name="Джо"
        />
      )}
      <Question
        questionCard={questionsList[questionNumber] as QuestionModel}
        UpQuestionNumber={upQuestionNumber}
        setOpenModal={setIsEndGame}
        isClickedAnswer={isClickedAnswer}
        setIsClickedAnswer={setIsClickedAnswer}
      />
    </div>
  );
};
