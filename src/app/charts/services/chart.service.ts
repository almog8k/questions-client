
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
popularToggle = new BehaviorSubject<boolean>(false);
noResults = new BehaviorSubject(false);
toggleSeriesData:string[] = [];
  constructor(private datePipe:DatePipe) { }
  

public filterQuestionsByDate(questions:Question[], dateRange:Date[]){
  let filteredQuestions = [];
  let dateFrom = dateRange[0];
  let dateTo = dateRange[1];
  if(dateRange.length === 0){
    this.noResults.next(false);
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
    if(filteredQuestions.length === 0){
      this.noResults.next(true);
    }
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
     console.log(chartQuestions);
     return chartQuestions
   } 
   private questionToChartQuestion(question:Question){
     let date = new Date(question.creationDate);
     let day = this.datePipe.transform(date, 'EEEE');
     let hour = this.datePipe.transform(date, 'HH:00')
     let chartQuestion = new ChartQuestion(hour, day); 
     return chartQuestion;  
   }

   //return top 5 hours of the weeek by hour count and question count
   private getTopFiveHoursOfTheWeek(chartQuestions:ChartQuestion[]){
      let source = chartQuestions;
      let category = {};
      let data = [];
      for (let i = 0; i < source.length; i++) {
        let row = source[i];
        if(category[row.hour] == undefined){
          category[row.hour] = {
            category: row.hour,
            hourCount: 0,
            questionCount: 0        
          }          
          data.push(category[row.hour]);
          
        }
        category[row.hour]['hourCount'] = category[row.hour]['hourCount']+1;
        category[row.hour]['questionCount'] = category[row.hour]['questionCount']+ source[i].count;        
      }
      data.sort((a,b)=> (a.hourCount > b.hourCount)?-1: (a.hourCount === b.hourCount)?
      ((a.questionCount > b.questionCount)?-1: 1): 1);
      data = data.slice(0,5);     
      console.log(data);
      return data;
   }
 
  public createStackedBarData(chartQuestions, isToggled) {
     let source = chartQuestions;
     let category = {};
     let data = [];
     for(let i = 0; i < source.length; i++) {
       let row = source[i];       
       if (category[row.day] == undefined) {
         category[row.day] = {
           category: row.day         
         }
         data.push(category[row.day]);
       }
        category[row.day][source[i].hour] = row['count'];           
      }  
      if(!isToggled){
        console.log(data)
        return data;
      }
      
     else{
      return this.getTopFiveHoursOfTheDay(data);
     }
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
     console.log(data);
     return data;
   }
  public createStackedBarSeriesData(chartQuestions:ChartQuestion[], isToggled){
    let seriesData =[]
    chartQuestions.forEach(chartQuestion => {
     if(!(seriesData.includes(chartQuestion.hour))){
       seriesData.push(chartQuestion.hour);
     }
    });  
    if(isToggled){
      seriesData = this.toggleSeriesData;
      seriesData.push("others");
      this.toggleSeriesData = [];
    }   
    seriesData.sort();
    return seriesData;
   }

   private getTopFiveHoursOfTheDay(stackedBarData){
     let source = stackedBarData;
     let data = [];
     for(let i = 0; i < source.length; i++) {    
      let row = source[i]; 
      let sortedRow = this.sortRowValues(row, 5) 
      data[i] = sortedRow;
     }
     return data;
   }
   //function gets category row and number of top values and returns the row ordered by count per hour and others;
    private sortRowValues(row, topValuesNumber:number){

      let category = row["category"]
      delete row["category"]
      let sortable = [];
      for(let hour in row){
          sortable.push([hour, row[hour]])
      }
      sortable.sort((a,b)=>{
        return b[1] - a[1]; 
      })
      let topFive = sortable.slice(0,topValuesNumber)
      let others = sortable.slice(topValuesNumber);
      let othersSum = 0;
      for (let i = 0; i < topFive.length; i++) {
        const hour = topFive[i];
        if(!(this.toggleSeriesData.includes(hour[0])))
        this.toggleSeriesData.push(hour[0])
      }
      for (let i = 0; i < others.length; i++) {
        const element = others[i];
        othersSum = othersSum + element[1];
      }
      console.log(others);
      topFive.push(["others", othersSum])
      let sortedObj ={};
      sortedObj['category'] = category;
      topFive.forEach(item => {
        sortedObj[item[0]]=item[1];
      });
      return sortedObj;    
   }
}
