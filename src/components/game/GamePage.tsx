import React, {useEffect, useState} from 'react';
import styles from './GamePage.scss';
import {Question} from './Question/Question';
import logo from '/src/img/millionaire_icon.svg';
import {Scores} from './Scores/Scores';
import {scores} from '../../resources/scores';
import {ModalEndGame} from './ModalEndGame/ModalEndGame';
import {Timer} from './Timer/Timer';
import {getQuestionsList} from '../../utils/Questions';
import {QuestionModel} from '../../models/QuestionModel';
import {Hints} from './Hints/Hints';
import {resetList} from '../../utils/ListActiveAnswers';
import {ModalCallFriend} from './Hints/ModalCallFriend/ModalCallFriend';
import {ModalHallHelp} from './Hints/ModalHallHelp/ModalHallHelp';
import {HighScore} from '../../models/HighScore';
import {v4 as uuidv4} from 'uuid';
import {highScoresRepository} from '../../data/highScoresRepository';
import {localStorageRepository} from '../../data/localStorageRepository';
import {saveSessionState} from '../../utils/StogagesUtils';
import {useSessionStorage} from '../../utils/Hooks';
import useSound from 'use-sound';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft, faBell, faBellSlash} from '@fortawesome/free-solid-svg-icons';
import audioFileStartGame from '/src/sounds/selectAnswer.mp3';
import audioFileTimer from '/src/sounds/timer.mp3';

const TIME_ANSWER = 30;

export const GamePage: React.FC = () => {
  const [fireproofedScore, setFireproofedScore] = useSessionStorage('fireproofedScore', 0);
  const [questionNumber, setQuestionNumber] = useSessionStorage('questionNumber', 0);
  const [timer, setTimer] = useSessionStorage('timer', TIME_ANSWER);
  const [isClickedAnswer, setIsClickedAnswer] = useState(false);
  const [activeRightToWrong, setActiveRightToWrong] = useSessionStorage('activeRightToWrong', false);
  const [isOpenFriedModal, setIsOpenFriedModal] = useSessionStorage('isOpenFriedModal', false);
  const [isOpenHallHelpModal, setIsOpenHallHelpModal] = useSessionStorage('isOpenHallHelpModal', false);
  const [isEndGame, setIsEndGame] = useSessionStorage('isEndGame', false);
  const [userId] = useState(uuidv4());
  const [isSoundActive, setIsSoundActive] = useState(false);
  const [isClickedRightAnswer, setIsClickedRightAnswer] = useSessionStorage('isClickedRightAnswer', true);

  const [startGameSound] = useSound(audioFileStartGame, {volume: 1});
  const [timerSound, {stop}] = useSound(audioFileTimer, {volume: 1});

  const [questionsList, setQuestionsList] = useState(() => getQuestionsList(false));

  const upQuestionNumber = () => {
    resetList();
    const currentScore = scores[questionNumber];
    if (currentScore.fireproof) {
      setFireproofedScore(currentScore.amount);
    }

    if (questionNumber === 14) {
      finishGame();
      resetList();
      return;
    }
    setQuestionNumber(questionNumber + 1);
    setTimer(TIME_ANSWER);
    if (isSoundActive) resetTimerSound();
  };

  const resetTimerSound = () => {
    stop();
    timerSound();
  };

  const resetGame = () => {
    setFireproofedScore(0);
    setQuestionNumber(0);
    setTimer(TIME_ANSWER);
    setQuestionsList(getQuestionsList(true));
    setIsOpenFriedModal(false);
    setIsOpenHallHelpModal(false);
    setIsEndGame(false);
    resetList();
    sessionStorage.clear();
    if (isSoundActive) {
      resetTimerSound();
      startGameSound();
    }
  };

  const finishGame = () => {
    setIsEndGame(true);
    stop();
    const highScore: HighScore = {
      id: userId,
      name: localStorageRepository.readUserName(),
      score: fireproofedScore,
    };

    highScoresRepository.writeScore(highScore);
  };

  useEffect(() => {
    saveSessionState('questionsList', questionsList);
    if (isEndGame) sessionStorage.clear();
  }, [questionsList]);

  const finishGameByUser = () => {
    setIsEndGame(true);
    stop();
    const highScore: HighScore = {
      id: userId,
      name: localStorageRepository.readUserName(),
      score: scores[questionNumber].amount,
    };

    highScoresRepository.writeScore(highScore);
  };

  const onSound = () => {
    if (!isClickedAnswer) timerSound();
  };

  const offSound = () => {
    stop();
  };

  const onClickSoundIcon = () => {
    if (isSoundActive) {
      setIsSoundActive(false);
      offSound();
    } else {
      onSound();
      setIsSoundActive(true);
    }
  };

  useEffect(() => {
    return () => {
      stop();
      if (!isClickedRightAnswer) {
        setIsEndGame(true);
      }
    };
  }, [stop]);

  return (
    <div className={styles.root}>
      <div className={styles.display}>
        <button className={styles.end_game_bt} onClick={() => finishGameByUser()}>
          <FontAwesomeIcon icon={faAngleLeft} color={'white'} size={'lg'} />
          <span className={styles.content_bt}>Закончить игру</span>
        </button>
        <button className={styles.sound_bt} onClick={onClickSoundIcon}>
          {isSoundActive ? (
            <FontAwesomeIcon icon={faBell} color={'white'} size={'lg'} />
          ) : (
            <FontAwesomeIcon icon={faBellSlash} color={'white'} size={'lg'} />
          )}
        </button>
        <img className={styles.image} src={logo} alt={'Кто хочет стать миллионером?'} />
        <Scores id={questionNumber} />
      </div>
      <Timer
        time={timer}
        setCounter={setTimer}
        setOpenModal={setIsEndGame}
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
      {isEndGame && (
        <ModalEndGame
          isSoundActive={isSoundActive}
          resetGame={resetGame}
          scores={fireproofedScore}
          isOpen={isEndGame}
          name="Джо"
        />
      )}
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
        stopSoundTimer={stop}
        isSoundActive={isSoundActive}
        setIsClickedRightAnswer={setIsClickedRightAnswer}
      />
    </div>
  );
};
