import {QuestionModel} from '../models/QuestionModel';
import {getListAnswerAndRightAnswer} from './ListActiveAnswers';

const ListPhrases: {[id: number]: string} = {
  0: 'Я думаю, стоит выбрать вариант',
  1: 'Надейся на удачу, а я посоветую выбрать букву',
  2: 'Ты думаешь, я знаю, о чем этот вопрос? Но, я бы выбрал вариант',
  3: 'У меня политическая проблема, я не знаю ответ, но выбери',
};

function getPhrase(questions: QuestionModel, questionNumber: number): string {
  const listAnswerAndAnswer = getListAnswerAndRightAnswer(questions);
  const listAnswer: {[variant: string]: string} = listAnswerAndAnswer.listAnswer;
  const rightAnswer = listAnswerAndAnswer.rightAnswer;
  let answer = rightAnswer;
  if (Math.floor(Math.random() * 100) < 70 - 10 * Math.floor(questionNumber / 3)) {
    console.log(123);
    return ListPhrases[Math.floor(Math.random() * 4)] + ' ' + rightAnswer;
  } else {
    while (answer === rightAnswer) {
      for (let i in listAnswer) {
        if (Math.floor(Math.random() * 2) === 1) {
          answer = i;
        }
      }
    }
  }
  return ListPhrases[Math.floor(Math.random() * 4)] + ' ' + answer;
}

export {getPhrase};
