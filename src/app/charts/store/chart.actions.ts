import { Action } from '@ngrx/store'
import { ITreeNode } from '../tree/treeModel/inode';

export const SET_DATES = 'SET_DATES';

export const POPULAR_TOGGLED = 'POPULAR_TOGGLED';

export const SET_TREE = 'SET_TREE';

export class SetDates implements Action {
    readonly type: string = SET_DATES;

    constructor(public payload: Date[]) { }
}

export class PopularToggled implements Action {
    readonly type: string = POPULAR_TOGGLED;

    constructor(public payload: boolean) { }
}

export class SetTree implements Action {
    readonly type: string = SET_TREE;

    constructor(public payload: ITreeNode[]) { }
}


export type QuestionsListActionsType =
    | SetDates
    | PopularToggled
    | SetTree;

