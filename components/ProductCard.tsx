import React from 'react';
import { Plus, Tag } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface Props {
  product: Product;
  compact?: boolean;
}

const ProductCard: React.FC<Props> = ({ product, compact = false }) => {
  const { addToCart } = useStore();
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full ${product.stock === 0 ? 'opacity-60 grayscale' : ''}`}>
      <div className={`relative ${compact ? 'h-28' : 'h-40'} w-full overflow-hidden`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute bottom-2 left-2 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-200">
            ¡Quedan {product.stock}!
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-sm uppercase tracking-wider">Agotado</span>
          </div>
        )}
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className={`font-semibold text-gray-800 leading-tight ${compact ? 'text-sm' : 'text-base'}`}>
            {product.name}
          </h3>
        </div>
        
        <p className="text-xs text-gray-500 line-clamp-2 mb-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded flex items-center">
              {tag.replace('_', ' ')}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through decoration-red-400">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="font-bold text-tdea-orange">
              ${product.price.toLocaleString()}
            </span>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={`p-2 rounded-full shadow-sm transition-colors ${
              product.stock === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-tdea-orange text-white hover:bg-orange-600 active:scale-95'
            }`}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;