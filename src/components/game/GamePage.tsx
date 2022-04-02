import React, {useState} from 'react';
import styles from './GamePage.scss';
import {Question} from "./question/Question";
import getThreeQuestions from "../../utils/Questions"
import {questionCard} from "./question/Question";
import logo from "/src/img/millionaire_icon.svg"
import {Scores} from "./scores/Scores";
import {scores} from "../../resources/scores";
import {ModalEndGame} from "./ModalEndGame/ModalEndGame";

export const GamePage: React.FC = () => {
    const [score, setScore] = useState(0)
    const [questionNumber, setQuestionNumber] = useState(1)
    const [questions, setQuestions] = useState(getThreeQuestions(questionNumber))
    const [levelNumber, setLevelNumber] = useState(0)
    const [isEndGame, setIsEndGame] = useState(false)

    const upQuestionNumber = () => {
        if (questionNumber % 3 === 0) {
            if (questionNumber * levelNumber == 12) {
                setIsEndGame(true)
                setScore(scores[(3 * levelNumber) + questionNumber - 1].amount)
                return
            }
            setQuestions(getThreeQuestions(3 * levelNumber + 1))
            setQuestionNumber(1)
            setLevelNumber(levelNumber + 1)
        } else setQuestionNumber(questionNumber + 1)
        setScore(scores[(3 * levelNumber) + questionNumber - 1].amount)
    }

    const resetGame = () => {
        setScore(0)
        setQuestionNumber(1)
        setQuestions(getThreeQuestions(questionNumber))
        setLevelNumber(0)
    }

    return (
        <div className={styles.root}>
            <div className={styles.display}>
                <img className={styles.image} alt="image" src={logo}/>
                <Scores id={questionNumber}/>
            </div>
            {isEndGame &&
            <ModalEndGame resetGame={resetGame} setOpenModal={setIsEndGame} scores={score} isOpen={isEndGame}
                          name="Джо"/>}
            <span className={styles.score}>Вы набрали - {score}</span>
            <Question questionCard={questions[questionNumber - 1] as questionCard} UpQuestionNumber={upQuestionNumber}
                      setOpenModal={setIsEndGame}/>
        </div>
    );
};
