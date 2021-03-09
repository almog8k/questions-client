import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as QuestionListActions from './questions-list.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { QuestionApiService } from '../../services/question-api.service';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class QuestionListEffects {

    constructor(private actions$: Actions, private questionsService: QuestionApiService) { }

    loadQuestions$ = createEffect(() => this.actions$
        .pipe(
            ofType(QuestionListActions.LOAD_QUESTIONS),
            mergeMap(
                () => this.questionsService.getQuestions()
                    .pipe(
                        map(data => {
                            return new QuestionListActions.LoadQuestionsSuccess(data["questions"])
                        }),
                        catchError(error => of(new QuestionListActions.LoadQuestionsFailure(error)))
                    )
            ),
        )
    )

    addQuestion$ = createEffect(() => this.actions$
        .pipe(
            ofType<QuestionListActions.AddQuestion>(QuestionListActions.ADD_QUESTION),
            mergeMap(
                (action) => this.questionsService.addQuestion(action.payload)
                    .pipe(
                        map((data) => {
                            return new QuestionListActions.AddQuestionSuccess(data["qa"])
                        }),
                        catchError(error => of(new QuestionListActions.AddQuestionFailure(error)))
                    )
            ),
        )
    )
    editQuestion$ = createEffect(() => this.actions$
        .pipe(
            ofType<QuestionListActions.EditQuestion>(QuestionListActions.EDIT_QUESTION),
            mergeMap(
                (action) => this.questionsService.editQuestion(action.payload)
                    .pipe(
                        map((data) => {
                            return new QuestionListActions.EditQuestionSuccess(data["qa"])
                        }),
                        catchError(error => of(new QuestionListActions.EditQuestionFailure(error)))
                    )
            ),
        )
    )
    deleteQuestion$ = createEffect(() => this.actions$
        .pipe(
            ofType<QuestionListActions.DeleteQuestion>(QuestionListActions.DELETE_QUESTION),
            mergeMap(
                (action) => this.questionsService.deleteQuestion(action.payload)
                    .pipe(
                        map(() => {
                            return new QuestionListActions.DeleteQuestionSuccess(action.payload)
                        }),
                        catchError(error => of(new QuestionListActions.DeleteQuestionFailure(error)))
                    )
            ),
        )
    )

}