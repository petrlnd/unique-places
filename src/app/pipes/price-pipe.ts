import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(priceLevel: number): string {
    return '€'.repeat(priceLevel);
  }
}
