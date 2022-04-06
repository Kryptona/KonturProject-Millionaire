import {questions} from '../resources/questions';
import {QuestionModel} from '../models/QuestionModel';

export let questionsList: QuestionModel[] = [];
let addedQuestions: number[] = [];

export default function initQuestionsList() {
  addedQuestions = [];
  questionsList = [];
  for (let level in questions) {
    addRandomItemsInList(questions[level]);
  }
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
