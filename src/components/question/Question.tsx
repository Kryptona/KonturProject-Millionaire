import React, {useState} from "react";
import Answer from "./answer/Answer";

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
    // const [questions, setQuestion] = useState({
    //     question: "Как называется домик для птиц, сделанный руками человека?",
    //     A: "Избушка",
    //     B: "Скворечник",
    //     C: "Квартира",
    //     D: "Дупло",
    //     rightAnswer: "Избушка",
    //     id: 0
    // })
    return (
        <div>
            Вопрос: {question.question}
            <Answer A={question.A} B={question.B} C={question.C} D={question.D} rightAnswer={question.rightAnswer} upQuestionNumber={questionOptions.UpQuestionNumber}/>
        </div>
    )
}

export default Question