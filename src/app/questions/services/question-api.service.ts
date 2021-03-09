import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class QuestionApiService {
  private baseUrl = environment.questionsApiUrl;


  constructor(private http: HttpClient) { }

  getQuestions() {
    return this.http.get<Observable<any>>(this.baseUrl);
  }
  addQuestion(question: Question) {
    return this.http.post(`${this.baseUrl}/create`, question);
  }
  editQuestion(question: Question) {
    return this.http.put(`${this.baseUrl}/update/${question.id}`, question);
  }
  deleteQuestion(questionId: string) {
    return this.http.delete(`${this.baseUrl}/delete/${questionId}`);
  }
}