import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer'
import * as QuestionsListActions from './questions/question-list/store/questions-list.actions'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new QuestionsListActions.LoadQuestions());
  }
}

