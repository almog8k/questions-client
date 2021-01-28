import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { Question } from '../questions/models/question.model';
import { map, catchError, tap } from 'rxjs/operators';
import {SideBarType} from '../questions/enums/sidebar.enum'
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class QuestionService  {
  private baseUrl = "http://localhost:3000/qa/";

  questionSelected = new Subject<Question>();
  selectedBtn = new Subject<SideBarType>();
  questionsSubject = new BehaviorSubject<Question[]>(null);
  questionAdded = new Subject<void>();
  questionDeleted = new Subject<void>();
  questionedited = new Subject<void>();
  
  constructor(private http:HttpClient , private apiServie:ApiService ) {}
     
    getQuestions(): Observable<any>{
    return this.http.get<Observable<any>>(this.baseUrl);
    
  }
    // getQuestionsTest(): Observable<Question[]>{
    //   this.refreshQuestionsData();
    //   return this.questionsSubject.asObservable();
    // }
    // refreshQuestionsData(): Observable<void>{
    //   return this.http.get<any>(this.baseUrl).pipe(
    //     tap(response =>{
    //       this.questionsSubject.next(response.questions)
    //     })
    //   );
    // }
    
      addQuestion(question:Question){
        return this.http.post(`${this.baseUrl}/create`,question,{
        }).pipe(
          map((res) => {
            window.alert(res['message']);
          }),
          catchError(this.handleError)          
        );    
      }
      editQuestion(question:Question){
        return this.http.put(`${this.baseUrl}/update/${question.id}` , question,{
          }).pipe(
            map((res) => {
              window.alert(res['message']);
            }),
            catchError(this.handleError)
          );    
      }
      deleteQuestion(questionId:string){
          return this.http.delete(`${this.baseUrl}/delete/${questionId}`)
          .pipe(       
            map((res) => {
              window.alert(res['message']);
            }),
            catchError(this.handleError)           
            );
      }

      private handleError(res:any) {
        let err = res.error;
        return throwError(err);
      }
}