export type Category =
  | 'hotel'
  | 'restaurant'
  | 'entertainment'
  | 'nature'
  | 'culture'
  | 'architecture'
  | 'spa';

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
