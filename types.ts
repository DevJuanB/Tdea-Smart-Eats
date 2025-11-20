export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For discounts
  image: string;
  category: 'Desayunos' | 'Almuerzos' | 'Bebidas' | 'Snacks' | 'Saludables' | 'Rescate';
  tags: string[]; // e.g., 'vegano', 'sin_gluten', 'alto_proteina'
  stock: number;
  isRescue?: boolean;
  calories: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserPreferences {
  budget: number;
  restrictions: string[]; // 'vegetariano', 'vegano', 'celiaco', 'sin_lacteos', 'diabetico'
  calorieGoal: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  pickupTime: string;
  code: string;
  status: 'pending' | 'completed' | 'picked_up';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'guest';
  coins: number;
  preferences: UserPreferences;
  history: Order[];
}

export type FilterType = 'all' | 'price_low' | 'price_high' | 'healthy' | 'vegan' | 'gluten_free';
