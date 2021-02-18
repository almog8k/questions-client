import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionApiService } from './questions/services/question-api.service';
import * as fromApp from './store/app.reducer'
import * as QuestionsListActions from './questions/question-list/store/questions-list.actions'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private store: Store<fromApp.AppState>, private questionApiService: QuestionApiService) { }

  ngOnInit(): void {
    this.questionApiService.getQuestions().subscribe(
      data => this.store.dispatch(new QuestionsListActions.SetQuestions(data.questions))
    );
  }

}

