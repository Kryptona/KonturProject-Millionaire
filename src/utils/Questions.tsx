import {questions} from '../resources/questions';
import {QuestionModel} from '../models/QuestionModel';

export const questionsList: QuestionModel[] = [];
let addedQuestions: number[] = [];

export default function initQuestionsList() {
  addedQuestions = [];
  addRandomItemsInList(questions.veryEasy);
  addRandomItemsInList(questions.easy);
  addRandomItemsInList(questions.normal);
  addRandomItemsInList(questions.hard);
  addRandomItemsInList(questions.veryHard);
}

function addRandomItemsInList(listElements: Array<QuestionModel>, count: number = 3) {
  let resList = [];
  for (let i = 0; i < count && i < listElements.length; i++) {
    let rnd = Math.floor(Math.random() * (listElements.length - i)) + i;
    let quest = listElements[rnd];
    while (addedQuestions.includes(quest.id)) {
      rnd = Math.floor(Math.random() * (listElements.length - i)) + i;
      quest = listElements[rnd];
    }
    listElements[rnd] = listElements[i];
    listElements[i] = quest;
    addedQuestions.push(quest.id);
    resList.push(quest);
  }
  questionsList.push(...resList);
}
