import { Component, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { Question } from '../questions/models/question.model';
import { QuestionService } from '../services/question.service';
import { ChartService } from './services/chart.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, OnDestroy {
  questions: Question[];
  stackedBarData: any[] = [];
  pieChartData: any[] = [];
  seriesStackedBarData: string[] = [];
  toggleValue = false;
  noResults: boolean = false;
  constructor(private questionService: QuestionService, private chartsService: ChartService) {

  }


  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(() => this.createChartsData());
  }

  createChartsData() {
    this.questionService.questions.subscribe(
      data => {
        let questions = data;
        this.chartsService.selectedDates.subscribe(
          dateRange => {
            this.chartsService.popularToggle.subscribe(
              popularToggle => {
                let filteredQuestions = this.chartsService.filterQuestionsByDate(questions, dateRange);
                let chartQuestions = this.chartsService.getChartQuestions(filteredQuestions);
                this.stackedBarData = this.chartsService.createStackedBarData(chartQuestions, popularToggle);
                this.seriesStackedBarData = this.chartsService.createStackedBarSeriesData(chartQuestions, popularToggle)
                this.pieChartData = this.chartsService.createPieChartData(chartQuestions);
              });
          });
      });
    this.chartsService.noResults.subscribe(
      noResults => this.noResults = noResults
    );

  }

  onToggleChange(switchValue: boolean) {
    this.chartsService.popularToggle.next(switchValue);
  }
  ngOnDestroy(): void {
    this.chartsService.selectedDates.next([]);
    this.chartsService.popularToggle.next(false);
  }
}
