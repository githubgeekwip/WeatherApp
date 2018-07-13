import { Pipe, PipeTransform } from '@angular/core';

//Parsing API date to Javascript date object

@Pipe({
  name: 'myDatepipe'
})
export class DatePipe implements PipeTransform {

  transform(value: any): any {
    return new Date(value * 1000);
  }

}
