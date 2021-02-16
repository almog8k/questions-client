import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Question } from '../questions/models/question.model';
import { map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as QuestionsListActions from '../questions/question-list/store/questions-list.actions'
import * as fromApp from '../store/app.reducer'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = "http://localhost:3000/qa/";

  // selectedQuestion = new BehaviorSubject<Question>(null);
  // selectedSideBar = new BehaviorSubject<SideBarType>(SideBarType.None);
  // questions = new BehaviorSubject<Question[]>([]);

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) { }

  getQuestions(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl).pipe(
      map(res => {
        let questions = res['questions'];
        this.store.dispatch(new QuestionsListActions.SetQuestions(questions));
        // this.questions.next(questions)
      })
    )
  }
  addQuestion(question: Question) {
    return this.http.post(`${this.baseUrl}/create`, question, {
    }).pipe(
      map((res) => {
        let newQuestion = res['qa']
        this.store.dispatch(new QuestionsListActions.AddQuestion(newQuestion));
        // this.questions.value.push(res['qa'])
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
          // let removeIndex = this.questions.value.map(question => { return question.id; }).indexOf(questionId);
          // this.questions.value.splice(removeIndex, 1);
        }),
      );
  }
  private handleError(res: any) {
    let err = res.error.message;
    return throwError(err);
  }
}