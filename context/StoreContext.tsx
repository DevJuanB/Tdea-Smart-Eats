import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, User, Order } from '../types';
import { INITIAL_PRODUCTS } from '../constants';
import toast from 'react-hot-toast';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  isLoading: boolean;
  setProducts: (products: Product[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, change: number) => void;
  clearCart: () => void;
  login: (name: string, email: string, isGuest?: boolean) => void;
  logout: () => void;
  placeOrder: (pickupTime: string) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  updateUserPreferences: (prefs: User['preferences']) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_USER_PREFS = {
  budget: 20000,
  restrictions: [],
  calorieGoal: 2000
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProductsState] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initial Load
  useEffect(() => {
    const loadData = () => {
      const storedProducts = localStorage.getItem('tdea_products');
      const storedUser = localStorage.getItem('tdea_user');
      const storedCart = localStorage.getItem('tdea_cart');

      if (storedProducts) setProductsState(JSON.parse(storedProducts));
      else setProductsState(INITIAL_PRODUCTS);

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedCart) setCart(JSON.parse(storedCart));
      
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Persistence
  useEffect(() => {
    if (!isLoading) localStorage.setItem('tdea_products', JSON.stringify(products));
  }, [products, isLoading]);

  useEffect(() => {
    if (!isLoading) localStorage.setItem('tdea_cart', JSON.stringify(cart));
  }, [cart, isLoading]);

  useEffect(() => {
    if (!isLoading && user) localStorage.setItem('tdea_user', JSON.stringify(user));
    else if (!isLoading && !user) localStorage.removeItem('tdea_user');
  }, [user, isLoading]);

  const setProducts = (newProducts: Product[]) => {
    setProductsState(newProducts);
  };

  const updateProductStock = (productId: string, newStock: number) => {
    setProductsState(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
  };

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast.error('¡Producto agotado!');
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          toast.error('No hay más stock disponible');
          return prev;
        }
        toast.success('Cantidad actualizada');
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      toast.success('Agregado al carrito');
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, change: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + change;
        const product = products.find(p => p.id === productId);
        if (newQty > (product?.stock || 0)) {
          toast.error('Stock máximo alcanzado');
          return item;
        }
        return { ...item, quantity: Math.max(0, newQty) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const login = (name: string, email: string, isGuest = false) => {
    const newUser: User = {
      id: isGuest ? 'guest' : 'user_' + Date.now(),
      name,
      email,
      role: email === 'admin@tdea.edu.co' ? 'admin' : 'student',
      coins: 450,
      preferences: INITIAL_USER_PREFS,
      history: []
    };
    setUser(newUser);
    toast.success(`¡Bienvenido, ${name}!`);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('tdea_user');
    toast('Sesión cerrada', { icon: '👋' });
  };

  const updateUserPreferences = (prefs: User['preferences']) => {
    if (user) {
      setUser({ ...user, preferences: prefs });
      toast.success('Preferencias actualizadas');
    }
  };

  const placeOrder = (pickupTime: string) => {
    if (!user) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const code = 'TDEA-' + Math.floor(100 + Math.random() * 900);

    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      total,
      date: new Date().toISOString(),
      pickupTime,
      code,
      status: 'pending'
    };

    // Deduct stock
    const newProducts = [...products];
    cart.forEach(item => {
      const idx = newProducts.findIndex(p => p.id === item.id);
      if (idx !== -1) {
        newProducts[idx].stock -= item.quantity;
      }
    });
    setProducts(newProducts);

    // Update user history and coins
    const earnedCoins = Math.floor(total / 1000);
    const updatedUser = {
      ...user,
      coins: user.coins + earnedCoins,
      history: [newOrder, ...user.history]
    };
    setUser(updatedUser);

    clearCart();
    return { code, earnedCoins };
  };

  return (
    <StoreContext.Provider value={{
      products, cart, user, isLoading,
      setProducts, addToCart, removeFromCart, updateCartQuantity, clearCart,
      login, logout, placeOrder, updateProductStock, updateUserPreferences
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
