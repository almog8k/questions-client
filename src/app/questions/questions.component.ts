import { Component, OnInit } from '@angular/core';
import { Question } from './models/question.model';
import {QuestionService} from 'src/app/services/question.service';
import {SideBarType} from './enums/sidebar.enum'


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  
  
})
export class QuestionsComponent implements OnInit {
  selectedQuestion: Question;
  toggleBtn:SideBarType;
  sidebarType = SideBarType;
  
  constructor(private questionService:QuestionService) { }

  ngOnInit(): void {   
      this.questionService.selectedQuestion.subscribe(
        (question:Question)=>{
          this.selectedQuestion = question
        }
      );
      this.questionService.selectedSideBar.subscribe(
        (toggle:SideBarType)=>{
          this.toggleBtn = toggle 
        }
      );
  }
}

