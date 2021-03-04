import { Question } from '../../models/question.model';
import { SideBarType } from '../../enums/sidebar.enum';
import * as QuestionsListActions from './questions-list.actions';

export interface State {
    questions: Question[];
    loading: boolean,
    error: Error,
    selectedQuestion: Question;
    selectedSideBar: SideBarType;
}

const initialState: State = {
    questions: [],
    loading: false,
    error: undefined,
    selectedQuestion: null,
    selectedSideBar: SideBarType.None
};


export function questionsListReducer(state: State = initialState, action): State {
    switch (action.type) {
        case QuestionsListActions.LOAD_QUESTIONS:
            return {
                ...state,
                loading: true
            };
        case QuestionsListActions.LOAD_QUESTIONS_SUCCESS:
            return {
                ...state,
                questions: action.payload,
                loading: false
            }
        case QuestionsListActions.LOAD_QUESTIONS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case QuestionsListActions.ADD_QUESTION:
            return {
                ...state,
                loading: true
            };
        case QuestionsListActions.ADD_QUESTION_SUCCESS:
            return {
                ...state,
                questions: [...state.questions, action.payload],
                loading: false,
                selectedSideBar: SideBarType.None
            };
        case QuestionsListActions.ADD_QUESTION_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case QuestionsListActions.EDIT_QUESTION:
            return {
                ...state,
                loading: true
            };
        case QuestionsListActions.EDIT_QUESTION_SUCCESS:
            const updatedQuestion = action.payload;
            const updateIndex = state.questions
                .map(question => question.id)
                .indexOf(action.payload.id);
            const updtatedQuestions = [...state.questions];
            updtatedQuestions[updateIndex] = updatedQuestion;
            return {
                ...state,
                questions: updtatedQuestions,
                loading: false,
                selectedSideBar: SideBarType.None
            };
        case QuestionsListActions.EDIT_QUESTION_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case QuestionsListActions.DELETE_QUESTION:
            return {
                ...state,
                loading: true
            };
        case QuestionsListActions.DELETE_QUESTION_SUCCESS:
            return {
                ...state,
                questions: [...state.questions.filter(question => question.id !== action.payload)],
                loading: false

            };
        case QuestionsListActions.DELETE_QUESTION_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case QuestionsListActions.SET_SELECTED_QUESTION:
            return {
                ...state,
                selectedQuestion: action.payload
            }
        case QuestionsListActions.SET_SIDE_BAR:
            return {
                ...state,
                selectedSideBar: action.payload
            }
        default:
            return state;
    }
}


