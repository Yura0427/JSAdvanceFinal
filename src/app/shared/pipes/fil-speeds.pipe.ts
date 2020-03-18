import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filSpeeds',
  pure:false
})
export class FilSpeedsPipe implements PipeTransform {

  transform(value, args: []): any {
    if (!value) { return [] }
    if (args.length == 0) { return value }
    if (args.length > 0) {
      return value.filter(
        item => {
          for (let i = 0; i < args.length; i++) {
            if (item.speedsNumber == args[i]) return item
          }
        }
      )
    }
  }

}
