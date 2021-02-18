import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionApiService } from 'src/app/questions/services/question-api.service';
import { SideBarType } from '../../enums/sidebar.enum';
import { Question } from '../../models/question.model';
import { Store } from '@ngrx/store';
import * as QuestionsListActions from '../store/questions-list.actions';
import * as fromApp from '../../../store/app.reducer'

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {


  constructor(private questionService: QuestionApiService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

  }

  onAddQuestion(form: NgForm) {
    let question = form.value;
    let newQuestion = new Question(question.name, question.description);
    this.questionService.addQuestion(newQuestion).subscribe();
    form.reset();
  }
  onCancel() {
    this.store.dispatch(new QuestionsListActions.SetSideBar(SideBarType.None));
  }
}
