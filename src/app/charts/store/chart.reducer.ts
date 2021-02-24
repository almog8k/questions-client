import { ITreeNode } from '../tree/treeModel/inode';
import * as ChartActions from './chart.actions'

export interface State {

    selectedDates: Date[];
    isPopularToggle: boolean;
    initialTree: ITreeNode[];
}

const initialState: State = {
    selectedDates: [],
    isPopularToggle: false,
    initialTree: []
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
        case ChartActions.SET_TREE:
            return {
                ...state,
                initialTree: action.payload
            };
        default:
            return state;
    }
}
