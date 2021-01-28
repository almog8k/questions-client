import { Component, OnInit,ElementRef,  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {


  constructor(private questionService:QuestionService) { }

  ngOnInit(): void {

  }
  
  onAddQuestion(form: NgForm){
   let question = form.value;
   const newQuestion = new Question(question.name, question.description);
   console.log(newQuestion);
   this.questionService.addQuestion(newQuestion).subscribe(
     ()=>{
      this.questionService.questionAdded.next();   
     } 
   );
     form.reset();
  }
  onCancel(){
    this.questionService.selectedBtn.next();
  }
}
