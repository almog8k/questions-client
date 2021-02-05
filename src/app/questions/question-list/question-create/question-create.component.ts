import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionService } from 'src/app/services/question.service';
import { SideBarType } from '../../enums/sidebar.enum';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {


  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {

  }

  onAddQuestion(form: NgForm) {
    let question = form.value;
    let newQuestion = new Question(question.name, question.description);
    this.questionService.addQuestion(newQuestion).subscribe();
    form.reset();
  }
  onCancel() {
    this.questionService.selectedSideBar.next(SideBarType.None);
  }
}
