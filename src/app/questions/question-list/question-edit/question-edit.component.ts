import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/app/questions/models/question.model';
import { QuestionApiService } from 'src/app/questions/services/question-api.service';
import { NgForm } from '@angular/forms';
import { SideBarType } from '../../enums/sidebar.enum';
import { Store } from '@ngrx/store';
import * as fromQuestionsList from '../store/questions-list.reducer';
import * as QuestionsListActions from '../store/questions-list.actions';
import * as fromApp from '../../../store/app.reducer'


@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  @Input() question: Question;
  @ViewChild('f') editForm: NgForm
  constructor(private questionService: QuestionApiService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

  }
  onEditQuestion(form: NgForm) {
    console.log(this.question);
    let creationDate = this.question.creationDate
    let questionId = this.question.id;
    let updatedQuestion = { id: questionId, name: form.value.name, description: form.value.description, creationDate: creationDate }
    this.questionService.editQuestion(updatedQuestion).subscribe();
  }
  onClose() {
    this.store.dispatch(new QuestionsListActions.SetSideBar(SideBarType.None));
  }
}

