import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filType',
  pure: false
})
export class FilTypePipe implements PipeTransform {

  transform(value, args: []): any {
    if (!value) { return [] }
    if (args.length == 0) { return value }
    if (args.length > 0) {
      return value.filter(
        item => {
          for (let i = 0; i < args.length; i++) {
            if (item.type == args[i]) return item
          }
        }
      )
    }
  }
}
