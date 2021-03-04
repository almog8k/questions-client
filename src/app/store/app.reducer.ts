import * as fromQuestionsList from '../questions/question-list/store/questions-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromCharts from '../charts/store/chart.reducer'

export interface AppState {
    questionsList: fromQuestionsList.State;
    charts: fromCharts.State;
    // auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    questionsList: fromQuestionsList.questionsListReducer,
    charts: fromCharts.chartsReducer
    // auth: fromAuth.authReducer
};
