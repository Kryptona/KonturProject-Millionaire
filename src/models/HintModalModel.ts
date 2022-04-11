import {Dispatch, SetStateAction} from 'react';
import {QuestionModel} from './QuestionModel';

export interface HintModalModel {
  isOpen: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  questions: QuestionModel;
  questionNumber: number;
}
