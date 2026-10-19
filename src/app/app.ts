import { Component, computed, effect, signal } from '@angular/core';
import { Category } from './types/category';
import { Place } from './types/place';
import { CategoryPipe } from './pipes/category-pipe';
import { PricePipe } from './pipes/price-pipe';
import { RatingPipe } from './pipes/rating-pipe';
import { PlaceCard } from './place-card/place-card';

const FAVORITES_STORAGE_KEY = 'favoriteIds';

@Component({
  imports: [CategoryPipe, PricePipe, RatingPipe, PlaceCard],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly categories: Category[] = [
    'hotel',
    'restaurant',
    'entertainment',
    'nature',
    'culture',
    'architecture',
    'spa',
  ];

  protected readonly places = signal<Place[]>([
    {
      id: 1,
      name: 'Mist Springs',
      imageUrl: '/images/places/mist-springs.jpg',
      category: 'hotel',
      city: 'Имеровигли',
      country: 'Греция',
      rating: 5,
      priceLevel: 3,
      tags: ['Скала', 'Панорамный вид', 'Тихое место'],
      description:
        'Отель, высеченный прямо в скале над морем, где из каждого номера открывается панорамный вид на бескрайний горизонт. Пространство словно становится частью природного ландшафта, а мягкий свет и натуральные материалы создают ощущение покоя и уединения. На закате каменные террасы окрашиваются в тёплые оттенки, а шум волн внизу становится главным звуком вечера.',
    },
    {
      id: 2,
      name: 'Aqua Vista',
      imageUrl: '/images/places/aqua-vista.jpg',
      category: 'restaurant',
      city: 'Мале',
      country: 'Мальдивы',
      rating: 4.9,
      priceLevel: 2,
      tags: ['Под водой', 'Горячие источники'],
      description:
        'Ресторан на глубине 5 метров под водой с панорамным видом на бескрайний океан и его обитателей. Огромные стеклянные стены создают ощущение полного погружения: вокруг проплывают тропические рыбы, а солнечные лучи рисуют на песке причудливые узоры. Меню построено на свежих морепродуктах, а ужин при мягком подводном освещении запоминается надолго.',
    },
    {
      id: 3,
      name: 'Mist Springs',
      imageUrl: '/images/places/mist-springs-japan.jpg',
      category: 'spa',
      city: 'Хаконе',
      country: 'Япония',
      rating: 4.7,
      priceLevel: 2,
      tags: ['Лес', 'Горячие источники', 'Туман', 'Природные бассейны'],
      badge: '18+',
      description:
        'Уединённый термальный комплекс среди горного леса, где природные бассейны растворяются в утреннем тумане. Природные горячие источники каскадом спускаются по склону, окружённому густой зеленью и скалами. Здесь можно провести несколько часов в тёплой воде, наслаждаясь тишиной, прохладным горным воздухом и шумом небольших водопадов. Пространство дополнено уютными зонами отдыха, органично вписанными в окружающий пейзаж.',
    },
    {
      id: 4,
      name: 'Skyline Cinema',
      imageUrl: '/images/places/skyline-cinema.jpg',
      category: 'entertainment',
      city: 'Дубай',
      country: 'ОАЭ',
      rating: 4.4,
      priceLevel: 1,
      tags: [],
      description:
        'Кинотеатр на крыше небоскрёба, где фильмы смотрят под открытым небом на фоне сияющей панорамы ночного города.',
    },
    {
      id: 5,
      name: 'Echoes of Stone',
      imageUrl: '/images/places/echoes-of-stone.jpg',
      category: 'culture',
      city: 'Матера',
      country: 'Италия',
      rating: 4.9,
      tags: ['Пещеры', 'Иммерсивное искусство'],
      badge: 'Только по записи',
      description:
        'Галерея внутри древних пещер, где произведения искусства оживают с помощью света, звука и проекций прямо на каменных стенах.',
    },
    {
      id: 6,
      name: 'Aurora Glass Lodge',
      imageUrl: '/images/places/aurora-glass-lodge.jpg',
      category: 'hotel',
      city: 'Рованиеми',
      country: 'Финляндия',
      rating: 4.8,
      priceLevel: 2,
      tags: ['Стеклянная крыша', 'Северное сияние'],
      description:
        'Стеклянные домики посреди заснеженного леса, где северное сияние можно наблюдать прямо из кровати. Панорамные стены и прозрачная крыша открывают вид на звёздное небо и бескрайние снежные пейзажи, сохраняя внутри тепло и уют.',
    },
  ]);

  protected readonly selectedCategory = signal<Category | 'all'>('all');

  protected readonly filteredPlaces = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') {
      return this.places();
    }
    return this.places().filter((place) => place.category === category);
  });

  protected readonly selectedPlace = signal<Place | null>(null);

  protected readonly favoriteIds = signal<number[]>(this.loadFavoriteIds());

  protected readonly favoritesCount = computed(() => this.favoriteIds().length);

  constructor() {
    effect(() => {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(this.favoriteIds()));
    });
  }

  protected toggleFavorite(id: number): void {
    this.favoriteIds.update((ids) =>
      ids.includes(id) ? ids.filter((favoriteId) => favoriteId !== id) : [...ids, id],
    );
  }

  private loadFavoriteIds(): number[] {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }
}
