import { Action } from '@ngrx/store'

export const SET_DATES = 'SET_DATES';

export const POPULAR_TOGGLED = 'POPULAR_TOGGLED';

export class SetDates implements Action {
    readonly type: string = SET_DATES;

    constructor(public payload: Date[]) { }
}

export class PopularToggled implements Action {
    readonly type: string = POPULAR_TOGGLED;

    constructor(public payload: boolean) { }
}

export type QuestionsListActionsType =
    | SetDates
    | PopularToggled;

