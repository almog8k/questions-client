import { Action } from '@ngrx/store'
import { SideBarType } from '../../enums/sidebar.enum';
import { Question } from '../../models/question.model';

export const SET_QUESTIONS = 'SET_QUESTIONS';

export const ADD_QUESTION = 'ADD_QUESTION';

export const EDIT_QUESTION = 'EDIT_QUESTION';

export const DELETE_QUESTION = 'DELETE_QUESTION';

export const SET_SELECTED_QUESTION = 'SET_SELECTED_QUESTION';

export const SET_SIDE_BAR = 'SET_SIDE_BAR';


export class AddQuestion implements Action {
    readonly type: string = ADD_QUESTION;

    constructor(public payload: Question) { }
}

export class SetQuestions implements Action {
    readonly type: string = SET_QUESTIONS;

    constructor(public payload: Question[]) { }
}
export class EditQuestion implements Action {
    readonly type: string = EDIT_QUESTION;

    constructor(public payload: Question) { }
}
export class DeleteQuestion implements Action {
    readonly type: string = DELETE_QUESTION;

    constructor(public payload: string) { }
}
export class SetSelectedQuestion implements Action {
    readonly type: string = SET_SELECTED_QUESTION;

    constructor(public payload: Question) { }
}
export class SetSideBar implements Action {
    readonly type: string = SET_SIDE_BAR;

    constructor(public payload: SideBarType) { }
}


export type QuestionsListActionsType =
    | SetQuestions
    | AddQuestion
    | EditQuestion
    | DeleteQuestion
    | SetSelectedQuestion
    | SetSideBar;