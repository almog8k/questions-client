
import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { ChartService } from './services/chart.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  stackedBarData: any[] = [];
  pieChartData: any[] = [];
  seriesStackedBarData: string[] = [];
  currentDateRange: Date[];

  constructor(private questionService:QuestionService, private chartsService:ChartService) { 

  }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(
      res => {
        let questions = res.questions;
        this.chartsService.selectedDates.subscribe(
          dates => {
            this.currentDateRange = dates
          console.log(this.currentDateRange)
          let filteredQuestions = this.chartsService.filterQuestionsByDate(questions, this.currentDateRange)
          let chartQuestions = this.chartsService.getChartQuestions(filteredQuestions);
          console.log(chartQuestions);       
          this.stackedBarData = this.chartsService.createStackedBarData(chartQuestions); 
          this.seriesStackedBarData = this.chartsService.createStackedBarSeriesData(chartQuestions)
          this.pieChartData =  this.chartsService.createPieChartData(chartQuestions);
          });           
      });   
  }
 
}
