import { Component, OnInit, SimpleChange } from '@angular/core';
import { Question } from '../models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { SideBarType } from '../enums/sidebar.enum'
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],

})
export class QuestionListComponent implements OnInit {

  tableHeaders = ['Id', 'Name', 'Date', ''];
  selectOptions = ["Name", 'Date'];
  questions: Question[];
  questionss = new BehaviorSubject<Question[]>([]);
  selecteOption: Question;
  searchText: string = '';
  popIsVisible = false;
  displayedPopQuestion: Question;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe();
    this.questionService.questions.subscribe(
      data => {
        this.questions = data;
      })
  }

  onSelectedDetails(questionEl: Question) {
    this.getSelectedQuestion(questionEl);
    this.questionService.selectedSideBar.next(SideBarType.Details);

  }
  onSelectedEdit(questionEl: Question) {
    this.getSelectedQuestion(questionEl);
    this.questionService.selectedSideBar.next(SideBarType.Edit);
  }
  onSelectedCreate() {
    this.questionService.selectedSideBar.next(SideBarType.Create);
  }

  getSelectedQuestion(question: Question) {
    this.questionService.selectedQuestion.next(question);
  }
  onDeletedQuestion(questionId: string) {
    this.questionService.deleteQuestion(questionId).subscribe();
  }

  sortBy(option: String) {
    console.log(option.valueOf());
    switch (option) {
      case "Name":
        this.questions.sort((a, b) => a.name.localeCompare(b.name))
        break;
      case "Date":
        this.questions.sort((a, b) => a.creationDate.localeCompare(b.creationDate))
        break;
      default:
        break;
    }
  }
  showPop(questionEl: Question): void {
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
