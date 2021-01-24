import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from 'src/app/questions/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import {GraphQuestion} from '../models/graphQuestion.model'

@Injectable({
  providedIn: 'root'
})
export class GraphsService implements OnInit {

  questions:Question[];

  graphQuestionsT = new Subject<any>();

  graphQuestions: { [day: string]: GraphQuestion[] } = {
  'Sunday': [],
  'Monday': [],
  'Tuesday': [],
  'Wednesday': [],
  'Thursday': [],
  'Friday ': [],
  'Saturday': []
 };
  constructor(private questionService:QuestionService, private datePipe:DatePipe) { 
    
  }
  ngOnInit(){
    this.getQuestions();
  }

 private convertQuestionToGraphQuestion(question:Question){
    let date = new Date(question.creationDate);
    let day = this.datePipe.transform(date, 'EEEE');
    let hour = this.datePipe.transform(date, 'h:00 a')
    let graphQuestion = new GraphQuestion(question.name, day, hour ); 
    return graphQuestion;  
  }

  getQuestions(){
    this.questionService.getQuestions().subscribe(
      res => {
        this.questions = res.questions;
        this.getGraphQuestions(res.questions);
      });
  }

  getGraphQuestions(questions){
    questions.forEach(question => {
    let graphQuestion = this.convertQuestionToGraphQuestion(question)
    console.log(graphQuestion);
    this.graphQuestions[graphQuestion.day].push(graphQuestion);
    });
    this.graphQuestionsT.next(this.graphQuestions);
    console.log(this.graphQuestions);
  } 
}
