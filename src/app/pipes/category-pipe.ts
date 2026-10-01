import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../types/category';

const CATEGORY_LABELS: Record<Category, string> = {
  hotel: 'Отель',
  restaurant: 'Ресторан',
  entertainment: 'Развлечения',
  nature: 'Природа',
  culture: 'Культура',
  architecture: 'Архитектура',
  spa: 'СПА и релакс',
};

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(category: Category): string {
    return CATEGORY_LABELS[category];
  }
}
