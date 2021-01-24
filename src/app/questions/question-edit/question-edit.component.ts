import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Question } from '../models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
@Input() question:Question;
@ViewChild('f') editForm:NgForm
  constructor(private questionService:QuestionService ) { }

  ngOnInit(): void {

  }
  onEditQuestion(form: NgForm){
    let updatedQuestion = form.value;    
    this.question.name =  updatedQuestion.name;
    this.question.description = updatedQuestion.description;
    console.log(this.question);
    this.questionService.editQuestion(this.question).subscribe(
      ()=>{
       this.questionService.questionedited.next();
      } 
    );
   }  
onClose(){
  this.questionService.selectedBtn.next();
}
}

