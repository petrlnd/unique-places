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

const CATEGORY_PLURAL_LABELS: Record<Category, string> = {
  hotel: 'Отели',
  restaurant: 'Рестораны',
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
  transform(category: Category, form: 'singular' | 'plural' = 'singular'): string {
    return form === 'plural' ? CATEGORY_PLURAL_LABELS[category] : CATEGORY_LABELS[category];
  }
}
