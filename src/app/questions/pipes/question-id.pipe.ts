import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'questionIdPipe'
})
export class QuestionIdPipe implements PipeTransform {

  transform(id:string){
    return `${id.substring(0, 1)}<b>${id.substring(1).fontsize(4)}</b>`;
  }

}
