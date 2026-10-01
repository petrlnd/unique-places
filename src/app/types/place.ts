import { Category } from './category';

export interface Place {
  id: number;
  name: string;
  imageUrl: string;
  category: Category;
  city: string;
  country: string;
  rating: number;
  priceLevel?: number;
  tags: string[];
  description: string;
  badge?: string;
}
