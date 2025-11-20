import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Combo TDEA Power',
    description: 'Arroz, pechuga a la plancha, ensalada fresca y jugo natural.',
    price: 12000,
    originalPrice: 15000,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    category: 'Almuerzos',
    tags: ['saludable', 'alto_proteina'],
    stock: 15,
    calories: 650
  },
  {
    id: '2',
    name: 'Bowl Vegetariano',
    description: 'Quinoa, aguacate, garbanzos, tomate cherry y aderezo de la casa.',
    price: 10500,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    category: 'Saludables',
    tags: ['vegetariano', 'vegano', 'sin_gluten'],
    stock: 8,
    calories: 450
  },
  {
    id: '3',
    name: 'Burger Clásica Estudiantil',
    description: 'Carne 100% res, queso, lechuga, tomate y papas a la francesa.',
    price: 14000,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    category: 'Almuerzos',
    tags: [],
    stock: 20,
    calories: 850
  },
  {
    id: '4',
    name: 'Wrap de Pollo César',
    description: 'Tortilla integral, pollo grillado, lechuga romana y salsa césar.',
    price: 9500,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    category: 'Snacks',
    tags: ['saludable'],
    stock: 12,
    calories: 500
  },
  {
    id: '5',
    name: 'Café Latte TDEA',
    description: 'Café recién molido con leche espumada.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1556742400-b5b7c5121f99?auto=format&fit=crop&w=800&q=80',
    category: 'Bebidas',
    tags: ['sin_gluten'],
    stock: 50,
    calories: 120
  },
  {
    id: '6',
    name: 'Jugo de Naranja Natural',
    description: 'Recién exprimido, sin azúcar añadida.',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80',
    category: 'Bebidas',
    tags: ['vegano', 'saludable', 'sin_gluten'],
    stock: 30,
    calories: 110
  },
  {
    id: '7',
    name: 'Ensalada de Frutas',
    description: 'Mix de temporada con queso y crema (opcional).',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=800&q=80',
    category: 'Desayunos',
    tags: ['vegetariano', 'saludable'],
    stock: 10,
    calories: 250
  },
  {
    id: '8',
    name: 'Sandwich de Pavo',
    description: 'Pan artesanal, jamón de pavo, queso y vegetales.',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    category: 'Desayunos',
    tags: ['saludable'],
    stock: 15,
    calories: 380
  },
  {
    id: '9',
    name: 'Empanada de Iglesia',
    description: 'La clásica empanada de papa y carne.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&q=80',
    category: 'Snacks',
    tags: [],
    stock: 40,
    calories: 300
  },
  {
    id: '10',
    name: 'Smoothie Verde Detox',
    description: 'Espinaca, piña, pepino y manzana verde.',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80',
    category: 'Bebidas',
    tags: ['vegano', 'saludable', 'detox'],
    stock: 20,
    calories: 90
  },
  {
    id: '11',
    name: 'Parfait de Yogurt',
    description: 'Yogurt griego, granola artesanal y frutos rojos.',
    price: 7000,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    category: 'Desayunos',
    tags: ['vegetariano', 'saludable'],
    stock: 12,
    calories: 320
  },
  {
    id: '12',
    name: 'Burrito Mexicano',
    description: 'Frijol refrito, carne desmechada, arroz y pico de gallo.',
    price: 13000,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    category: 'Almuerzos',
    tags: [],
    stock: 18,
    calories: 750
  },
  {
    id: '13',
    name: 'Brownie Vegano',
    description: 'Hecho con cacao 70% y harina de almendras.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=800&q=80',
    category: 'Snacks',
    tags: ['vegano', 'sin_gluten'],
    stock: 10,
    calories: 280
  },
  {
    id: '14',
    name: 'Agua Mineral',
    description: 'Botella de 600ml.',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=800&q=80',
    category: 'Bebidas',
    tags: ['vegano', 'sin_gluten'],
    stock: 100,
    calories: 0
  },
  {
    id: '15',
    name: 'Rescate: Pasta Bolognesa',
    description: 'Pasta artesanal con salsa bolognesa (¡Queda poco!).',
    price: 6000,
    originalPrice: 14000,
    image: 'https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=800&q=80',
    category: 'Rescate',
    tags: [],
    stock: 3,
    isRescue: true,
    calories: 600
  },
  {
    id: '16',
    name: 'Rescate: Arroz con Pollo',
    description: 'El clásico de siempre, con descuento especial.',
    price: 5500,
    originalPrice: 12000,
    image: 'https://images.unsplash.com/photo-1560262434-399d7914966b?auto=format&fit=crop&w=800&q=80',
    category: 'Rescate',
    tags: [],
    stock: 4,
    isRescue: true,
    calories: 700
  }
];
