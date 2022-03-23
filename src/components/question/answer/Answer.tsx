import questions from "../../../resources/questions.json"
import React from "react";
import {CustomButton} from "../../shared/CustomButton/CustomButton";
import styles from "./Answer.scss"

type answer_card = {
    A: string,
    B: string,
    C: string,
    D: string,
    rightAnswer: string,
    upQuestionNumber : () => void
}
const RightAnswerContext = React.createContext('')
const Answer = (answer: answer_card) => {
    return (
        <RightAnswerContext.Provider value={answer.rightAnswer}>
            <div className={styles.root}>
                <div className={styles.answer_buttons}>
                    <ButtonAnswer text={answer.A} variant={"A"} upQuestionNumber={answer.upQuestionNumber}/>
                    <ButtonAnswer text={answer.B} variant={"B"} upQuestionNumber={answer.upQuestionNumber}/>
                </div>
                <div className={styles.answer_buttons}>
                    <ButtonAnswer text={answer.C} variant={"C"} upQuestionNumber={answer.upQuestionNumber}/>
                    <ButtonAnswer text={answer.D} variant={"D"} upQuestionNumber={answer.upQuestionNumber}/>
                </div>
            </div>
        </RightAnswerContext.Provider>
    );
};

type answer = {
    text : string,
    upQuestionNumber: () => void,
    variant: string
}
const ButtonAnswer = (answer: answer) => {
    const checkRightAnswer = (rightAnswer: string) => {
        if (answer.text === rightAnswer) {
            alert("Правильный ответ")
            answer.upQuestionNumber()
        }
        else alert("Ошибка")
    }
    return (
        <RightAnswerContext.Consumer>{rightAnswer =>
            <span className={styles.answer_button_background}>
                <CustomButton className={styles.answer_button} onClick={() => checkRightAnswer(rightAnswer)}>
                    <a className={styles.variant}>{answer.variant}: </a>
                    <a>{answer.text}</a></CustomButton>
            </span>
        }</RightAnswerContext.Consumer>
    )
}
export default Answer