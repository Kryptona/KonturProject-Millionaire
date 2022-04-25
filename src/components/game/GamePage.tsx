import React, {useEffect, useState} from 'react';
import styles from './GamePage.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {saveSessionState} from '../../utils/StoragesUtils';
import {useLocalStorage, useSessionStorage} from '../../utils/Hooks';
import {Question} from './Question/Question';
import {Scores} from './Scores/Scores';
import {scores} from '../../resources/scores';
import {ModalEndGame} from './ModalEndGame/ModalEndGame';
import {Timer} from './Timer/Timer';
import {getQuestionsList} from '../../utils/Questions';
import {Hints} from './Hints/Hints';
import {resetList} from '../../utils/ListActiveAnswers';
import {ModalCallFriend} from './Hints/ModalCallFriend/ModalCallFriend';
import {ModalHallHelp} from './Hints/ModalHallHelp/ModalHallHelp';
import {v4 as uuidv4} from 'uuid';
import {highScoresRepository} from '../../data/highScoresRepository';
import {localStorageRepository} from '../../data/localStorageRepository';
import useSound from 'use-sound';
import audioFileStartGame from '/src/sounds/selectAnswer.mp3';
import {faAngleLeft, faBell, faBellSlash} from '@fortawesome/free-solid-svg-icons';
import audioFileTimer from '/src/sounds/timer.mp3';
import {PersonsShower, PersonsShowerStage} from './PersonsShower/PersonsShower';
import {GlassButton} from '../shared/GlassView/GlassButton';

const TIME_ANSWER = 30;

export const GamePage: React.FC = () => {
  const [fireproofedScore, setFireproofedScore] = useSessionStorage('fireproofedScore', 0);
  const [questionNumber, setQuestionNumber] = useSessionStorage('questionNumber', 0);
  const [timer, setTimer] = useSessionStorage('timer', TIME_ANSWER);
  const [isClickedAnswer, setIsClickedAnswer] = useState(false);
  const [activeRightToWrong, setActiveRightToWrong] = useSessionStorage('activeRightToWrong', false);

  const [isOpenFriendModal, setIsOpenFriendModal] = useSessionStorage('isOpenFriendModal', false);
  const [isOpenHallHelpModal, setIsOpenHallHelpModal] = useSessionStorage('isOpenHallHelpModal', false);
  const [isEndGame, setIsEndGame] = useSessionStorage('isEndGame', false);
  const [userId] = useState(uuidv4());
  const [isSoundActive, setIsSoundActive] = useState(false);

  const [isClickedRightAnswer, setIsClickedRightAnswer] = useSessionStorage('isClickedRightAnswer', true);
  const [personAnimation, setPersonAnimation] = useState<PersonsShowerStage>(PersonsShowerStage.asking);

  const [volume] = useLocalStorage('soundLevel', 0.5);
  const [startGameSound] = useSound(audioFileStartGame, {volume: volume});
  const [timerSound, {stop}] = useSound(audioFileTimer, {volume: volume});

  const [questionsList, setQuestionsList] = useState(() => getQuestionsList(false));

  useEffect(() => {
    saveSessionState('questionsList', questionsList);
    if (isEndGame) sessionStorage.clear();
  }, [questionsList]);

  useEffect(() => {
    return () => {
      stop();
      if (!isClickedRightAnswer) {
        setIsEndGame(true);
      }
    };
  }, [stop]);

  useEffect(() => {
    if (personAnimation === PersonsShowerStage.asking) {
      setTimeout(() => {
        setPersonAnimation(PersonsShowerStage.thinking);
      }, 1500);
    }
  }, [personAnimation]);

  const onSwitchQuestion = () => {
    setPersonAnimation(PersonsShowerStage.asking);

    resetList();
    const currentScore = scores[questionNumber];
    if (currentScore.fireproof) {
      setFireproofedScore(currentScore.amount);
    }

    if (questionNumber === 14) {
      onGameEnd();
      resetList();
      return;
    }
    setQuestionNumber(questionNumber + 1);
    setTimer(TIME_ANSWER);
    if (isSoundActive) resetTimerSound();
  };

  const onSelectAnswer = () => {
    setPersonAnimation(PersonsShowerStage.answering);
    stop();
  };

  const onRightAnswer = () => {
    setPersonAnimation(PersonsShowerStage.winning);
  };

  const onWrongAnswer = () => {
    setPersonAnimation(PersonsShowerStage.loosing);
  };

  const resetTimerSound = () => {
    stop();
    timerSound();
  };

  const onRestart = () => {
    setPersonAnimation(PersonsShowerStage.asking);
    setFireproofedScore(0);
    setQuestionNumber(0);
    setTimer(TIME_ANSWER);
    setQuestionsList(getQuestionsList(true));
    setIsOpenFriendModal(false);
    setIsOpenHallHelpModal(false);
    setIsEndGame(false);
    resetList();
    sessionStorage.clear();
    if (isSoundActive) {
      resetTimerSound();
      startGameSound();
    }
  };

  const onGameEnd = () => {
    setIsEndGame(true);
    stop();
    saveScore(fireproofedScore);
  };

  const onGameEndByUser = () => {
    const score = scores[questionNumber - 1]?.amount || 0;
    setFireproofedScore(score);
    setIsEndGame(true);
    stop();
    saveScore(score);
  };

  const saveScore = (score: number) => {
    highScoresRepository.writeScore({
      id: userId,
      name: localStorageRepository.readUserName(),
      score: score,
    });
  };

  const onClickSoundIcon = () => {
    if (isSoundActive) {
      setIsSoundActive(false);
      stop();
    } else {
      setIsSoundActive(true);
      if (!isClickedAnswer) {
        timerSound();
      }
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.buttons}>
        <GlassButton className={styles.end_game_bt} onClick={() => onGameEndByUser()}>
          <FontAwesomeIcon icon={faAngleLeft} color={'white'} size={'lg'} />
        </GlassButton>

        <GlassButton className={styles.sound_bt} onClick={onClickSoundIcon}>
          <FontAwesomeIcon color={'white'} size={'lg'} icon={isSoundActive ? faBell : faBellSlash} />
        </GlassButton>

        <Timer
          time={timer}
          setCounter={setTimer}
          setOpenModal={setIsEndGame}
          isDisable={isClickedAnswer}
          isOpenModal={isEndGame}
        />
      </div>

      <div className={styles.persons_shower}>
        <PersonsShower stage={personAnimation} />
      </div>

      <div className={styles.score}>
        <Scores id={questionNumber} />
      </div>

      <div className={styles.hints}>
        <Hints
          restart={isEndGame}
          disable={isClickedAnswer}
          questions={questionsList[questionNumber]}
          setActiveRightToWrong={setActiveRightToWrong}
          setIsOpenFriendModal={setIsOpenFriendModal}
          setIsOpenHallHelpModal={setIsOpenHallHelpModal}
          setQuestionsList={setQuestionsList}
          isSoundActive={isSoundActive}
        />
      </div>

      <div className={styles.questions}>
        <Question
          questionCard={questionsList[questionNumber]}
          onSwitchQuestion={onSwitchQuestion}
          onSelectAnswer={onSelectAnswer}
          onRightAnswer={onRightAnswer}
          onWrongAnswer={onWrongAnswer}
          onGameOver={onGameEnd}
          isClickedAnswer={isClickedAnswer}
          setIsClickedAnswer={setIsClickedAnswer}
          activeRightToWrong={activeRightToWrong}
          setActiveRightToWrong={setActiveRightToWrong}
          setIsClickedRightAnswer={setIsClickedRightAnswer}
          isSoundActive={isSoundActive}
          isEndGame={isEndGame}
        />
      </div>

      {isEndGame && <ModalEndGame score={fireproofedScore} onRestart={onRestart} isSoundActive={isSoundActive} />}
      {isOpenHallHelpModal && (
        <ModalHallHelp
          onClose={() => setIsOpenHallHelpModal(false)}
          question={questionsList[questionNumber]}
          questionNumber={questionNumber}
        />
      )}
      {isOpenFriendModal && (
        <ModalCallFriend
          onClose={() => setIsOpenFriendModal(false)}
          question={questionsList[questionNumber]}
          questionNumber={questionNumber}
        />
      )}
    </div>
  );
};
