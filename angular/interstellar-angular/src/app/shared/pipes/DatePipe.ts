import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormatterPipe',
})

// https://angular.io/api/common/DatePipe
// http://www.angulartutorial.net/2017/04/date-filtering-and-formatting-using.html
export class DateFormatterPipe implements PipeTransform {
    transform(value: string) {
        const datePipe = new DatePipe('en-US');
        const today = new Date().getDay();
        const messageDay = new Date(value).getDay();
        let dateStringFormatter = 'h:mm a';
        if (today !== messageDay) {
            dateStringFormatter += ' (M/d)';
        }
        value = datePipe.transform(value, dateStringFormatter);
        return value;
    }
}
