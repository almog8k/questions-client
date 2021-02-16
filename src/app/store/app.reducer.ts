import * as fromQuestionsList from '../questions/question-list/store/questions-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    questionsList: fromQuestionsList.State;
    // auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    questionsList: fromQuestionsList.questionsListReducer
    // auth: fromAuth.authReducer
};