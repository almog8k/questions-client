import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Question } from '../models/question.model';
import { map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as QuestionsListActions from '../question-list/store/questions-list.actions'
import * as fromApp from '../../store/app.reducer'

@Injectable({
  providedIn: 'root'
})
export class QuestionApiService {
  private baseUrl = "http://localhost:3000/qa/";


  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) { }

  getQuestions(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl);
  }
  addQuestion(question: Question) {
    return this.http.post(`${this.baseUrl}/create`, question, {
    }).pipe(
      map((res) => {
        let newQuestion = res['qa']
        this.store.dispatch(new QuestionsListActions.AddQuestion(newQuestion));
        window.alert(res['message']);
      }),
      catchError(this.handleError)
    );
  }
  editQuestion(question: Question) {
    return this.http.put(`${this.baseUrl}/update/${question.id}`, question, {
    }).pipe(
      map((res) => {
        let updatedQuestion = res['newQuestion']
        this.store.dispatch(new QuestionsListActions.EditQuestion(updatedQuestion));
        window.alert(res['message']);
      }),
      catchError(this.handleError)
    );
  }
  deleteQuestion(questionId: string) {
    return this.http.delete(`${this.baseUrl}/delete/${questionId}`)
      .pipe(
        map((res) => {
          this.store.dispatch(new QuestionsListActions.DeleteQuestion(questionId));
        }),
      );
  }
  private handleError(res: any) {
    let err = res.error.message;
    return throwError(err);
  }
}