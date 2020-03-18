import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filPrice'
})
export class FilPricePipe implements PipeTransform {

  transform(value, min: number, max: number): any {
    if (!value) { return [] }
    if (!min && !max) { return value; }
    if (!max) { return value.filter(item => item.price >= min) }
    if (!min) { return value.filter(item => item.price <= max) }
    return value.filter(item => (item.price >= min && item.price <= max))
  }

}
