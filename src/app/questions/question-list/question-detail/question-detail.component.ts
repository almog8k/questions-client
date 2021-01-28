import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
@Input() question:Question;
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
  }
  onCancel(){
    this.questionService.selectedBtn.next();
  }
}
