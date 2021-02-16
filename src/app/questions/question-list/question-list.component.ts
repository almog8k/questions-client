import { Component, OnInit, SimpleChange } from '@angular/core';
import { Question } from '../models/question.model';
import { QuestionService } from 'src/app/services/question.service';
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
  selectOptions = ["Name", 'Date'];
  questions: Question[];
  searchText: string = '';
  popIsVisible = false;
  displayedPopQuestion: Question;

  constructor(private questionService: QuestionService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe();
    this.store.select('questionsList').subscribe(
      stateData => this.questions = stateData["questions"]
    )
    // this.store.select('questionsList').subscribe();
    // this.questionService.questions.subscribe(
    //   data => {
    //     this.questions = data;
    //   })
  }

  onSelectedDetails(questionEl: Question) {
    this.setSelectedQuestion(questionEl);
    this.store.dispatch(new QuestionsListActions.SetSideBar(SideBarType.Details))
    // this.questionService.selectedSideBar.next(SideBarType.Details);

  }
  onSelectedEdit(questionEl: Question) {
    this.setSelectedQuestion(questionEl);
    this.store.dispatch(new QuestionsListActions.SetSideBar(SideBarType.Edit))
    // this.questionService.selectedSideBar.next(SideBarType.Edit);
  }
  onSelectedCreate() {
    this.store.dispatch(new QuestionsListActions.SetSideBar(SideBarType.Create))
    // this.questionService.selectedSideBar.next(SideBarType.Create);
  }

  setSelectedQuestion(question: Question) {
    // this.questionService.selectedQuestion.next(question);
    this.store.dispatch(new QuestionsListActions.SetSelectedQuestion(question));
  }

  sortBy(option: String) {
    console.log(option.valueOf());
    switch (option) {
      case "Name":
        this.questions.sort((a, b) => a.name.localeCompare(b.name))
        break;
      case "Date":
        this.questions.sort((a, b) => a.creationDate.localeCompare(b.creationDate))
        break;
      default:
        break;
    }
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
