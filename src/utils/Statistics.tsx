import {QuestionModel} from '../models/QuestionModel';
import {getListAnswerAndRightAnswer} from './ListActiveAnswers';

function getStatistics(questions: QuestionModel, questionNumber: number) {
  let listStatistics: {[id: string]: number} = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  };
  const listAnswerAndAnswer = getListAnswerAndRightAnswer(questions);
  const listAnswer: {[variant: string]: string} = listAnswerAndAnswer.listAnswer;
  const rightAnswer = listAnswerAndAnswer.rightAnswer;
  const probabilityRightAnswer = 100 - Math.floor(Math.random() * 21) * Math.floor((questionNumber + 3) / 3);
  let probability = 100 - probabilityRightAnswer;
  listStatistics[rightAnswer] = probabilityRightAnswer;
  while (probability !== 0) {
    for (let i in listAnswer) {
      if (i !== rightAnswer) {
        const newProbability = Math.floor(Math.random() * (probability + 1));
        listStatistics[i] = listStatistics[i] + newProbability;
        probability -= newProbability;
      }
      if (probability === 0) break;
    }
  }
  return listStatistics;
}

export {getStatistics};
