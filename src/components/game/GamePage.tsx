import React, {useState} from 'react';
import styles from './GamePage.scss';
import {Question} from "./question/Question";
import getThreeQuestions from "../../model/Questions"
import {questionCard} from "./question/Question";
import logo from "/src/img/millionaire_icon.svg"
import {Scores} from "./scores/Scores";
import scoresList from "../../resources/scores.json";
import {EndGameMenuPage} from "../endGameMenuPage/EndGameMenuPage";

export const GamePage: React.FC = () => {
    const [score, setScore] = useState('0 руб.')
    const [questionNumber, setQuestionNumber] = useState(1)
    const [questions, setQuestions] = useState(getThreeQuestions(questionNumber))
    const [levelNumber, setLevelNumber] = useState(0)
    const [isEndGame, setIsEndGame] = useState(false)

    const upQuestionNumber = () => {
        if (questionNumber % 3 === 0) {
            if (questionNumber * levelNumber == 12) {
                setIsEndGame(true)
                setScore(scoresList[(3 * levelNumber) + questionNumber - 1].amount)
                return
            }
            setQuestions(getThreeQuestions(3 * levelNumber + 1))
            setQuestionNumber(1)
            setLevelNumber(levelNumber + 1)
        } else setQuestionNumber(questionNumber + 1)
        setScore(scoresList[(3 * levelNumber) + questionNumber - 1].amount)
    }

    const resetGame = () => {
        setScore('0 руб.')
        setQuestionNumber(1)
        setQuestions(getThreeQuestions(questionNumber))
        setLevelNumber(0)
    }

    return (
        <div className={styles.root}>
            <div className={styles.display}>
                <img className={styles.image} alt="image" src={logo}/>
                <Scores />
            </div>
            {isEndGame && <EndGameMenuPage resetGame={resetGame} setOpenModal={setIsEndGame} scores={score} isOpen={isEndGame} name="Джо"/>}
            <span className={styles.score}>Вы набрали - {score}</span>
            <Question questionCard={questions[questionNumber - 1] as questionCard} UpQuestionNumber={upQuestionNumber} setOpenModal={setIsEndGame}/>
        </div>
    );
};
