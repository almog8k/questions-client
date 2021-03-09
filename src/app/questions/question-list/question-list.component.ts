import { Component, OnInit, SimpleChange } from '@angular/core';
import { Question } from '../models/question.model';
import { SideBarType } from '../enums/sidebar.enum';
import { Store } from '@ngrx/store';
import * as QuestionsListActions from './store/questions-list.actions';
import { AppState } from '../../store/app.reducer';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { interFont } from 'src/assets/fonts/inter-font-regular';






@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],

})
export class QuestionListComponent implements OnInit {

  tableHeaders: string[] = ['Id', 'Name', 'Date', ''];
  selectOptions: string[] = ['Id', 'Name', 'Date'];
  questions: Question[];
  searchText: string = '';
  option: string;
  popIsVisible: boolean = false;
  displayedPopQuestion: Question;
  loading: boolean;
  error: Error;


  constructor(private store: Store<AppState>, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.store.select('questionsList').subscribe(
      stateData => {
        this.questions = stateData.questions;
        this.loading = stateData.loading;
        this.error = stateData.error;
      }
    );

  }

  creteTablePdfData() {
    let tableBody = [];
    this.questions.forEach(question => {
      let creationDate = this.datePipe.transform(question.creationDate, 'medium');
      let row = [question.id, question.name, question.description, creationDate]
      tableBody.push(row);
    })
    return tableBody;
  }
  onSavePdf() {
    const pdf = new jsPDF();

    pdf.addFileToVFS("Inter-Regular.ttf", interFont);
    pdf.addFont("Inter-Regular.ttf", 'Inter-Regular', 'normal')
    pdf.setFont("Inter-Regular");
    console.log(pdf.getFontList());
    let tableHeader = [['Id', 'Name', 'Description', 'Date']];
    let tableBody = this.creteTablePdfData();

    autoTable(pdf, {
      margin: { top: 30 },
      rowPageBreak: 'avoid',
      head: tableHeader,
      headStyles: { fontStyle: "bold" },
      body: tableBody,
      columnStyles: { 3: { cellWidth: 50 }, 0: { fontStyle: "bold", cellWidth: 15, textColor: "black" } }
    },
    )

    let numPages = pdf.getNumberOfPages();

    for (let i = 1; i <= numPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(15);
      pdf.addImage("assets/images/QuestionMarks.jpg", "jpg", 15, 5, 20, 20)
      pdf.text('Questions - Page ' + i + ' of ' + numPages, 45, 15);
    }

    pdf.save("Questions.pdf")
  }

  onSelectedDetails(questionEl: Question) {
    this.setSelectedQuestion(questionEl);
    this.store.dispatch(new QuestionsListActions.SetSideBar(SideBarType.Details))
  }
  onSelectedEdit(questionEl: Question) {
    this.setSelectedQuestion(questionEl);
    this.store.dispatch(new QuestionsListActions.SetSideBar(SideBarType.Edit))
  }
  onSelectedCreate() {
    this.store.dispatch(new QuestionsListActions.SetSideBar(SideBarType.Create))
  }

  setSelectedQuestion(question: Question) {
    this.store.dispatch(new QuestionsListActions.SetSelectedQuestion(question));
  }

  sortBy(option: string) {
    this.option = option;
  }
  showPop(questionEl: Question): void {
    this.popIsVisible = true;
    this.displayedPopQuestion = questionEl;
  }

  handleOk(): void {
    this.popIsVisible = false;
    this.onDeletedQuestion(this.displayedPopQuestion.id);
  }
  onDeletedQuestion(questionId: string) {
    this.store.dispatch(new QuestionsListActions.DeleteQuestion(questionId));
  }
  handleCancel(): void {
    this.popIsVisible = false;
  }
}
