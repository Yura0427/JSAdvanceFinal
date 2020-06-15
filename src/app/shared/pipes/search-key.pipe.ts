import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchKey',
  pure: false
})
export class SearchKeyPipe implements PipeTransform {

  transform(value, args): any {
    if (!args) { return value }
    if (args) {
      return value.filter(
        item => {
          return item.key.toLowerCase().indexOf(args.toLowerCase()) !== -1
        }
      )
    }
  }

}
