import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Question } from '../questions/models/question.model';
import { QuestionService } from '../services/question.service';
import { ChartQuestion } from './models/chart-question.model';
import { ChartService } from './services/chart.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  stackedBarData: any[] = [];
  seriesStackedBarData: string[] = [];
  pieChartData: ChartQuestion[] = []

  constructor(private questionService:QuestionService, private chartsService:ChartService) { 

  }
  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(
      res => {
        let questions = res.questions;
        let chartQuestions = this.chartsService.getChartQuestions(questions);       
        this.stackedBarData = this.chartsService.createStackedBarData(chartQuestions); 
        this.seriesStackedBarData = this.chartsService.createStackedBarSeriesData(chartQuestions)
        this.pieChartData =  this.chartsService.createPieChartData(chartQuestions);    
        console.log(this.pieChartData);
      });   
  }

}
