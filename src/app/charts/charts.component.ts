import { Component, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartService } from './services/chart.service';
import * as fromApp from '../store/app.reducer';
import * as ChartActions from './store/chart.actions';
import { Question } from '../questions/models/question.model';
import { ITreeNode } from './tree/treeModel/inode';
import { TreeFilterPipe } from './tree/pipes/tree-filter.pipe';



@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, OnDestroy {
  stackedBarData: any[] = [];
  pieChartData: any[] = [];
  seriesStackedBarData: string[] = [];
  toggleValue: boolean = false;
  noResults: boolean = false;
  treeData: ITreeNode[];
  searchText: string = "";
  questions: Question[];
  constructor(private chartsService: ChartService, private store: Store<fromApp.AppState>) { }


  ngOnInit(): void {

    this.store.select("questionsList").subscribe(
      stateData => {
        let questions = stateData.questions;
        this.questions = stateData.questions;
        this.store.select("charts").subscribe(
          stateData => {
            let filteredQuestions = this.chartsService.filterQuestionsByDate(questions, stateData.selectedDates);
            this.treeData = this.chartsService.createTreeData(filteredQuestions);
            this.noResults = this.isResults(filteredQuestions);
            let chartQuestions = this.chartsService.getChartQuestions(filteredQuestions);
            this.stackedBarData = this.chartsService.createStackedBarData(chartQuestions, stateData.isPopularToggle);
            this.seriesStackedBarData = this.chartsService.createStackedBarSeriesData(chartQuestions, stateData.isPopularToggle)
            this.pieChartData = this.chartsService.createPieChartData(chartQuestions);
          });
      });
  }

  isResults(filteredQuestions: Question[]) {
    let flag = false;
    if (filteredQuestions.length === 0) {
      flag = true
    }
    return flag;
  }
  onToggleChange(toggleValue: boolean) {
    this.store.dispatch(new ChartActions.PopularToggled(toggleValue));
  }
  ngOnDestroy(): void {
    this.store.dispatch(new ChartActions.SetDates([]));
    this.store.dispatch(new ChartActions.PopularToggled(false));
  }


}
