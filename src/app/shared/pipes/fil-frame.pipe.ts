import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filFrame',
  pure: false
})
export class FilFramePipe implements PipeTransform {

  transform(value, args: []): any {
    if (!value) { return [] }
    if (args.length == 0) { return value }
    if (args.length > 0) {
      return value.filter(
        item => {
          for (let i = 0; i < args.length; i++) {
            if (item.sizeFrame == args[i]) return item
          }
        }
      )
    }
  }

}
