import * as ChartActions from './chart.actions'

export interface State {

    selectedDates: Date[];
    isPopularToggle: boolean;
}

const initialState: State = {
    selectedDates: [],
    isPopularToggle: false
};

export function chartsReducer(state: State = initialState, action) {
    switch (action.type) {
        case ChartActions.SET_DATES:
            return {
                ...state,
                selectedDates: action.payload
            }
        case ChartActions.POPULAR_TOGGLED:
            return {
                ...state,
                isPopularToggle: action.payload
            };
        default:
            return state;
    }
}
