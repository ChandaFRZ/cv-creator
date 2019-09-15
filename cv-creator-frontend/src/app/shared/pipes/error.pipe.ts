import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'error'
})
export class ErrorPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    const valueString: string = value;
    const minLength = args[0];

    if (valueString.includes('Please lengthen this text to')) {
      return 'Min value of ' + minLength + ' not reached!';
    } else if (valueString.includes('Please fill in this field.')) {
      return 'Field required!';
    }

    return value;
  }

}
