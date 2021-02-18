import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../models/question.model';

@Pipe({
  name: 'questionsSort'
})
export class QuestionsSortPipe implements PipeTransform {

  transform(questions: Question[], sortValue: string): Question[] {
    const copyQuestions = [...questions]
    switch (sortValue) {
      case "Id":
        copyQuestions;
        break;
      case "Name":
        copyQuestions.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Date":
        copyQuestions.sort((a, b) => a.creationDate.localeCompare(b.creationDate));
        break;
    }
    return copyQuestions;
  }
}
