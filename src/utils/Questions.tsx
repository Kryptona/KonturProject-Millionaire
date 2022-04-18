import {questions} from '../resources/questions';
import {QuestionModel} from '../models/QuestionModel';
import {loadState, saveState} from './SessionStogageUtils';

let questionsList: QuestionModel[] = [];
let addedQuestions: number[] = [];

export function getQuestionsList(isUpdate: boolean): ReadonlyArray<QuestionModel> {
  if (isUpdate) {
    initQuestionsList();
    saveState('questionsList', questionsList);
  } else questionsList = loadState('questionsList', initQuestionsList());
  return questionsList;
}

function initQuestionsList() {
  addedQuestions = [];
  questionsList = [];
  for (let level in questions) {
    addRandomItemsInList(questions[level]);
  }
  return questionsList;
}

export function updateQuestionList() {
  questionsList = [];
  for (let level in questions) {
    addRandomItemsInList(questions[level]);
  }
  saveState('questionsList', questionsList);
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
