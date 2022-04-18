import React, {useState} from 'react';
import styles from './GamePage.scss';
import {Question} from './Question/Question';
import logo from '/src/img/millionaire_icon.svg';
import {Scores} from './Scores/Scores';
import {scores} from '../../resources/scores';
import {ModalEndGame} from './ModalEndGame/ModalEndGame';
import {Timer} from './Timer/Timer';
import {initQuestionsList, getQuestionsList} from '../../utils/Questions';
import {QuestionModel} from '../../models/QuestionModel';
import {Hints} from './Hints/Hints';
import {resetList} from '../../utils/ListActiveAnswers';
import {ModalCallFriend} from './Hints/ModalCallFriend/ModalCallFriend';
import {ModalHallHelp} from './Hints/ModalHallHelp/ModalHallHelp';
import {HighScore} from '../../models/HighScore';
import {v4 as uuidv4} from 'uuid';
import {highScoresRepository} from '../../data/highScoresRepository';
import {localStorageRepository} from '../../data/localStorageRepository';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';

const TIME_ANSWER = 30;

export const GamePage: React.FC = () => {
  const [fireproofedScore, setFireproofedScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isEndGame, setIsEndGame] = useState(false);
  const [counter, setCounter] = useState(TIME_ANSWER);
  const [isClickedAnswer, setIsClickedAnswer] = useState(false);
  const [activeRightToWrong, setActiveRightToWrong] = useState(false);
  const [isOpenFriedModal, setIsOpenFriedModal] = useState(false);
  const [isOpenHallHelpModal, setIsOpenHallHelpModal] = useState(false);
  const [userId, setUserId] = useState(uuidv4());

  const [questionsList, setQuestionsList] = useState(() => getQuestionsList());

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
    setQuestionsList(getQuestionsList());
    setIsOpenFriedModal(false);
    setIsOpenHallHelpModal(false);
    setIsEndGame(false);
  };

  const finishGame = () => {
    setIsEndGame(true);

    const highScore: HighScore = {
      id: userId,
      name: localStorageRepository.readUserName(),
      score: fireproofedScore,
    };

    highScoresRepository.writeScore(highScore);
  };

  const finishGameByUser = () => {
    setIsEndGame(true);

    const highScore: HighScore = {
      id: userId,
      name: localStorageRepository.readUserName(),
      score: scores[questionNumber].amount,
    };

    highScoresRepository.writeScore(highScore);
  };

  return (
    <div className={styles.root}>
      <div className={styles.display}>
        <button className={styles.end_game_bt} onClick={() => finishGameByUser()}>
          <FontAwesomeIcon icon={faAngleLeft} color={'white'} size={'lg'} />
          <span className={styles.content_bt}>Закончить игру</span>
        </button>
        <img className={styles.image} src={logo} alt={'Кто хочет стать миллионером?'} />
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
        setIsOpenFriedModal={setIsOpenFriedModal}
        setIsOpenHallHelpModal={setIsOpenHallHelpModal}
        setQuestionsList={setQuestionsList}
      />
      {isEndGame && <ModalEndGame resetGame={resetGame} scores={fireproofedScore} isOpen={isEndGame} name="Джо" />}
      {isOpenHallHelpModal && (
        <ModalHallHelp
          isOpen={isOpenHallHelpModal}
          setOpenModal={setIsOpenHallHelpModal}
          questions={questionsList[questionNumber] as QuestionModel}
          questionNumber={questionNumber}
        />
      )}
      {isOpenFriedModal && (
        <ModalCallFriend
          isOpen={isOpenFriedModal}
          setOpenModal={setIsOpenFriedModal}
          questions={questionsList[questionNumber] as QuestionModel}
          questionNumber={questionNumber}
        />
      )}
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
