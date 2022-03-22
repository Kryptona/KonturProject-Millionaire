import questions from "../../../resources/questions.json"
import React from "react";

type answer_card = {
    A: string,
    B: string,
    C: string,
    D: string,
    rightAnswer: string
}

const RightAnswerContext = React.createContext('')
const Answer = (answer: answer_card) => {
    return (
        <RightAnswerContext.Provider value={answer.rightAnswer}>
            <div>
                <ButtonAnswer text={answer.A}/>
                <ButtonAnswer text={answer.B}/>
                <ButtonAnswer text={answer.C}/>
                <ButtonAnswer text={answer.D}/>
            </div>
        </RightAnswerContext.Provider>
    );
};

type answer = {
    text : string
}
const ButtonAnswer = (answer: answer) => {
    const checkRightAnswer = (rightAnswer: string) => {
        if (answer.text === rightAnswer)
            alert("Правильный ответ")
        else alert("Ошибка")
    }
    return (
        <RightAnswerContext.Consumer>{rightAnswer =>
            <div>
                <button onClick={() => checkRightAnswer(rightAnswer)}>{answer.text}</button>
            </div>
        }</RightAnswerContext.Consumer>
    )
}
export default Answer