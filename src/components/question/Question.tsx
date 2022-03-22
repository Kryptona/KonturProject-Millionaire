import React, {useState} from "react";
import Answer from "./answer/Answer";
import "./Question.scss"

type questionCard = {
    question: string,
    A: string,
    B: string,
    C: string,
    D: string,
    rightAnswer: string,
}
export type {questionCard}
type questionOptions = {
    questionCard : questionCard,
    UpQuestionNumber : () => void,
}
const Question  = (questionOptions : questionOptions ) => {
    const question = questionOptions.questionCard
    return (
        <div className="card_question">
            Вопрос: {question.question}
            <Answer A={question.A} B={question.B} C={question.C} D={question.D} rightAnswer={question.rightAnswer} upQuestionNumber={questionOptions.UpQuestionNumber}/>
        </div>
    )
}

export default Question