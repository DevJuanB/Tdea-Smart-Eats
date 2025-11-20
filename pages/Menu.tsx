import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { FilterType } from '../types';

const Menu: React.FC = () => {
  const { products } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Todos', 'Desayunos', 'Almuerzos', 'Bebidas', 'Snacks', 'Saludables'];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => !p.isRescue); // Don't show rescue items in main menu

    if (activeCategory !== 'Todos') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    switch (activeFilter) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'healthy':
        filtered = filtered.filter(p => p.tags.includes('saludable'));
        break;
      case 'vegan':
        filtered = filtered.filter(p => p.tags.includes('vegano'));
        break;
      case 'gluten_free':
        filtered = filtered.filter(p => p.tags.includes('sin_gluten'));
        break;
    }

    return filtered;
  }, [products, activeCategory, searchQuery, activeFilter]);

  return (
    <div className="pb-24 bg-gray-50 min-h-screen animate-fade-in">
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 shadow-sm">
        <div className="p-4 pb-2">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Menú</h1>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Buscar comida, bebida..."
              className="w-full pl-10 pr-12 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-2 top-1.5 p-1.5 rounded-lg ${showFilters ? 'bg-brand-green text-white' : 'bg-white text-gray-500'}`}
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>
          
          {showFilters && (
            <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar pb-1">
               <FilterChip label="Más Barato" active={activeFilter === 'price_low'} onClick={() => setActiveFilter('price_low')} />
               <FilterChip label="Saludable" active={activeFilter === 'healthy'} onClick={() => setActiveFilter('healthy')} />
               <FilterChip label="Vegano" active={activeFilter === 'vegan'} onClick={() => setActiveFilter('vegan')} />
               <FilterChip label="Sin Gluten" active={activeFilter === 'gluten_free'} onClick={() => setActiveFilter('gluten_free')} />
               <FilterChip label="Reset" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-100 px-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-3 px-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeCategory === cat 
                  ? 'border-brand-green text-brand-green' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-2 py-10 text-center">
            <p className="text-gray-500">No encontramos productos :(</p>
            <button onClick={() => {setSearchQuery(''); setActiveFilter('all');}} className="mt-2 text-brand-green font-medium text-sm">Limpiar filtros</button>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterChip = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
      active ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-600 border border-gray-200'
    }`}
  >
    {label}
  </button>
);

export default Menu;