import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalAmount'
})
export class TotalAmountPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    return value;
  }

}
