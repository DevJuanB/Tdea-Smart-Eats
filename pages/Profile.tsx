import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LogOut, Settings, History, Award, ChevronRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, logout, updateUserPreferences } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');

  if (!user) return null;

  const handleRestrictionToggle = (restriction: string) => {
    const current = user.preferences.restrictions;
    const updated = current.includes(restriction)
      ? current.filter(r => r !== restriction)
      : [...current, restriction];
    updateUserPreferences({ ...user.preferences, restrictions: updated });
  };

  return (
    <div className="pb-24 bg-gray-50 min-h-screen animate-fade-in">
      {/* Header Profile */}
      <div className="bg-white p-6 shadow-sm mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="flex items-center gap-1 mt-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md w-fit">
              <Award size={14} />
              <span className="text-xs font-bold">{user.coins} TDEA Coins</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-100 rounded-full h-2 w-full mb-2 overflow-hidden">
          <div 
            className="bg-amber-500 h-full rounded-full transition-all duration-1000" 
            style={{ width: `${(user.coins % 1000) / 10}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-400 text-right">Próximo premio: {1000 - (user.coins % 1000)} coins más</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-200 mb-4">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'profile' ? 'border-tdea-orange text-tdea-orange' : 'border-transparent text-gray-500'}`}
        >
          Preferencias
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'history' ? 'border-tdea-orange text-tdea-orange' : 'border-transparent text-gray-500'}`}
        >
          Historial
        </button>
      </div>

      {activeTab === 'profile' ? (
        <div className="px-4 space-y-4">
          {/* Preferences Section */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Settings size={18} /> Preferencias Alimenticias
            </h3>
            <div className="flex flex-wrap gap-2">
              {['vegetariano', 'vegano', 'sin_gluten', 'sin_lacteos', 'diabetico'].map(r => (
                <button
                  key={r}
                  onClick={() => handleRestrictionToggle(r)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                    user.preferences.restrictions.includes(r)
                      ? 'bg-orange-50 border-tdea-orange text-tdea-orange'
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  {r.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Admin Link */}
          <div 
            onClick={() => navigate('/admin')}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50"
          >
             <div className="flex items-center gap-3 text-gray-700">
                <ShieldCheck size={20} />
                <span className="font-medium text-sm">Panel Administrativo</span>
             </div>
             <ChevronRight size={16} className="text-gray-400" />
          </div>

          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full bg-white text-red-500 p-4 rounded-xl shadow-sm font-medium flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="px-4 space-y-3">
           {user.history.length === 0 ? (
             <p className="text-center text-gray-500 py-8">No tienes pedidos recientes.</p>
           ) : (
             user.history.map(order => (
               <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm">
                 <div className="flex justify-between mb-2">
                    <span className="font-bold text-gray-800">Pedido {order.code}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Completado</span>
                 </div>
                 <p className="text-xs text-gray-500 mb-2">{new Date(order.date).toLocaleDateString()} - {order.pickupTime}</p>
                 <div className="border-t border-gray-100 pt-2">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{item.quantity}x {item.name}</span>
                        <span>${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold text-sm mt-2 text-tdea-orange">
                       <span>Total</span>
                       <span>${(order.total + 500).toLocaleString()}</span>
                    </div>
                 </div>
               </div>
             ))
           )}
        </div>
      )}
    </div>
  );
};

export default Profile;