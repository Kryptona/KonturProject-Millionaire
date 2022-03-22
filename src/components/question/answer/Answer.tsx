import questions from "../../../resources/questions.json"
import React from "react";

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
            <div>
                <div>
                    A:
                    <ButtonAnswer text={answer.A} upQuestionNumber={answer.upQuestionNumber}/>
                    B:
                    <ButtonAnswer text={answer.B} upQuestionNumber={answer.upQuestionNumber}/>
                </div>
                <div>
                    C:
                    <ButtonAnswer text={answer.C} upQuestionNumber={answer.upQuestionNumber}/>
                    D:
                    <ButtonAnswer text={answer.D} upQuestionNumber={answer.upQuestionNumber}/>
                </div>
            </div>
        </RightAnswerContext.Provider>
    );
};

type answer = {
    text : string,
    upQuestionNumber: () => void
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
            <span>
                <button onClick={() => checkRightAnswer(rightAnswer)}>{answer.text}</button>
            </span>
        }</RightAnswerContext.Consumer>
    )
}
export default Answer