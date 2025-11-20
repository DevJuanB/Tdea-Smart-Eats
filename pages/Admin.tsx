import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, Edit2 } from 'lucide-react';

const Admin: React.FC = () => {
  const { products, updateProductStock } = useStore();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Lock className="text-tdea-orange" /> Acceso Cajera/Admin
          </h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-tdea-orange"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mb-4">Contraseña incorrecta</p>}
            <div className="flex gap-3">
                <button type="button" onClick={() => navigate('/profile')} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold">
                    Volver
                </button>
                <button type="submit" className="flex-1 py-3 bg-tdea-orange text-white rounded-lg font-semibold">
                    Ingresar
                </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gray-900 text-white p-4 sticky top-0 z-10 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
           <button onClick={() => navigate('/profile')}><ArrowLeft size={20} /></button>
           <h1 className="text-lg font-bold">Gestión de Inventario</h1>
        </div>
        <div className="text-xs bg-gray-800 px-2 py-1 rounded">Modo Admin</div>
      </div>

      <div className="p-4 space-y-3">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
               <img src={product.image} alt="" className="w-10 h-10 rounded object-cover bg-gray-200" />
               <div>
                 <h3 className="font-semibold text-sm text-gray-800">{product.name}</h3>
                 <p className={`text-xs font-medium ${product.stock < 5 ? 'text-red-500' : 'text-green-600'}`}>
                   Stock actual: {product.stock}
                 </p>
               </div>
            </div>
            
            <div className="flex items-center gap-2">
               <button 
                 onClick={() => updateProductStock(product.id, Math.max(0, product.stock - 1))}
                 className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-200"
               >
                 -
               </button>
               <span className="w-8 text-center font-mono">{product.stock}</span>
               <button 
                 onClick={() => updateProductStock(product.id, product.stock + 1)}
                 className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-200"
               >
                 +
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;