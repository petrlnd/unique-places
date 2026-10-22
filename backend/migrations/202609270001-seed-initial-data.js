const bcrypt = require('bcryptjs');

const PLACE_NAMES = ['Aegean Hideaway', 'Aqua Vista', 'Mist Springs', 'Skyline Cinema', 'Echoes of Stone', 'Aurora Glass Lodge', 'Cliff Library', 'Cloud Forest Walk'];

module.exports = {
  async up(db) {
    const places = [
      {
        name: 'Aegean Hideaway', category: 'hotel', city: 'Имеровигли', country: 'Греция', rating: 5.0, priceLevel: 3,
        tags: ['Скала', 'Панорамный вид', 'Тихое место'], badge: 'Эксклюзив',
        description: 'Отель, высеченный прямо в скале над морем, где из каждого номера открывается панорамный вид на бескрайний горизонт. Пространство словно становится частью природного ландшафта, а мягкий свет и натуральные материалы создают ощущение покоя и уединения. На закате каменные террасы окрашиваются в тёплые оттенки, а шум волн внизу становится главным звуком вечера.',
        imageUrl: '/images/places/aegean-hideaway.jpg', latitude: 36.431, longitude: 25.422, isPublished: true
      },
      {
        name: 'Aqua Vista', category: 'restaurant', city: 'Мале', country: 'Мальдивы', rating: 4.9, priceLevel: 2,
        tags: ['Под водой', 'Вид на рыб'], badge: null,
        description: 'Ресторан на глубине 5 метров под водой с панорамным видом на бескрайний океан и его обитателей. Огромные стеклянные стены создают ощущение полного погружения: вокруг проплывают тропические рыбы, а солнечные лучи рисуют на песке причудливые узоры. Меню построено на свежих морепродуктах, а ужин при мягком подводном освещении запоминается надолго.',
        imageUrl: '/images/places/aqua-vista.jpg', latitude: 4.1755, longitude: 73.5093, isPublished: true
      },
      {
        name: 'Mist Springs', category: 'spa', city: 'Хаконе', country: 'Япония', rating: 4.7, priceLevel: 2,
        tags: ['Лес', 'Горячие источники', 'Туман', 'Природные бассейны'], badge: '18+',
        description: 'Уединённый термальный комплекс среди горного леса, где природные бассейны растворяются в утреннем тумане. Природные горячие источники каскадом спускаются по склону, окружённому густой зеленью и скалами. Здесь можно провести несколько часов в тёплой воде, наслаждаясь тишиной, прохладным горным воздухом и шумом небольших водопадов. Пространство дополнено уютными зонами отдыха, органично вписанными в окружающий пейзаж.',
        imageUrl: '/images/places/mist-springs.jpg', latitude: 35.2324, longitude: 139.1069, isPublished: true
      },
      {
        name: 'Skyline Cinema', category: 'entertainment', city: 'Дубай', country: 'ОАЭ', rating: 4.4, priceLevel: 1,
        tags: ['На крыше', 'Вид на город'], badge: null,
        description: 'Кинотеатр на крыше небоскрёба, где фильмы смотрят под открытым небом на фоне сияющей панорамы ночного города.',
        imageUrl: '/images/places/skyline-cinema.jpg', latitude: 25.2048, longitude: 55.2708, isPublished: true
      },
      {
        name: 'Echoes of Stone', category: 'culture', city: 'Матера', country: 'Италия', rating: 4.9, priceLevel: 1,
        tags: ['Пещеры', 'Иммерсивное искусство'], badge: 'Только по записи',
        description: 'Галерея внутри древних пещер, где произведения искусства оживают с помощью света, звука и проекций прямо на каменных стенах.',
        imageUrl: '/images/places/echoes-of-stone.jpg', latitude: 40.6663, longitude: 16.6043, isPublished: true
      },
      {
        name: 'Aurora Glass Lodge', category: 'hotel', city: 'Рованиеми', country: 'Финляндия', rating: 4.8, priceLevel: 2,
        tags: ['Стеклянная крыша', 'Северное сияние'], badge: null,
        description: 'Стеклянные домики посреди заснеженного леса, где северное сияние можно наблюдать прямо из кровати. Панорамные стены и прозрачная крыша открывают вид на звёздное небо и бескрайние снежные пейзажи, сохраняя внутри тепло и уют.',
        imageUrl: '/images/places/aurora-glass-lodge.jpg', latitude: 66.5039, longitude: 25.7294, isPublished: true
      },
      {
        name: 'Cliff Library', category: 'architecture', city: 'Чунцин', country: 'Китай', rating: 4.6, priceLevel: null,
        tags: ['Архитектура', 'Скала'], badge: null,
        description: 'Небольшая библиотека, встроенная в скальный массив и открывающая вид на горную долину.',
        imageUrl: '/images/places/cliff-library.jpg', latitude: 29.563, longitude: 106.5516, isPublished: true
      },
      {
        name: 'Cloud Forest Walk', category: 'nature', city: 'Монтеверде', country: 'Коста-Рика', rating: 4.7, priceLevel: null,
        tags: ['Облачный лес', 'Высота'], badge: 'Сезонное',
        description: 'Маршрут среди облачного леса по подвесным дорожкам над кронами деревьев.',
        imageUrl: '/images/places/cloud-forest-walk.jpg', latitude: 10.3009, longitude: -84.8255, isPublished: true
      }
    ].map(x => ({ ...x, shortDescription: x.description, createdAt: new Date(), updatedAt: new Date() }));

    await db.collection('places').insertMany(places);
    await db.collection('places').createIndex({ category: 1 });
    await db.collection('places').createIndex({ name: 'text', city: 'text', country: 'text', tags: 'text', shortDescription: 'text', description: 'text' });

    const passwordHash = await bcrypt.hash('student123', 10);
    await db.collection('users').insertOne({ name: 'Student', email: 'student@unique.places', passwordHash, createdAt: new Date(), updatedAt: new Date() });
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('favorites').createIndex({ userId: 1, placeId: 1 }, { unique: true });
    await db.collection('refreshtokens').createIndex({ tokenHash: 1 }, { unique: true });
    await db.collection('refreshtokens').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  },

  async down(db) {
    await db.collection('favorites').deleteMany({});
    await db.collection('refreshtokens').deleteMany({});
    await db.collection('users').deleteMany({ email: 'student@unique.places' });
    await db.collection('places').deleteMany({ name: { $in: PLACE_NAMES } });
  }
};
