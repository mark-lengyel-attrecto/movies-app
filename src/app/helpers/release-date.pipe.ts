import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'releaseDate'
})
export class ReleaseDatePipe implements PipeTransform {

  transform(value: string, type: string): string {
    let splitDate: string[] = value.split("-");

    switch(type) {
      case 'yyyy':
        return splitDate[0];
        break;
      case 'mm':
        return splitDate[1];
        break;
      case 'dd':
        return splitDate[2];
        break;
      default:
        return value;
    }
  }

}
