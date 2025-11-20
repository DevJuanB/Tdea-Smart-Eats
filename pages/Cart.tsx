import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, Minus, Plus, Clock, CreditCard, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, placeOrder } = useStore();
  const navigate = useNavigate();
  const [pickupTime, setPickupTime] = useState('12:00');
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{code: string, coins: number} | null>(null);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Generate time slots from 11:30 to 14:30
  const timeSlots = [];
  let h = 11, m = 30;
  while (h < 14 || (h === 14 && m <= 30)) {
    timeSlots.push(`${h}:${m === 0 ? '00' : m}`);
    m += 15;
    if (m === 60) { m = 0; h++; }
  }

  const handlePayment = async () => {
    setIsOrdering(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    const result = placeOrder(pickupTime);
    if (result) {
      setOrderSuccess(result);
      toast.success('¡Pedido realizado con éxito!');
    }
    setIsOrdering(false);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 animate-fade-in">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-sm w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <QrCode className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pedido Confirmado!</h2>
          <p className="text-gray-500 mb-6">Muestra este código en la barra de Pickup Express.</p>
          
          <div className="bg-gray-100 p-4 rounded-xl mb-6 border border-dashed border-gray-300">
            <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Tu Código</span>
            <span className="text-3xl font-mono font-bold text-gray-800 tracking-widest">{orderSuccess.code}</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-yellow-600 bg-yellow-50 p-3 rounded-lg mb-6">
            <span className="text-xl">🪙</span>
            <span className="font-bold">+{orderSuccess.coins} Coins ganadas</span>
          </div>

          <button 
            onClick={() => { setOrderSuccess(null); navigate('/'); }}
            className="w-full py-3 bg-brand-green text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] p-6 text-center">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-4">
          <CreditCard className="text-brand-green/50" size={40} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-6 max-w-xs">Parece que aún no has elegido tu comida de hoy.</p>
        <button 
          onClick={() => navigate('/menu')}
          className="px-8 py-3 bg-brand-green text-white font-bold rounded-xl shadow-md hover:bg-green-700"
        >
          Ir al Menú
        </button>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-gray-50 min-h-screen animate-fade-in">
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Tu Pedido</h1>
      </div>

      <div className="p-4 space-y-4">
        {cart.map(item => (
          <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm flex gap-3 items-center">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-grow">
              <h3 className="font-semibold text-sm text-gray-800">{item.name}</h3>
              <p className="text-brand-green font-bold text-sm">${(item.price * item.quantity).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
              <button onClick={() => updateCartQuantity(item.id, -1)} className="p-1 hover:bg-white rounded-md transition-colors">
                <Minus size={14} className="text-gray-600" />
              </button>
              <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
              <button onClick={() => updateCartQuantity(item.id, 1)} className="p-1 hover:bg-white rounded-md transition-colors">
                <Plus size={14} className="text-gray-600" />
              </button>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-red-400 p-2">
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        {/* Time Selector */}
        <div className="bg-white p-4 rounded-xl shadow-sm mt-6">
          <div className="flex items-center gap-2 mb-3 text-gray-800 font-semibold">
            <Clock size={18} className="text-brand-green" />
            <h3>Hora de Recogida</h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map(time => (
              <button
                key={time}
                onClick={() => setPickupTime(time)}
                className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                  pickupTime === time 
                    ? 'bg-green-50 border-brand-green text-brand-green' 
                    : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-800">${total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-500">Servicio</span>
            <span className="text-gray-800">$500</span>
          </div>
          <div className="border-t border-gray-100 my-2 pt-2 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-brand-green">${(total + 500).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-16 left-0 w-full bg-white p-4 border-t border-gray-100 z-20">
        <button 
          onClick={handlePayment}
          disabled={isOrdering}
          className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70"
        >
          {isOrdering ? 'Procesando...' : (
            <>
              <CreditCard size={20} />
              Pagar con Nequi / Daviplata
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Cart;