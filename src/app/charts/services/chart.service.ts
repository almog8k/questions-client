
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
  toggleSeriesData: string[] = [];
  constructor(private datePipe: DatePipe) { }

  //filter questions data by given date
  public filterQuestionsByDate(questions: Question[], dateRange: Date[]): Question[] {
    let filteredQuestions = [];
    let dateFrom = dateRange[0];
    let dateTo = dateRange[1];
    if (dateRange.length === 0) {
      this.noResults.next(false);
      filteredQuestions = questions;
    }
    else {
      questions.forEach(question => {
        let questionDate = new Date(question.creationDate)
        if (questionDate.getTime() <= dateTo.getTime() && questionDate.getTime() >= dateFrom.getTime()) {
          filteredQuestions.push(question);
        }
      });
      if (filteredQuestions.length === 0) {
        this.noResults.next(true);
      }
    }
    return filteredQuestions;
  }

  // create global charts data 
  public getChartQuestions(questions: Question[]): ChartQuestion[] {
    let chartQuestions = []
    questions.forEach(question => {
      let chartQuestion = this.questionToChartQuestion(question);
      let found = false;
      for (let index = 0; index < chartQuestions.length; index++) {
        const chartQ = chartQuestions[index];
        if (chartQuestion.day === chartQ.day && chartQuestion.hour === chartQ.hour) {
          chartQ.count++;
          found = true;
          break;
        }
      }
      if (!found) {
        chartQuestions.push(chartQuestion);
      }
    });
    return chartQuestions
  }

  private questionToChartQuestion(question: Question): ChartQuestion {
    let date = new Date(question.creationDate);
    let day = this.datePipe.transform(date, 'EEEE');
    let hour = this.datePipe.transform(date, 'HH:00')
    let chartQuestion = new ChartQuestion(hour, day);
    return chartQuestion;
  }

  //create stackedBar data by the stackedBar data patern
  public createStackedBarData(chartQuestions: ChartQuestion[], isToggled: boolean) {
    let source = chartQuestions;
    let category = {};
    let data = [];
    for (let i = 0; i < source.length; i++) {
      let row = source[i];
      if (category[row.day] == undefined) {
        category[row.day] = {
          category: row.day
        }
        data.push(category[row.day]);
      }
      category[row.day][source[i].hour] = row['count'];
    }
    if (!isToggled) {
      return data;
    } else {
      let topFiveHours = this.getWeekPopularHours(source);
      return this.getPopularHoursData(data, topFiveHours);
    }
  }
  //creates the series stackedBarData
  public createStackedBarSeriesData(chartQuestions: ChartQuestion[], isToggled: boolean): string[] {
    let seriesData = []
    if (!isToggled) {
      chartQuestions.forEach(chartQuestion => {
        if (!(seriesData.includes(chartQuestion.hour))) {
          seriesData.push(chartQuestion.hour);
        }
      });
    } else {
      seriesData = this.toggleSeriesData;
      seriesData.push("others");
      this.toggleSeriesData = [];
    }
    seriesData.sort();
    return seriesData;
  }

  //return top 5 hours of the weeek 
  private getWeekPopularHours(chartQuestions: ChartQuestion[]): string[] {
    let source = chartQuestions;
    let category = {};
    let data = [];
    for (let i = 0; i < source.length; i++) {
      let row = source[i];
      if (category[row.hour] == undefined) {
        category[row.hour] = {
          category: row.hour,
          hourCount: 0,
          questionCount: 0
        }
        data.push(category[row.hour]);
      }
      category[row.hour]['hourCount'] = category[row.hour]['hourCount'] + 1;
      category[row.hour]['questionCount'] = category[row.hour]['questionCount'] + source[i].count;
    }
    data.sort((a, b) => (a.hourCount > b.hourCount) ? -1 : (a.hourCount === b.hourCount) ?
      ((a.questionCount > b.questionCount) ? -1 : 1) : 1);
    data = data.slice(0, 5);
    let popularHours = data.map(x => {
      return x.category;
    })

    return popularHours;
  }
  //creates top 5 hours stackedBar data patern
  private getPopularHoursData(stackedBarData, topFiveHours: string[]) {
    let source = stackedBarData;
    let popularHours = topFiveHours;
    let data = [];
    for (let i = 0; i < source.length; i++) {
      let row = source[i];
      let editedRow = this.editRowValues(row, popularHours)
      data[i] = editedRow;
    }
    return data;
  }

  //get category row and edit the row by the popular hours to fit the stackedBar Patern
  private editRowValues(row, topFiveHours: string[]) {
    let source = row;
    let topFive = topFiveHours;
    this.toggleSeriesData = topFive;
    let category = source["category"];
    delete source["category"];
    let hours = [];
    for (let hour in source) {
      hours.push([hour, source[hour]]);
    }
    let othersSum = 0;
    let newRow = {};
    newRow["category"] = category;
    for (let i = 0; i < hours.length; i++) {
      const hour = hours[i];
      if (topFive.includes(hour[0])) {
        newRow[hour[0]] = hour[1];
      }
      else {
        othersSum = othersSum + hour[1];
      }
    }
    newRow["others"] = othersSum;

    return newRow;
  }

  //creates the pieChart data to fit the pieChart patern
  public createPieChartData(chartQuestions: ChartQuestion[]) {
    let source = chartQuestions;
    let category = {};
    let data = [];
    for (let i = 0; i < source.length; i++) {
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
}
