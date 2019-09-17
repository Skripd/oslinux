import { Pipe, PipeTransform } from '@angular/core';
import { Measurement } from './.models/measurement.model';

@Pipe({
  name: 'reverse',
  pure: false,
})
export class ReversePipe implements PipeTransform {

  transform(value: Measurement[]): any {
    return value.reverse();
  }

}
