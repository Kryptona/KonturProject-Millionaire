import React, {useEffect, useState} from 'react';
import styles from './GamePage.scss';
import {Question} from './Question/Question';
import logo from '/src/img/millionaire_icon.svg';
import {Scores} from './Scores/Scores';
import {scores} from '../../resources/scores';
import {ModalEndGame} from './ModalEndGame/ModalEndGame';
import {Timer} from './Timer/Timer';
import {questionsList, initQuestionsList, getQuestionsList} from '../../utils/Questions';
import {QuestionModel} from '../../models/QuestionModel';
import {Hints} from './Hints/Hints';
import {resetList} from '../../utils/ListActiveAnswers';
import {HighScore} from '../../models/HighScore';
import {v4 as uuidv4} from 'uuid';
import {User} from '../../models/User';
import {appRepository} from '../../data/appRepository';

const TIME_ANSWER = 30;

export const GamePage: React.FC = () => {
  const [fireproofedScore, setFireproofedScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isEndGame, setIsEndGame] = useState(false);
  const [counter, setCounter] = useState(TIME_ANSWER);
  const [isClickedAnswer, setIsClickedAnswer] = useState(false);
  const [activeRightToWrong, setActiveRightToWrong] = useState(false);
  const [userId, setUserId] = useState(uuidv4());

  const questionsList = getQuestionsList();

  const upQuestionNumber = () => {
    const currentScore = scores[questionNumber + 1];
    if (currentScore.fireproof) {
      setFireproofedScore(currentScore.amount);
    }

    if (questionNumber === 15) {
      finishGame();
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
    setIsEndGame(false);
  };

  const finishGame = () => {
    setIsEndGame(true);

    const highScore: HighScore = {
      amount: fireproofedScore,
    };

    const user: User = {
      id: userId,
      name: 'Joe',
    };

    appRepository.writeScore(user, highScore);

    // const scores: HighScore[] = JSON.parse(localStorage.getItem('scores') as string) || [];
    // scores.push(highScore);
    // localStorage.setItem('scores', JSON.stringify(scores));
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
        setOpenModal={finishGame}
        isDisable={isClickedAnswer}
        isOpenModal={isEndGame}
      />
      <Hints
        restart={isEndGame}
        disable={isClickedAnswer}
        questions={questionsList[questionNumber] as QuestionModel}
        setActiveRightToWrong={setActiveRightToWrong}
      />
      {isEndGame && <ModalEndGame resetGame={resetGame} scores={fireproofedScore} isOpen={isEndGame} name="Джо" />}
      <Question
        questionCard={questionsList[questionNumber] as QuestionModel}
        UpQuestionNumber={upQuestionNumber}
        setOpenModal={finishGame}
        isClickedAnswer={isClickedAnswer}
        setIsClickedAnswer={setIsClickedAnswer}
        activeRightToWrong={activeRightToWrong}
        setActiveRightToWrong={setActiveRightToWrong}
      />
    </div>
  );
};
