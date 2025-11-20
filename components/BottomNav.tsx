import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Coffee, HeartHandshake, User, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const BottomNav: React.FC = () => {
  const { cart } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-tdea-orange' : 'text-gray-500'}`;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-5 h-full max-w-md mx-auto">
        <NavLink to="/" className={navClass}>
          <Home size={22} />
          <span className="text-[10px] font-medium">Inicio</span>
        </NavLink>
        
        <NavLink to="/menu" className={navClass}>
          <Coffee size={22} />
          <span className="text-[10px] font-medium">Menú</span>
        </NavLink>

        <NavLink to="/cart" className={navClass}>
          <div className="relative">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-tdea-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Carrito</span>
        </NavLink>

        <NavLink to="/rescue" className={navClass}>
          <HeartHandshake size={22} />
          <span className="text-[10px] font-medium">Rescata</span>
        </NavLink>

        <NavLink to="/profile" className={navClass}>
          <User size={22} />
          <span className="text-[10px] font-medium">Perfil</span>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;