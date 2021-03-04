import { Component, OnInit } from '@angular/core';
import { Question } from './models/question.model';
import { SideBarType } from './enums/sidebar.enum'
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})

export class QuestionsComponent implements OnInit {
  selectedQuestion: Question;
  sideBar: SideBarType;
  sidebarType = SideBarType;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select("questionsList").subscribe(
      stateData => {
        this.selectedQuestion = stateData.selectedQuestion,
          this.sideBar = stateData.selectedSideBar;
      }
    )
  }
}

