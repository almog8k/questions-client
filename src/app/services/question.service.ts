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

  selectedQuestion = new BehaviorSubject<Question>(null);
  selectedSideBar = new BehaviorSubject<SideBarType>(SideBarType.None);
  questionsChanged = new Subject<void>();

  constructor(private http:HttpClient , private apiServie:ApiService ) {}
     
    getQuestions(): Observable<any>{
    return this.http.get<Observable<any>>(this.baseUrl);
    
  }    
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
        let err = res.error.message;
        return throwError(err);
      }
}