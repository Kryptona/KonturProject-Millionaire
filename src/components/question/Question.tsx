import React, {useState} from "react";
import Answer from "./answer/Answer";

const Question = () => {
    const [questions, setQuestion] = useState({
        question: "Как называется домик для птиц, сделанный руками человека?",
        A: "Избушка",
        B: "Скворечник",
        C: "Квартира",
        D: "Дупло",
        rightAnswer: "Избушка",
        id: 0
    })
    return (
        <div>
            Вопрос
            <Answer A={questions.A} B={questions.B} C={questions.C} D={questions.D} rightAnswer={questions.rightAnswer} />
        </div>
    )
}

export default Question