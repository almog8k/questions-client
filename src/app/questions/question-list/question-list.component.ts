import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import {QuestionService} from 'src/app/services/question.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {SideBarType} from '../enums/sidebar.enum'

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],

})
export class QuestionListComponent implements OnInit {
 
  tableHeaders = ['Id', 'Name', 'Date', ''];
  selectOptions = ["Id", "Name", 'Date'];
  questions:Question[];
  searchText:string = '';
  popIsVisible = false;
  displayedPopQuestion:Question;

    constructor(private questionService:QuestionService, private router:Router) { }

  ngOnInit(): void {
    this.getQuestions();
    this.updateQuestionsOnChange();
  }
    getQuestions(){
      this.questionService.getQuestions().subscribe(
        res => this.questions = res.questions,
        err => {
          if(err instanceof HttpResponse){
            if(err.status === 403){
              this.router.navigate(['/']);
            }
          }
        }    
      )
    }
    updateQuestionsOnChange(){
      this.questionService.questionAdded.subscribe(
        () => this.getQuestions()
      );
      this.questionService.questionDeleted.subscribe(
        () => this.getQuestions()
      );
      this.questionService.questionedited.subscribe(
        () => this.getQuestions()
      );
    }

   onSelectedDetailsQuestion(questionEl:Question){
    this.getSelectedQuestion(questionEl);
    this.questionService.selectedBtn.next(SideBarType.Details);
    
  }
  onSelectedEditQuestion(questionEl:Question){
    this.getSelectedQuestion(questionEl);
    this.questionService.selectedBtn.next(SideBarType.Edit);
  }
  onSelectedCreateQuestion(){
    this.questionService.selectedBtn.next(SideBarType.Create);
  }
  getSelectedQuestion(question:Question){
    this.questionService.questionSelected.next(question);  
  }
  onDeletedQuestion(questionId:string){
    this.questionService.deleteQuestion(questionId).subscribe(()=>{
      this.getQuestions();
      this.questionService.questionDeleted.next();
    });
  }
  sortBy(name:String){
    switch (name) {
      case "Id":
        this.questions.sort((a,b)=> a.id.localeCompare(b.id))
        break; 
      case "Name":
        this.questions.sort((a,b)=> a.name.localeCompare(b.name))
        break;
        case "Date":
        this.questions.sort((a,b)=> a.creationDate.localeCompare(b.creationDate))
        break;  
      default:
        break;
    }
  }
  showPop(questionEl:Question): void {
    this.popIsVisible = true;
    this.displayedPopQuestion = questionEl;
  }

  handleOk(): void {
    this.popIsVisible = false;
    this.onDeletedQuestion(this.displayedPopQuestion.id);
  }

  handleCancel(): void {
    this.popIsVisible = false;
  }
}
