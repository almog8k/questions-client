import { Component, Input, OnInit } from '@angular/core';
import { SideBarType } from '../../enums/sidebar.enum';
import { Question } from '../../models/question.model';
import { Store } from '@ngrx/store';
import * as QuestionsListActions from '../store/questions-list.actions';
import * as fromApp from '../../../store/app.reducer'

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
  @Input() question: Question;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
  }
  onCancel() {
    this.store.dispatch(new QuestionsListActions.SetSideBar(SideBarType.None));
  }
}
