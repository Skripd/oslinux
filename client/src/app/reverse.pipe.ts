import { Pipe, PipeTransform } from '@angular/core';
import { Measurement } from './.models/measurement.model';
import * as _ from 'lodash';

@Pipe({
  name: 'reverse',
  pure: false,
})
export class ReversePipe implements PipeTransform {

  transform(value: Measurement[]): any {
    return _.reverse(value);
  }

}
