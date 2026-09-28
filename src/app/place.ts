export interface Place {
  id: number;
  name: string;
  imageUrl: string;
  category: string;
  city: string;
  country: string;
  rating: number;
  priceLevel?: number;
  tags: string[];
  description: string;
  isExpanded?: boolean;
}
