import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ...args: []): any {
    console.log(value, args)
    return value.filter(arr=>{return arr.brend == args});
  }

}
