import { Component, OnInit, SimpleChange } from '@angular/core';
import { Question } from '../models/question.model';
import { QuestionApiService } from 'src/app/questions/services/question-api.service';
import { SideBarType } from '../enums/sidebar.enum';
import { Store } from '@ngrx/store';
import * as QuestionsListActions from './store/questions-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],

})
export class QuestionListComponent implements OnInit {

  tableHeaders = ['Id', 'Name', 'Date', ''];
  selectOptions = ['Id', 'Name', 'Date'];
  questions: Question[];
  searchText: string = '';
  option: string;
  popIsVisible = false;
  displayedPopQuestion: Question;

  constructor(private questionService: QuestionApiService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('questionsList').subscribe(
      stateData => this.questions = stateData.questions
    );
  }

  onSelectedDetails(questionEl: Question) {
    this.setSelectedQuestion(questionEl);
    this.store.dispatch(new QuestionsListActions.SetSideBar(SideBarType.Details))
  }
  onSelectedEdit(questionEl: Question) {
    this.setSelectedQuestion(questionEl);
    this.store.dispatch(new QuestionsListActions.SetSideBar(SideBarType.Edit))
  }
  onSelectedCreate() {
    this.store.dispatch(new QuestionsListActions.SetSideBar(SideBarType.Create))
  }

  setSelectedQuestion(question: Question) {
    this.store.dispatch(new QuestionsListActions.SetSelectedQuestion(question));
  }

  sortBy(option: string) {
    this.option = option;
  }
  showPop(questionEl: Question): void {
    this.popIsVisible = true;
    this.displayedPopQuestion = questionEl;
  }

  handleOk(): void {
    this.popIsVisible = false;
    this.onDeletedQuestion(this.displayedPopQuestion.id);
  }
  onDeletedQuestion(questionId: string) {
    this.questionService.deleteQuestion(questionId).subscribe();
  }
  handleCancel(): void {
    this.popIsVisible = false;
  }
}
