import React, {useState} from 'react';
import styles from './GamePage.scss';
import {Question} from "./question/Question";
import getThreeQuestions from "../../model/Questions"
import {questionCard} from "./question/Question";
import logo from "/src/img/millionaire_icon.svg"
import {Scores} from "./scores/Scores";
import scoresList from "../../resources/scores.json";

export const GamePage: React.FC = () => {
    const [score, setScore] = useState('0 руб.')
    const [questionNumber, setQuestionNumber] = useState(1)
    const [questions, setQuestions] = useState(getThreeQuestions(questionNumber))
    const [levelNumber, setLevelNumber] = useState(1)

    const upQuestionNumber = () => {
        console.log(questionNumber)
        console.log(questions)
        if (questionNumber % 3 === 0) {
            setQuestions(getThreeQuestions(3 * levelNumber + 1))
            setQuestionNumber(1)
            setLevelNumber(levelNumber + 1)
        } else setQuestionNumber(questionNumber + 1)
        setScore(scoresList[levelNumber * questionNumber - 1].amount)
    }

    return (
        <div className={styles.root}>
            <div className={styles.display}>
                <img className={styles.image} alt="image" src={logo}/>
                <Scores numberQuestions={questionNumber} levelGame={levelNumber}/>
            </div>
            <span className={styles.score}>Вы набрали - {score}</span>
            <Question questionCard={questions[questionNumber - 1] as questionCard} UpQuestionNumber={upQuestionNumber}/>
        </div>
    );
};
