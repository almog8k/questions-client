import { Action } from '@ngrx/store'
import { SideBarType } from '../../enums/sidebar.enum';
import { Question } from '../../models/question.model';

export const LOAD_QUESTIONS = 'LOAD_QUESTIONS';
export const LOAD_QUESTIONS_SUCCESS = 'LOAD_QUESTIONS_SUCCESS';
export const LOAD_QUESTIONS_FAILURE = 'LOAD_QUESTIONS_FAILURE';

export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_SUCCESS = 'ADD_QUESTION_SUCCESS';
export const ADD_QUESTION_FAILURE = 'ADD_QUESTION_FAILURE';

export const EDIT_QUESTION = 'EDIT_QUESTION';
export const EDIT_QUESTION_SUCCESS = 'EDIT_QUESTION_SUCCESS';
export const EDIT_QUESTION_FAILURE = 'EDIT_QUESTION_FAILURE';

export const DELETE_QUESTION = 'DELETE_QUESTION';
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';
export const DELETE_QUESTION_FAILURE = 'DELETE_QUESTION_FAILURE';

export const SET_SELECTED_QUESTION = 'SET_SELECTED_QUESTION';

export const SET_SIDE_BAR = 'SET_SIDE_BAR';

//Load Questions
export class LoadQuestions implements Action {
    readonly type: string = LOAD_QUESTIONS;
}
export class LoadQuestionsSuccess implements Action {
    readonly type: string = LOAD_QUESTIONS_SUCCESS;

    constructor(public payload: Question[]) { }
}
export class LoadQuestionsFailure implements Action {
    readonly type: string = LOAD_QUESTIONS_FAILURE;

    constructor(public payload: Error) { }
}

//Add Question
export class AddQuestion implements Action {
    readonly type: string = ADD_QUESTION;

    constructor(public payload: Question) { }
}
export class AddQuestionSuccess implements Action {
    readonly type: string = ADD_QUESTION_SUCCESS;

    constructor(public payload: Question) { }
}
export class AddQuestionFailure implements Action {
    readonly type: string = ADD_QUESTION_FAILURE;

    constructor(public payload: Error) { }
}

//Edit Question
export class EditQuestion implements Action {
    readonly type: string = EDIT_QUESTION;

    constructor(public payload: Question) { }
}
export class EditQuestionSuccess implements Action {
    readonly type: string = EDIT_QUESTION_SUCCESS;

    constructor(public payload: Question) { }
}
export class EditQuestionFailure implements Action {
    readonly type: string = EDIT_QUESTION_FAILURE;

    constructor(public payload: Error) { }
}

//Delete Question
export class DeleteQuestion implements Action {
    readonly type: string = DELETE_QUESTION;

    constructor(public payload: string) { }
}
export class DeleteQuestionSuccess implements Action {
    readonly type: string = DELETE_QUESTION_SUCCESS;

    constructor(public payload: string) { }
}
export class DeleteQuestionFailure implements Action {
    readonly type: string = DELETE_QUESTION_FAILURE;

    constructor(public payload: Error) { }
}

//Set Selected  Question
export class SetSelectedQuestion implements Action {
    readonly type: string = SET_SELECTED_QUESTION;

    constructor(public payload: Question) { }
}

//Set Selected  SideBar
export class SetSideBar implements Action {
    readonly type: string = SET_SIDE_BAR;

    constructor(public payload: SideBarType) { }
}


export type QuestionsListActionsType = LoadQuestions |
    LoadQuestionsSuccess |
    LoadQuestionsFailure |
    AddQuestion |
    AddQuestionSuccess |
    AddQuestionFailure |
    EditQuestion |
    EditQuestionSuccess |
    EditQuestionFailure |
    DeleteQuestion |
    DeleteQuestionSuccess |
    DeleteQuestionFailure |
    SetSelectedQuestion |
    SetSideBar;