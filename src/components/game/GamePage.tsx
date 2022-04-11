import React, {useState} from 'react';
import styles from './GamePage.scss';
import {Question} from './Question/Question';
import logo from '/src/img/millionaire_icon.svg';
import {Scores} from './Scores/Scores';
import {scores} from '../../resources/scores';
import {ModalEndGame} from './ModalEndGame/ModalEndGame';
import {Timer} from './Timer/Timer';
import {questionsList, initQuestionsList} from '../../utils/Questions';
import {QuestionModel} from '../../models/QuestionModel';
import {Hints} from './Hints/Hints';
import {resetList} from '../../utils/ListActiveAnswers';

const TIME_ANSWER = 30;

export const GamePage: React.FC = () => {
  const [fireproofedScore, setFireproofedScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isEndGame, setIsEndGame] = useState(false);
  const [counter, setCounter] = useState(TIME_ANSWER);
  const [isClickedAnswer, setIsClickedAnswer] = useState(false);

  // const questionsList = getQuestionsList();

  const upQuestionNumber = () => {
    const currentScore = scores[questionNumber + 1];
    if (currentScore.fireproof) {
      setFireproofedScore(currentScore.amount);
    }

    if (questionNumber === 15) {
      setIsEndGame(true);
      resetList();
      return;
    }
    setQuestionNumber(questionNumber + 1);
    setCounter(TIME_ANSWER);
    resetList();
  };

  const resetGame = () => {
    setFireproofedScore(0);
    setQuestionNumber(0);
    setCounter(TIME_ANSWER);
    initQuestionsList();
  };

  return (
    <div className={styles.root}>
      <div className={styles.display}>
        <img className={styles.image} src={logo} />
        <Scores id={questionNumber} />
      </div>
      <Timer
        time={counter}
        setCounter={setCounter}
        setOpenModal={setIsEndGame}
        isDisable={isClickedAnswer}
        isOpenModal={isEndGame}
      />
      <Hints restart={isEndGame} disable={isClickedAnswer} questions={questionsList[questionNumber] as QuestionModel} />
      {isEndGame && (
        <ModalEndGame
          resetGame={resetGame}
          setOpenModal={setIsEndGame}
          scores={fireproofedScore}
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
