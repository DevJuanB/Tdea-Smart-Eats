import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Clock, AlertCircle } from 'lucide-react';

const Rescue: React.FC = () => {
  const { products } = useStore();
  const [canRescue, setCanRescue] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  // Logic to check time (Using 14:00 as start time)
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      // For demo purposes, we might want to relax this, but per requirements:
      // Strictly checks if it's past 14:00 (2 PM)
      if (hour >= 14) {
        setCanRescue(true);
      } else {
        setCanRescue(false);
        // Calculate time until 14:00
        const target = new Date();
        target.setHours(14, 0, 0, 0);
        const diff = target.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${minutes}m`);
      }
    };
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const rescueProducts = products.filter(p => p.isRescue);

  if (!canRescue) {
    return (
      <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-8 text-center pb-24 animate-fade-in">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="text-tdea-orange" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Aún es temprano!</h2>
          <p className="text-gray-500 mb-6 text-sm">
            La sección "Rescata un plato" abre a las 2:00 PM para combatir el desperdicio de alimentos con descuentos del 50%.
          </p>
          
          <div className="bg-gray-900 text-white p-4 rounded-xl">
            <span className="text-xs text-gray-400 uppercase">Tiempo restante</span>
            <div className="text-3xl font-mono font-bold mt-1">{timeLeft}</div>
          </div>
          
          <p className="text-xs text-gray-400 mt-4 italic">
            (Para probar el demo, cambia la hora de tu sistema o vuelve más tarde)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 bg-gray-50 min-h-screen animate-fade-in">
      <div className="bg-red-500 p-6 text-white sticky top-0 z-10 shadow-md rounded-b-3xl">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="fill-white text-red-500" />
          <h1 className="text-xl font-bold">¡Rescata un plato!</h1>
        </div>
        <p className="text-red-100 text-sm">Ayúdanos a evitar el desperdicio. Estos platos están perfectos pero deben irse hoy.</p>
        <div className="mt-4 bg-white/20 backdrop-blur-md rounded-lg p-2 flex justify-center items-center gap-2 text-sm font-bold">
           <span>Cierra en: </span>
           <span className="font-mono">04:59:59</span>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 gap-4 mt-2">
        {rescueProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex border border-gray-100 relative">
             <div className="w-1/3 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                  -55%
                </span>
             </div>
             <div className="w-2/3 p-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">{product.description}</p>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through">${product.originalPrice?.toLocaleString()}</span>
                    <span className="text-lg font-bold text-red-500">${product.price.toLocaleString()}</span>
                  </div>
                  <ProductCard product={product} compact /> {/* Reusing logic but we hide the card UI via CSS tricks or just custom button here */}
                </div>
             </div>
             {/* Custom Overlay for the card to simplify */}
             <div className="absolute bottom-3 right-3">
                {/* We rely on ProductCard's internal logic but visually override if needed, or just render a custom Add button */}
             </div>
          </div>
        ))}
        
        {/* Fallback if array is simple, ensure components render correctly */}
        {rescueProducts.length === 0 && (
           <div className="text-center p-10 text-gray-500">Hoy no hay platos para rescatar. ¡Todo se vendió!</div>
        )}
      </div>
    </div>
  );
};

export default Rescue;