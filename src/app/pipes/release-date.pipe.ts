import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'releaseDate',
  standalone: true,
})
export class ReleaseDatePipe implements PipeTransform {
  transform(value: string, type: string): string {
    let splitDate: string[] = value.split('-');

    switch (type) {
      case 'yyyy':
        return splitDate[0];
      case 'mm':
        return splitDate[1];
      case 'dd':
        return splitDate[2];
      default:
        return value;
    }
  }
}
