import { Question } from '../../models/question.model';
import { SideBarType } from '../../enums/sidebar.enum'
import * as QuestionsListActions from './questions-list.actions'

export interface State {
    questions: any[];
    selectedQuestion: Question;
    selectedSideBar: SideBarType;
}

const initialState: State = {
    questions: [],
    selectedQuestion: null,
    selectedSideBar: SideBarType.None
};


export function questionsListReducer(state: State = initialState, action) {
    switch (action.type) {
        case QuestionsListActions.SET_QUESTIONS:
            return {
                ...state,
                questions: action.payload
            }
        case QuestionsListActions.ADD_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.payload]
            };
        case QuestionsListActions.EDIT_QUESTION:
            const updatedQuestion = action.payload;
            const updateIndex = getQuestionIndex(updatedQuestion["id"]);
            const updtatedQuestions = [...state.questions];
            updtatedQuestions[updateIndex] = updatedQuestion;
            return {
                ...state,
                questions: updtatedQuestions
            };
        case QuestionsListActions.DELETE_QUESTION:
            const deleteIndex = getQuestionIndex(action.payload);
            return {
                ...state,
                questions: [...state.questions.filter((question, qIndex) => {
                    return qIndex !== deleteIndex;
                })]
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
    function getQuestionIndex(id) {
        return state.questions.map(
            question => { return question.id; })
            .indexOf(id);
    }
}


