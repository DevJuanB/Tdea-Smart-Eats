import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Lock, User, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && (name || !isRegister)) {
      login(name || 'Usuario', email);
      navigate('/');
    }
  };

  const handleGuest = () => {
    login('Invitado', 'guest@tdea.edu.co', true);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm text-center mb-8">
        <div className="w-20 h-20 bg-tdea-orange rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg rotate-3">
          <span className="text-4xl text-white font-bold">T</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">TDEA Eats Smart</h1>
        <p className="text-gray-500 text-sm">Tu comida favorita, sin filas.</p>
      </div>

      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isRegister ? 'bg-white text-tdea-orange shadow-sm' : 'text-gray-500'}`}
            onClick={() => setIsRegister(false)}
          >
            Ingresar
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isRegister ? 'bg-white text-tdea-orange shadow-sm' : 'text-gray-500'}`}
            onClick={() => setIsRegister(true)}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Nombre Completo"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-tdea-orange outline-none transition-all text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isRegister}
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
              type="email" 
              placeholder="Correo Institucional"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-tdea-orange outline-none transition-all text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
              type="password" 
              placeholder="Contraseña"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-tdea-orange outline-none transition-all text-sm"
            />
          </div>

          <button type="submit" className="w-full py-3.5 bg-tdea-orange text-white font-semibold rounded-xl shadow-lg shadow-orange-200 hover:bg-orange-600 active:scale-95 transition-all">
            {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-xs text-gray-400">O continúa con</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="space-y-3">
          <button type="button" className="w-full py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            <span className="text-sm font-medium text-gray-700">Google Institucional</span>
          </button>
          
          <button 
            type="button" 
            onClick={handleGuest}
            className="w-full py-2 text-gray-500 text-sm font-medium hover:text-tdea-orange transition-colors"
          >
            Continuar como invitado
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;