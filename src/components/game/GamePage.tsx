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
import {loadState, saveState} from '../../utils/localStogageUtils';

const TIME_ANSWER = 30;

export const GamePage: React.FC = () => {
  const [fireproofedScore, setFireproofedScore] = useState(loadState('fireproofedScore', 0));
  const [questionNumber, setQuestionNumber] = useState(loadState('questionNumber', 0));
  const [isEndGame, setIsEndGame] = useState(loadState('isEndGame', false));
  const [timer, setTimer] = useState(loadState('timer', TIME_ANSWER));
  const [isClickedAnswer, setIsClickedAnswer] = useState(loadState('isClickedAnswer', false));
  const [activeRightToWrong, setActiveRightToWrong] = useState(loadState('activeRightToWrong', false));
  const [isOpenFriedModal, setIsOpenFriedModal] = useState(loadState('isOpenFriedModal', false));
  const [isOpenHallHelpModal, setIsOpenHallHelpModal] = useState(loadState('isOpenHallHelpModal', false));
  const [userId, setUserId] = useState(uuidv4());

  const [questionsList, setQuestionsList] = useState(() => getQuestionsList(false));

  const upQuestionNumber = () => {
    resetList();
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
    setTimer(TIME_ANSWER);
    localStorage.clear();
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
    localStorage.clear();
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
  //TODO переписать на пользовательский хук!
  useEffect(() => {
    saveState('questionsList', questionsList);
    saveState('timer', timer);
    saveState('questionNumber', questionNumber);
    saveState('fireproofedScore', fireproofedScore);
    saveState('isEndGame', isEndGame);
    saveState('isOpenFriedModal', isOpenFriedModal);
    saveState('isOpenHallHelpModal', isOpenHallHelpModal);
    saveState('activeRightToWrong', activeRightToWrong);
    saveState('isClickedAnswer', isClickedAnswer);
    if (isEndGame) localStorage.clear();
  }, [
    questionsList,
    timer,
    questionNumber,
    fireproofedScore,
    isOpenFriedModal,
    isOpenHallHelpModal,
    activeRightToWrong,
    isClickedAnswer,
  ]);

  return (
    <div className={styles.root}>
      <div className={styles.display}>
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
