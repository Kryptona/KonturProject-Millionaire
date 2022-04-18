import {QuestionModel} from '../models/QuestionModel';
import {loadState} from './SessionStogageUtils';

export const ListActiveAnswer: {[variant: string]: boolean} = loadState('ListActiveAnswer', {
  A: true,
  B: true,
  C: true,
  D: true,
});

function activeHintsFiftyFifty(questions: QuestionModel) {
  const listAnswerAndAnswer = getListAnswerAndRightAnswer(questions);
  const listAnswer: {[variant: string]: string} = listAnswerAndAnswer.listAnswer;
  const rightAnswer = listAnswerAndAnswer.rightAnswer;
  let count = 0;
  while (count < 2) {
    for (let i in listAnswer) {
      if (i !== rightAnswer)
        if (Math.floor(Math.random() * 2) === 1) {
          if (ListActiveAnswer[i] && count < 2) {
            ListActiveAnswer[i] = false;
            count++;
          }
        }
    }
  }
}

export function getListAnswerAndRightAnswer(questions: QuestionModel) {
  const listAnswer: {[variant: string]: string} = {
    A: questions.A,
    B: questions.B,
    C: questions.C,
    D: questions.D,
  };
  const rightAnswer = getRightAnswer(listAnswer, questions.rightAnswer);

  return {listAnswer, rightAnswer};
}

function getRightAnswer(listAnswer: {[variant: string]: string}, rightAnswer: string): string {
  for (let i in listAnswer) {
    if (listAnswer[i] === rightAnswer) return i;
  }
  return 'A';
}

function resetList() {
  for (let i in ListActiveAnswer) {
    ListActiveAnswer[i] = true;
  }
}

function deactivateAnswer(variant: 'A' | 'B' | 'C' | 'D') {
  ListActiveAnswer[variant] = false;
}

export {deactivateAnswer, resetList, activeHintsFiftyFifty};
