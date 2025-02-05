import { SeedData } from "./seed.interface";


export const initialData: SeedData = {
  products: [
    {
      name: 'Golden Avocado Toast Supreme',
      price: 18.99,
      description:
        'Nuestro bestseller: Pan artesanal de masa madre tostado, topped con aguacate cremoso, huevos pochados perfectamente cocidos, salmón ahumado premium, semillas de todo bagel, microgreens frescos y un toque de aceite de oliva extra virgen.',
      images: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d',
      categories: ['bestseller', 'breakfast', 'saludable', 'gourmet'],
      sizes: [
        {
          size: 'Regular (2 tostadas)',
          price: 18.99,
          stock: 35,
        },
        {
          size: 'Para compartir (4 tostadas)',
          price: 32.99,
          stock: 20,
        },
      ],
      recetas: ['Pan de masa madre', 'Guacamole casero', 'Huevos pochados'],
    },
    {
      name: 'Rainbow Açaí Supreme Bowl',
      price: 19.99,
      description:
        'Base cremosa de açaí amazónico premium, banana y frutos del bosque, decorado artísticamente con dragonfruit rosado, mango, kiwi, blueberries, granola casera crocante, coco tostado y miel de agave.',
      images: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55',
      categories: ['bestseller', 'bowl', 'saludable'],
      sizes: [
        {
          size: 'Regular (400g)',
          price: 19.99,
          stock: 30,
        },
        {
          size: 'Grande (600g)',
          price: 24.99,
          stock: 15,
        },
      ],
      recetas: ['Base de açaí', 'Granola casera', 'Mix de frutas'],
    },
    {
      name: 'Tropical Paradise Smoothie',
      price: 12.99,
      description:
        'Smoothie refrescante de mango, piña, maracuyá y coco, endulzado con miel de abeja. Decorado con frutas frescas y flores comestibles.',
      images: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625',
      categories: ['bebidas', 'saludable', 'tropical'],
      sizes: [
        {
          size: 'Regular (450ml)',
          price: 12.99,
          stock: 50,
        },
        {
          size: 'Grande (650ml)',
          price: 15.99,
          stock: 30,
        },
      ],
      recetas: ['Mix de frutas tropicales', 'Leche de coco casera'],
    },
    {
      name: 'Power Green Juice',
      price: 11.99,
      description:
        'Jugo energizante de espinaca, manzana verde, pepino, apio, jengibre y limón. El boost perfecto para empezar el día.',
      images: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec',
      categories: ['bebidas', 'detox', 'saludable'],
      sizes: [
        {
          size: 'Regular (400ml)',
          price: 11.99,
          stock: 40,
        },
        {
          size: 'Grande (600ml)',
          price: 14.99,
          stock: 25,
        },
      ],
      recetas: ['Jugo verde básico', 'Shot de jengibre'],
    },
    {
      name: 'Protein Pancake Stack',
      price: 16.99,
      description:
        'Torre de pancakes proteicos de avena y claras, servidos con frutas frescas, mantequilla de almendras y sirope sin azúcar.',
      images: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93',
      categories: ['fitness', 'proteico', 'pancakes'],
      sizes: [
        {
          size: 'Regular (3 pancakes)',
          price: 16.99,
          stock: 25,
        },
        {
          size: 'Grande (5 pancakes)',
          price: 21.99,
          stock: 15,
        },
      ],
      recetas: ['Masa de pancakes proteicos', 'Mantequilla de almendras casera'],
    },
    {
      name: 'Mediterranean Breakfast Platter',
      price: 24.99,
      description:
        'Selección de hummus casero, aceitunas kalamata, pepinos, tomates cherry, huevos cocidos, queso feta y pan pita caliente.',
      images: 'https://images.unsplash.com/photo-1513442542250-854d436a73f2',
      categories: ['internacional', 'saludable', 'platter'],
      sizes: [
        {
          size: 'Individual',
          price: 24.99,
          stock: 20,
        },
        {
          size: 'Para compartir',
          price: 39.99,
          stock: 15,
        },
      ],
      recetas: ['Hummus casero', 'Pan pita', 'Marinado de aceitunas'],
    },
    {
      name: 'Berry Bliss Overnight Oats',
      price: 13.99,
      description:
        'Avena orgánica preparada con leche de almendras, chia seeds, y un mix de berries frescas, topped con granola casera y miel.',
      images: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2',
      categories: ['saludable', 'preparado', 'avena'],
      sizes: [
        {
          size: 'Regular (350g)',
          price: 13.99,
          stock: 30,
        },
        {
          size: 'Grande (500g)',
          price: 17.99,
          stock: 20,
        },
      ],
      recetas: ['Base de overnight oats', 'Compota de berries', 'Granola casera'],
    },
    {
      name: 'Eggs Benedict Florentine',
      price: 21.99,
      description:
        'Huevos pochados sobre espinacas salteadas y muffins ingleses, bañados en salsa holandesa casera y topped con trufa negra rallada.',
      images: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7',
      categories: ['gourmet', 'huevos', 'especial'],
      sizes: [
        {
          size: 'Regular',
          price: 21.99,
          stock: 25,
        },
        {
          size: 'Con extra trufa',
          price: 26.99,
          stock: 15,
        },
      ],
      recetas: ['Salsa holandesa', 'Huevos pochados', 'Espinacas salteadas'],
    },
    {
      name: 'Sunshine Papaya Bowl',
      price: 15.99,
      description:
        'Media papaya fresca rellena de yogurt griego, granola casera, frutas frescas y miel de abeja. Un desayuno tropical y nutritivo.',
      images: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38',
      categories: ['tropical', 'frutas', 'bowl'],
      sizes: [
        {
          size: 'Regular',
          price: 15.99,
          stock: 20,
        },
        {
          size: 'Grande',
          price: 19.99,
          stock: 15,
        },
      ],
      recetas: ['Preparación de papaya', 'Granola casera', 'Yogurt griego casero'],
    },
    {
      name: 'Matcha Green Tea Latte',
      price: 8.99,
      description:
        'Matcha ceremonial japonés preparado con leche de avena y un toque de vainilla. Servido caliente o frío.',
      images: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002',
      categories: ['bebidas', 'té', 'japonés'],
      sizes: [
        {
          size: 'Regular (350ml)',
          price: 8.99,
          stock: 40,
        },
        {
          size: 'Grande (500ml)',
          price: 10.99,
          stock: 30,
        },
      ],
      recetas: ['Preparación de matcha', 'Leche de avena casera'],
    },
    {
      name: 'Breakfast Burrito Supreme',
      price: 17.99,
      description:
        'Burrito XL con huevos revueltos, aguacate, frijoles negros, queso cheddar, pico de gallo y salsa chipotle casera.',
      images: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f',
      categories: ['mexicano', 'sustancioso', 'caliente'],
      sizes: [
        {
          size: 'Regular',
          price: 17.99,
          stock: 30,
        },
        {
          size: 'Con extra guacamole',
          price: 19.99,
          stock: 25,
        },
      ],
      recetas: ['Frijoles refritos', 'Pico de gallo', 'Salsa chipotle'],
    },
    {
      name: 'Nordic Smoked Salmon Plate',
      price: 23.99,
      description:
        'Salmón ahumado premium, huevos revueltos cremosos, aguacate, pepino, rábanos y pan de centeno tostado.',
      images: 'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606',
      categories: ['nórdico', 'pescado', 'gourmet'],
      sizes: [
        {
          size: 'Individual',
          price: 23.99,
          stock: 20,
        },
        {
          size: 'Para compartir',
          price: 39.99,
          stock: 15,
        },
      ],
      recetas: ['Pan de centeno', 'Huevos revueltos cremosos', 'Marinado de salmón'],
    },
    {
      name: 'Golden Milk Latte',
      price: 7.99,
      description:
        'Bebida ayurvédica de cúrcuma, jengibre, canela y pimienta negra con leche de coco. Un boost antiinflamatorio.',
      images: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e',
      categories: ['bebidas', 'ayurveda', 'saludable'],
      sizes: [
        {
          size: 'Regular (350ml)',
          price: 7.99,
          stock: 35,
        },
        {
          size: 'Grande (500ml)',
          price: 9.99,
          stock: 25,
        },
      ],
      recetas: ['Mezcla de especias golden milk', 'Leche de coco casera'],
    },
    {
      name: 'French Toast Deluxe',
      price: 18.99,
      description:
        'Pan brioche en tempura de vainilla, servido con compota de frutos rojos, crema mascarpone y sirope de maple puro.',
      images: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929',
      categories: ['dulce', 'especial', 'gourmet'],
      sizes: [
        {
          size: 'Regular (3 piezas)',
          price: 18.99,
          stock: 25,
        },
        {
          size: 'Grande (5 piezas)',
          price: 24.99,
          stock: 15,
        },
      ],
      recetas: ['Pan brioche', 'Compota de frutos rojos', 'Crema mascarpone'],
    },
    {
      name: 'Detox Green Bowl',
      price: 16.99,
      description:
        'Bowl de espinacas baby, kale, aguacate, huevo pochado, quinoa, semillas de calabaza y aderezo de tahini.',
      images: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      categories: ['detox', 'saludable', 'bowl'],
      sizes: [
        {
          size: 'Regular',
          price: 16.99,
          stock: 30,
        },
        {
          size: 'Grande',
          price: 20.99,
          stock: 20,
        },
      ],
      recetas: ['Quinoa perfecta', 'Aderezo de tahini', 'Huevos pochados'],
    },
    {
      name: 'Mango Tango Smoothie Bowl',
      price: 15.99,
      description: 'Base de mango, banana y leche de coco, topped con granola, coco tostado, chía y frutas frescas.',
      images: 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec',
      categories: ['smoothie bowl', 'tropical', 'saludable'],
      sizes: [
        {
          size: 'Regular (400g)',
          price: 15.99,
          stock: 25,
        },
        {
          size: 'Grande (600g)',
          price: 19.99,
          stock: 15,
        },
      ],
      recetas: ['Base de smoothie tropical', 'Granola casera', 'Coco tostado'],
    },
    {
      name: 'Bagel Deluxe',
      price: 14.99,
      description: 'Bagel artesanal con queso crema, salmón ahumado, alcaparras, cebolla roja y eneldo fresco.',
      images: 'https://images.unsplash.com/photo-1592321675774-3de57f3ee0dc',
      categories: ['bagels', 'salado', 'clásico'],
      sizes: [
        {
          size: 'Regular',
          price: 14.99,
          stock: 30,
        },
        {
          size: 'Con extra salmón',
          price: 17.99,
          stock: 20,
        },
      ],
      recetas: ['Bagels caseros', 'Queso crema casero', 'Marinado de salmón'],
    },
    {
      name: 'Wellness Shot Trio',
      price: 12.99,
      description: 'Set de 3 shots: jengibre-cúrcuma, limón-cayena y remolacha-manzana. Boost de energía y nutrientes.',
      images: 'https://images.unsplash.com/photo-1613478223719-2ab802602423',
      categories: ['shots', 'detox', 'bebidas'],
      sizes: [
        {
          size: 'Individual (3x30ml)',
          price: 12.99,
          stock: 40,
        },
        {
          size: 'Pack doble (6x30ml)',
          price: 22.99,
          stock: 25,
        },
      ],
      recetas: ['Shot de jengibre', 'Shot de remolacha', 'Shot de limón'],
    },
    {
      name: 'Waffle Belgian Supreme',
      price: 17.99,
      description:
        'Waffle belga auténtico con fresas frescas, crema chantilly casera, chocolate belga y almendras tostadas.',
      images: 'https://images.unsplash.com/photo-1504387432042-8aca7c138087',
      categories: ['waffles', 'dulce', 'belga'],
      sizes: [
        {
          size: 'Regular (1 waffle)',
          price: 17.99,
          stock: 25,
        },
        {
          size: 'Doble (2 waffles)',
          price: 28.99,
          stock: 15,
        },
      ],
      recetas: ['Masa de waffles', 'Crema chantilly', 'Salsa de chocolate'],
    },
    {
      name: 'Buddha Bowl Breakfast',
      price: 19.99,
      description:
        'Bowl nutritivo con quinoa, garbanzos especiados, espinacas, aguacate, huevo pochado y salsa tahini.',
      images: 'https://images.unsplash.com/photo-1543362906-acfc16c67564',
      categories: ['bowl', 'saludable', 'vegetariano'],
      sizes: [
        {
          size: 'Regular',
          price: 19.99,
          stock: 25,
        },
        {
          size: 'Grande',
          price: 24.99,
          stock: 15,
        },
      ],
      recetas: ['Garbanzos especiados', 'Salsa tahini', 'Quinoa perfecta'],
    },
    {
      name: 'English Breakfast Deluxe',
      price: 24.99,
      description:
        'Desayuno inglés completo con huevos, salchichas, bacon, champiñones, tomates asados, beans y pan tostado.',
      images: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666',
      categories: ['inglés', 'sustancioso', 'tradicional'],
      sizes: [
        {
          size: 'Regular',
          price: 24.99,
          stock: 20,
        },
        {
          size: 'Extra grande',
          price: 29.99,
          stock: 15,
        },
      ],
      recetas: ['Beans caseros', 'Salchichas caseras', 'Tomates asados'],
    },
    {
      name: 'Coconut Chia Pudding Paradise',
      price: 14.99,
      description:
        'Pudding de chía preparado con leche de coco, vainilla y maple, topped con mango fresco, blueberries, coco tostado y almendras fileteadas.',
      images: 'https://images.unsplash.com/photo-1490323914169-4751b5e16384',
      categories: ['pudding', 'saludable', 'vegano'],
      sizes: [
        {
          size: 'Regular (300g)',
          price: 14.99,
          stock: 25,
        },
        {
          size: 'Grande (450g)',
          price: 18.99,
          stock: 15,
        },
      ],
      recetas: ['Base de pudding de chía', 'Leche de coco casera', 'Mix de toppings'],
    },
    {
      name: 'Japanese Breakfast Set',
      price: 26.99,
      description:
        'Set tradicional japonés con salmón a la parrilla, arroz integral, sopa miso, tamagoyaki, encurtidos caseros y té verde.',
      images: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d',
      categories: ['japonés', 'tradicional', 'saludable'],
      sizes: [
        {
          size: 'Individual',
          price: 26.99,
          stock: 15,
        },
        {
          size: 'Set para dos',
          price: 49.99,
          stock: 10,
        },
      ],
      recetas: ['Sopa miso casera', 'Tamagoyaki', 'Encurtidos japoneses', 'Arroz perfecto'],
    },
    {
      name: 'Protein Power Smoothie',
      price: 13.99,
      description:
        'Smoothie proteico con plátano, mantequilla de maní, cacao, proteína vegana, espinacas y leche de almendras.',
      images: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888',
      categories: ['proteico', 'bebidas', 'fitness'],
      sizes: [
        {
          size: 'Regular (450ml)',
          price: 13.99,
          stock: 40,
        },
        {
          size: 'Grande (650ml)',
          price: 16.99,
          stock: 25,
        },
      ],
      recetas: ['Base de smoothie proteico', 'Proteína casera', 'Mantequilla de maní'],
    },
    {
      name: 'Mediterranean Shakshuka',
      price: 19.99,
      description:
        'Huevos pochados en salsa de tomates especiados, pimientos, cebolla y ajo, servido con pan pita y hummus.',
      images: 'https://images.unsplash.com/photo-1590412200988-a436970781fa',
      categories: ['mediterráneo', 'caliente', 'vegetariano'],
      sizes: [
        {
          size: 'Individual',
          price: 19.99,
          stock: 25,
        },
        {
          size: 'Para compartir',
          price: 34.99,
          stock: 15,
        },
      ],
      recetas: ['Salsa shakshuka', 'Pan pita casero', 'Hummus clásico'],
    },
    {
      name: 'Granola Bowl Supremo',
      price: 16.99,
      description:
        'Granola artesanal con nueces activadas, servida con yogurt griego, miel de abeja, frutas frescas y mantequilla de almendras.',
      images: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf',
      categories: ['bowl', 'granola', 'saludable'],
      sizes: [
        {
          size: 'Regular (350g)',
          price: 16.99,
          stock: 30,
        },
        {
          size: 'Grande (500g)',
          price: 20.99,
          stock: 20,
        },
      ],
      recetas: ['Granola casera', 'Yogurt griego', 'Mantequilla de almendras'],
    },
    {
      name: 'Green Goddess Bowl',
      price: 18.99,
      description:
        'Bowl de quinoa con aguacate, espinacas baby, brócoli al vapor, semillas de calabaza y aderezo de hierbas.',
      images: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6',
      categories: ['bowl', 'vegano', 'saludable'],
      sizes: [
        {
          size: 'Regular',
          price: 18.99,
          stock: 25,
        },
        {
          size: 'Grande',
          price: 23.99,
          stock: 15,
        },
      ],
      recetas: ['Quinoa base', 'Aderezo de hierbas', 'Vegetales al vapor'],
    },
    {
      name: 'Croissant Breakfast Sandwich',
      price: 15.99,
      description: 'Croissant artesanal relleno de huevos revueltos, queso gouda, espinacas y tomates asados.',
      images: 'https://images.unsplash.com/photo-1600353068440-6361ef3a86e8',
      categories: ['sandwich', 'caliente', 'clásico'],
      sizes: [
        {
          size: 'Individual',
          price: 15.99,
          stock: 35,
        },
        {
          size: 'Combo con café',
          price: 19.99,
          stock: 25,
        },
      ],
      recetas: ['Croissants caseros', 'Huevos revueltos cremosos', 'Tomates asados'],
    },
    {
      name: 'Dragon Fruit Smoothie Bowl',
      price: 17.99,
      description:
        'Base de pitaya rosa con banana y leche de coco, topped con frutas frescas, coco rallado y semillas de chía.',
      images: 'https://images.unsplash.com/photo-1626790680787-de5e9a07bcf2',
      categories: ['smoothie bowl', 'tropical', 'vegano'],
      sizes: [
        {
          size: 'Regular (400g)',
          price: 17.99,
          stock: 20,
        },
        {
          size: 'Grande (600g)',
          price: 21.99,
          stock: 15,
        },
      ],
      recetas: ['Base de pitaya', 'Mix de toppings', 'Leche de coco casera'],
    },
  ],
};
