import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(sentence: string): string {
    if (sentence.length > 12) {
      sentence = sentence.slice(0, 12)
      return sentence + "...";
    }
    return sentence;
  }
}
