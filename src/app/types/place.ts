import { Category } from './category';

export interface Place {
  id: string;
  name: string;
  imageUrl: string;
  category: Category;
  city: string;
  country: string;
  rating: number | null;
  priceLevel: number | null;
  tags: string[];
  shortDescription: string;
  description: string;
  badge: string | null;
}
