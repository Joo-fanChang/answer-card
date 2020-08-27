import PaperType from '@/constants/PaperType';
import ColumnNum from '@/constants/ColumnNum';

declare namespace GlobalValue {
  export interface AnswerCardData {
    cardId: string;
    cardTitle: string;
    paperType: PaperType;
    columnNum: ColumnNum;
    // 题目的总数量，根据这个参数可以获取最后的题号
    questionNumber: number;
    questions: any[];
  }

  export interface Action {
    type: Symbol;
    payload: any;
  }

  export interface IGeneralQuestionType {
    height: number;
    length: number;
    questionId: string;
    questionNo: number;
    questionType: number;
  };

  export interface IFillBlankQuestionType {
    rowId: string;
    height: number;
    group: IGeneralQuestionType[]
  };

  export interface IGeneralBigQuestionType {
    questionId: string;
    questionNo: number;
    questions: IGeneralQuestionType[] | IFillBlankQuestionType[];
    questionTitle: string;
    questionType: number;
    groupSize?: number; // 选择题一组的小题数
  };

  export interface IAction {
    type: string;
    payload: any;
  };
}

export = GlobalValue;
export as namespace GlobalValue;
