import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Clock, Flame, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { user, products, addToCart } = useStore();
  const navigate = useNavigate();

  const combos = products.filter(p => p.category === 'Almuerzos' || p.id === '1').slice(0, 3);
  const recommended = products
    .filter(p => {
      // Simple recommendation logic
      if (user?.preferences.restrictions.includes('vegano')) return p.tags.includes('vegano');
      if (user?.preferences.restrictions.includes('vegetariano')) return p.tags.includes('vegetariano');
      return p.tags.includes('saludable') || p.category === 'Snacks';
    })
    .slice(0, 4);

  return (
    <div className="pb-24 animate-fade-in">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 sticky top-0 z-40 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 font-medium">Hola, {user?.name.split(' ')[0]}</p>
            <h2 className="text-xl font-bold text-gray-800">¿Qué quieres comer hoy?</h2>
          </div>
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-brand-green font-bold text-lg">{user?.name.charAt(0)}</span>
          </div>
        </div>
      </div>

      {/* Pickup Express Banner */}
      <div className="px-4 mt-4">
        <div className="bg-gradient-to-r from-brand-dark to-gray-800 rounded-2xl p-4 flex items-center justify-between shadow-lg text-white">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock size={16} className="text-brand-green" />
              <span className="font-bold text-sm">Pickup Express</span>
            </div>
            <p className="text-xs text-gray-300 max-w-[200px]">Pide antes de las 10:00 AM y recibe 15% OFF extra en combos.</p>
          </div>
          <button 
            onClick={() => navigate('/menu')}
            className="bg-brand-green px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-600 transition-colors text-white"
          >
            Ver Menú
          </button>
        </div>
      </div>

      {/* Combos Carousel */}
      <div className="mt-6">
        <div className="flex justify-between items-end px-4 mb-3">
          <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
            <Flame size={20} className="text-orange-500 fill-orange-500" />
            Combos del Día
          </h3>
        </div>
        
        <div className="flex overflow-x-auto hide-scrollbar px-4 gap-4 pb-4 snap-x snap-mandatory">
          {combos.map(product => (
            <div key={product.id} className="min-w-[280px] snap-center bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div className="h-32 overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
                  <span className="text-sm font-bold text-brand-green">${product.price.toLocaleString()}</span>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-gray-800">{product.name}</h4>
                <p className="text-xs text-gray-500 line-clamp-1 mt-1">{product.description}</p>
                <button 
                   onClick={() => addToCart(product)}
                   className="w-full mt-3 bg-green-50 text-brand-green font-semibold py-2 rounded-lg text-sm hover:bg-green-100 transition-colors"
                >
                  Agregar al pedido
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Section */}
      <div className="mt-2 px-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-lg text-gray-800">Recomendado para ti</h3>
          <button onClick={() => navigate('/menu')} className="text-brand-green text-xs font-semibold flex items-center">
            Ver todo <ArrowRight size={12} className="ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {recommended.map(product => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-20 right-4 z-40">
        <button 
          onClick={() => navigate('/menu')}
          className="bg-brand-green text-white p-4 rounded-full shadow-lg shadow-green-500/30 hover:scale-105 transition-transform flex items-center gap-2 font-bold pr-6"
        >
          <ShoppingBag className="fill-white" size={24} />
          <span className="text-sm">Pedir Ya</span>
        </button>
      </div>
      
      <div className="hidden"><ShoppingBag /></div> 
    </div>
  );
};

export default Home;