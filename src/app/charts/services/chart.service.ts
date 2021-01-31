import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from 'src/app/questions/models/question.model';
import { ChartQuestion } from '../models/chart-question.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
selectedDates = new BehaviorSubject<Date[]>([]);
  constructor(private datePipe:DatePipe) { }



public filterQuestionsByDate(questions:Question[], dateRange:Date[]){
  let filteredQuestions = [];
  let dateFrom = dateRange[0];
  let dateTo = dateRange[1];
  if(dateRange.length === 0){
    filteredQuestions = questions;
  }
  else{
    questions.forEach(question => {
      let questionDate = new Date(question.creationDate)
      if(questionDate.getTime()<= dateTo.getTime() && questionDate.getTime()>= dateFrom.getTime())
      {
        filteredQuestions.push(question);
      }
    });
  }  
  return filteredQuestions;
}


  public getChartQuestions(questions:Question[]){
    let chartQuestions = []
     questions.forEach(question => {  
     let chartQuestion = this.questionToChartQuestion(question);
     let found = false;
      for (let index = 0; index < chartQuestions.length; index++) {
        const chartQ = chartQuestions[index];
        if(chartQuestion.day===chartQ.day && chartQuestion.hour===chartQ.hour){
         chartQ.count++;
         found = true; 
         break;      
        }      
      } 
      if(!found){
       chartQuestions.push(chartQuestion);
      }         
     });
     return chartQuestions
   } 
   private questionToChartQuestion(question:Question){
     let date = new Date(question.creationDate);
     let day = this.datePipe.transform(date, 'EEEE');
     let hour = this.datePipe.transform(date, 'HH:00')
     let chartQuestion = new ChartQuestion(hour, day); 
     return chartQuestion;  
   }
 
  public createStackedBarData(chartQuestions) {
     let source = chartQuestions;
     let category = {};
     let data = [];
     for(let i = 0; i < source.length; i++) {
       let row = source[i];
       if (category[row.day] == undefined) {
         category[row.day] = {
           category: row.day
         };
         data.push(category[row.day]);
       }
       category[row.day][source[i].hour] = row['count'];
     }
     return data;
   }
   public createPieChartData(chartQuestions) {
     let source = chartQuestions;
     let category = {};
     let data = [];
     for(let i = 0; i < source.length; i++) {    
       let row = source[i];
       if (category[row.day] == undefined) {
         category[row.day] = {
           category: row.day,
           value: 0       
         };
         data.push(category[row.day]);      
       }
       category[row.day]['value'] = category[row.day]['value'] + source[i].count;
     }
     return data;
   }
  public createStackedBarSeriesData(chartQuestions:ChartQuestion[]){
    let seriesData =[]
    chartQuestions.forEach(chartQuestion => {
     if(!(seriesData.includes(chartQuestion.hour))){
       seriesData.push(chartQuestion.hour);
     }
    });  
    seriesData.sort();
    return seriesData;
   }
}
