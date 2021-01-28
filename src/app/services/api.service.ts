import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = "http://localhost:3000/qa/";
  constructor(private http:HttpClient) { }

getQuestions(): Observable<any>{
  return this.http.get<Observable<any>>(this.baseUrl, {});
  
}
}
