import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../models/question.model';

@Pipe({
  name: 'questionIdPipe'
})
export class QuestionIdPipe implements PipeTransform {

  transform(id:string){
    return `<b>${id.substring(0, 1)}</b>${id.substring(1)}`;
  }

}
