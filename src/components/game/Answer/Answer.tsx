import React, {Dispatch, SetStateAction, useState} from "react";
import styles from "./Answer.scss"
import {AnswerCustomButton} from "../../shared/AnswerCustomButton/AnswerCustomButton";
import {AnimationAnswerButton} from "../../shared/AnimationAnswerButton/AnimationAnswerButton";

type Props = {
    A: string,
    B: string,
    C: string,
    D: string,
    rightAnswer: string,
    upQuestionNumber: () => void,
    setOpenModal: Dispatch<SetStateAction<boolean>>
}
export const Answer: React.FC<Props> = ({A, B, C, D, rightAnswer, upQuestionNumber, setOpenModal}) => {
    const [isClickedAnswer, setIsClickedAnswer] = useState(false)
    const checkRightAnswer = (selectedAnswer: string) => {
        if (selectedAnswer === rightAnswer) {
            // alert("Правильный ответ")
            setTimeout(() => upQuestionNumber(), 6000)
        } else {
            // alert("Ошибка");
            // setOpenModal(true)
            setTimeout(() => setOpenModal(true), 6000)
        }
    }

    return (
        <div className={styles.root}>
            <AnimationAnswerButton className={styles.variantA} letter={'A'} onClick={() => checkRightAnswer(A)}
                                   answerText={A} isDisable={isClickedAnswer} setIsDisable={setIsClickedAnswer}/>
            <AnimationAnswerButton className={styles.variantB} letter={'B'} onClick={() => checkRightAnswer(B)}
                                   answerText={B} isDisable={isClickedAnswer} setIsDisable={setIsClickedAnswer}/>
            <AnimationAnswerButton className={styles.variantC} letter={'C'} onClick={() => checkRightAnswer(C)}
                                   answerText={C} isDisable={isClickedAnswer} setIsDisable={setIsClickedAnswer}/>
            <AnimationAnswerButton className={styles.variantD} letter={'D'} onClick={() => checkRightAnswer(D)}
                                   answerText={D} isDisable={isClickedAnswer} setIsDisable={setIsClickedAnswer}/>
        </div>
    );
};
