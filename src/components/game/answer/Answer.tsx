import React from "react";
import styles from "./Answer.scss"
import {AnswerCustomButton} from "../../shared/AnswerCustomButton/AnswerCustomButton";

type Props = {
    A: string,
    B: string,
    C: string,
    D: string,
    rightAnswer: string,
    upQuestionNumber: () => void
}
export const Answer: React.FC<Props> = ({A, B, C, D, rightAnswer, upQuestionNumber}) => {
    const checkRightAnswer = (selectedAnswer: string) => {
        if (selectedAnswer === rightAnswer) {
            alert("Правильный ответ")
            upQuestionNumber()
        } else alert("Ошибка");
    }

    return (
        <div className={styles.root}>
            <AnswerCustomButton className={styles.variantA} letter={'A'} onClick={() => checkRightAnswer(A)}>
                {A}
            </AnswerCustomButton>
            <AnswerCustomButton className={styles.variantB} letter={'B'} onClick={() => checkRightAnswer(B)}>
                {B}
            </AnswerCustomButton>
            <AnswerCustomButton className={styles.variantC} letter={'C'} onClick={() => checkRightAnswer(C)}>
                {C}
            </AnswerCustomButton>
            <AnswerCustomButton className={styles.variantD} letter={'D'} onClick={() => checkRightAnswer(D)}>
                {D}
            </AnswerCustomButton>
        </div>
    );
};
