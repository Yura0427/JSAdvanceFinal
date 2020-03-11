import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value, args: string[]): any {
    console.log(value)
    const arr = [];
    if (!value) { return []; }
    if (args.length == 0) { return value }
    if (args.length > 0) {
      for (let i = 0; i < args.length; i++) {
        arr.push(value.filter(arr => { arr.brend == args[i] }))
      }
      // debugger
      // console.log(arr)
      value = arr
      console.log(value)
      return value
    }
  }

}
