import React, {useEffect, useState} from 'react';
import styles from './GamePage.scss';
import Question from "../question/Question";
import getThreeQuestions from "../../model/Questions"
import {questionCard} from "../question/Question";
import logo from "/src/img/millionaire_icon.svg"

export const GamePage: React.FC = () => {
    const [score, setScore] = useState('$ 0')
    const [questionNumber, setQuestionNumber] = useState(0)
    const [questions, setQuestions] = useState(getThreeQuestions(questionNumber))
    const [levelNumber, setLevelNumber] = useState(1)

    const upQuestionNumber = () => {
        if (questionNumber % 3 === 2) {
            setQuestions(getThreeQuestions(3 * levelNumber + 1))
            setQuestionNumber(0)
            setLevelNumber(levelNumber + 1)
        } else setQuestionNumber(questionNumber + 1)
    }

    return (
        <div className={styles.root}>
            <div className={styles.background}>
                <div className={styles.background_image}>
                    <img className={styles.image} alt="image" src={logo}/>
                </div>
                <Question questionCard={questions[questionNumber] as questionCard} UpQuestionNumber = {upQuestionNumber} />
            </div>
        </div>
    );
};
