import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/app/questions/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { NgForm } from '@angular/forms';
import { SideBarType } from '../../enums/sidebar.enum';


@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  @Input() question: Question;
  @ViewChild('f') editForm: NgForm
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {

  }
  onEditQuestion(form: NgForm) {
    let updatedQuestion = form.value;
    this.question.name = updatedQuestion.name;
    this.question.description = updatedQuestion.description;
    this.questionService.editQuestion(this.question).subscribe();
  }
  onClose() {
    this.questionService.selectedSideBar.next(SideBarType.None);
  }
}

