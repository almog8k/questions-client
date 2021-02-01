import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import {QuestionService} from 'src/app/services/question.service';
import { Router } from '@angular/router';
import {SideBarType} from '../enums/sidebar.enum'

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],

})
export class QuestionListComponent implements OnInit {
 
  tableHeaders = ['Id', 'Name', 'Date', ''];
  selectOptions = ["Name", 'Date'];
  questions:Question[];
  selecteOption;
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
        res => {
          this.questions = res.questions;
        }
      )
    }
    
    updateQuestionsOnChange(){     
      this.questionService.questionsChanged.subscribe(
        ()=> this.getQuestions()
      );  
    }

  onSelectedDetails(questionEl:Question){
    this.getSelectedQuestion(questionEl);
    this.questionService.selectedSideBar.next(SideBarType.Details);
    
  }
  onSelectedEdit(questionEl:Question){
    this.getSelectedQuestion(questionEl);
    this.questionService.selectedSideBar.next(SideBarType.Edit);
  }
  onSelectedCreate(){
    this.questionService.selectedSideBar.next(SideBarType.Create);
  }

  getSelectedQuestion(question:Question){
    this.questionService.selectedQuestion.next(question);  
  }
  onDeletedQuestion(questionId:string){
    this.questionService.deleteQuestion(questionId).subscribe(()=>{
      this.getQuestions();
    });
  }

  onOptionChange(option){
    console.log(option);
  }
  sortBy(option:String){
    console.log(option);
    switch (option) {
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
