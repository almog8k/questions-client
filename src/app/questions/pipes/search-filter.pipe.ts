import { Pipe, PipeTransform } from '@angular/core';
import {Question} from 'src/app/questions/models/question.model'

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(questions: Question[], searchText: string): Question[] {
    if (!questions) {
      return [];
    }
    if (!searchText) {
      return questions;
    }
    searchText = searchText.toLocaleLowerCase();

    return questions.filter(q=> q.name.toLocaleLowerCase().includes(searchText))
  }
}