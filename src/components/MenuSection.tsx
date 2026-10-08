import React, { useState } from 'react';
import { Search, Flame, Sparkles, Star, Plus, Minus, Clock } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem } from '../types/restaurant';

export const MenuSection: React.FC = () => {
  const { menuItems, cart, addToCart, updateCartQuantity, setCustomizingItem, showToast } = useRestaurant();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpiceFilter, setSelectedSpiceFilter] = useState<number | 'all'>('all');
  const [onlySpecials, setOnlySpecials] = useState<boolean>(false);
  const [floatingMotion, setFloatingMotion] = useState<boolean>(true);

  const categories = [
    { id: 'all', label: 'All Delicacies', icon: '✨' },
    { id: 'dosas', label: 'Signature Dosas', icon: '🥞' },
    { id: 'tiffin', label: 'Idli & Vada Tiffin', icon: '🥟' },
    { id: 'thalis', label: 'Banana Leaf Thalis', icon: '🍃' },
    { id: 'curries', label: 'Chettinad Curries', icon: '🍲' },
    { id: 'rice', label: 'Rice & Parottas', icon: '🍛' },
    { id: 'beverages', label: 'Filter Kaapi & Sweets', icon: '☕' }
  ];

  const filteredItems = menuItems.filter(item => {
    if (activeCategory !== 'all' && item.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchTamil = item.tamilName?.toLowerCase().includes(q);
      const matchTags = item.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTamil && !matchTags) return false;
    }
    if (selectedSpiceFilter !== 'all' && item.spiceLevel !== selectedSpiceFilter) {
      return false;
    }
    if (onlySpecials && !item.isSpecial) {
      return false;
    }
    return true;
  });

  const handleAddItem = (item: MenuItem) => {
    if (!item.inStock) {
      showToast('This item is currently sold out for the day');
      return;
    }
    if (item.customizations) {
      setCustomizingItem(item);
    } else {
      addToCart(item, {}, 1);
    }
  };

  const handleIncrement = (item: MenuItem, existingCartItemId?: string) => {
    if (item.customizations) {
      setCustomizingItem(item);
    } else if (existingCartItemId) {
      updateCartQuantity(existingCartItemId, 1);
    } else {
      addToCart(item, {}, 1);
    }
  };

  const handleDecrement = (existingCartItemId?: string) => {
    if (existingCartItemId) {
      updateCartQuantity(existingCartItemId, -1);
    }
  };

  return (
    <section id="menu-section" className="py-12 sm:py-16 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold tracking-widest text-[#785E47] uppercase font-mono">
            STONE-GROUND BATTER · A2 DESI COW GHEE · HEIRLOOM RECIPES
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#262118] font-sans tracking-tight mt-1 uppercase">
            PARIMAS MENU
          </h2>
          <div className="w-12 h-1 bg-[#6E553E] mx-auto mt-2.5 rounded-full" />

          {/* Floating Animation Status Indicator */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE8DE]/90 backdrop-blur-md text-[#5A4533] text-xs font-bold font-mono shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Smooth Floating Menu Cards</span>
            </span>
            <button
              onClick={() => setFloatingMotion(!floatingMotion)}
              className="text-[11px] font-mono font-bold text-stone-500 hover:text-[#5A4533] underline cursor-pointer"
            >
              {floatingMotion ? 'Pause Float' : 'Resume Float'}
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-2.5 pb-2 mb-6">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer shrink-0 font-mono ${
                  isActive
                    ? 'bg-[#6E553E] text-white shadow-sm'
                    : 'bg-[#F2ECE3]/90 backdrop-blur-md text-stone-700 hover:bg-[#EAE2D5] hover:text-[#262118]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#FAF5EF]/90 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dosas, podi, thalis, filter kaapi..."
              className="w-full bg-[#EFE8DE] rounded-xl pl-9 pr-14 py-2 text-xs sm:text-sm text-[#262118] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#785E47]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-stone-400 hover:text-stone-600 text-xs font-mono absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto no-scrollbar">
            {/* Spice Filter */}
            <div className="flex items-center gap-1 bg-[#EFE8DE] p-1 rounded-xl text-xs font-semibold text-stone-700 shrink-0 font-mono">
              <span className="px-2 text-[#785E47] flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>Spice:</span>
              </span>
              {(['all', 1, 2, 3] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedSpiceFilter(lvl)}
                  className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer text-xs ${
                    selectedSpiceFilter === lvl
                      ? 'bg-white shadow-xs font-bold text-[#262118]'
                      : 'hover:text-stone-900'
                  }`}
                >
                  {lvl === 'all' ? 'All' : lvl === 1 ? 'Mild' : lvl === 2 ? 'Med' : 'Spicy'}
                </button>
              ))}
            </div>

            {/* Chef Specials Toggle */}
            <button
              onClick={() => setOnlySpecials(!onlySpecials)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 font-mono ${
                onlySpecials
                  ? 'bg-[#EAE0D3] text-[#4A3828]'
                  : 'bg-[#F2ECE3] text-stone-600 hover:bg-[#EAE2D5]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#785E47]" />
              <span>Specials</span>
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-xs font-mono font-bold text-[#785E47] uppercase tracking-wider">
            {filteredItems.length} {filteredItems.length === 1 ? 'Dish Available' : 'Dishes Available'}
          </span>
          <span className="text-[11px] font-mono text-stone-500">
            Pure Vegetarian · Desi Ghee
          </span>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF5EF]/90 rounded-2xl">
            <p className="text-stone-500 font-medium text-sm">No dishes match your selected filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedSpiceFilter('all');
                setOnlySpecials(false);
              }}
              className="mt-3 text-xs font-bold text-[#6E553E] underline cursor-pointer font-mono"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          /* Menu Items Display Style - Horizontal Split Layout with Smooth Floating Animation */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {filteredItems.map((item, idx) => {
              const cartEntries = cart.filter(ci => ci.item.id === item.id);
              const totalInCart = cartEntries.reduce((sum, ci) => sum + ci.quantity, 0);
              const firstCartItemId = cartEntries[0]?.cartItemId;
              const floatClass = floatingMotion
                ? idx % 3 === 0
                  ? 'animate-menu-float-1'
                  : idx % 3 === 1
                  ? 'animate-menu-float-2'
                  : 'animate-menu-float-3'
                : '';

              return (
                <div
                  key={item.id}
                  className={`bg-[#FAF5EF]/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex items-start justify-between gap-4 group pause-on-hover hover:-translate-y-2 ${floatClass}`}
                >
                  {/* Left Column: Dish Metadata, Typography & Details */}
                  <div className="flex-1 min-w-0 pr-1 sm:pr-2">
                    {/* Veg symbol & Badges */}
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      {/* Pure Veg Green Dot Box */}
                      <div className="w-4 h-4 rounded-xs border-2 border-emerald-600 bg-white flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      </div>

                      {item.isSpecial && (
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#4A3828] bg-[#EAE0D3] px-2 py-0.5 rounded-md font-mono">
                          ★ Bestseller
                        </span>
                      )}

                      {item.spiceLevel > 1 && (
                        <span className="text-[10px] text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded-md font-mono flex items-center gap-0.5">
                          <Flame className="w-3 h-3 text-amber-600 inline" />
                          <span>{item.spiceLevel === 3 ? 'Spicy' : 'Medium'}</span>
                        </span>
                      )}
                    </div>

                    {/* Dish Title */}
                    <h3 className="text-base sm:text-lg font-extrabold text-[#262118] font-sans tracking-tight leading-snug group-hover:text-[#6E553E] transition-colors">
                      {item.name}
                    </h3>

                    {/* Tamil Traditional Script Name */}
                    {item.tamilName && (
                      <p className="text-xs text-[#785E47] font-medium italic mt-0.5 font-sans">
                        {item.tamilName}
                      </p>
                    )}

                    {/* Pricing & Rating */}
                    <div className="flex items-center gap-2.5 mt-1.5 mb-2">
                      <span className="text-base sm:text-lg font-black text-[#262118] font-mono tabular-nums">
                        ₹{item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                          ₹{item.originalPrice}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-0.5 text-xs font-bold text-[#4A3828] bg-[#EAE0D3] px-1.5 py-0.5 rounded-md font-mono">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>4.8</span>
                      </span>
                    </div>

                    {/* Dish Description */}
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2 font-sans">
                      {item.description}
                    </p>

                    {/* Prep Time & Calories Metadata */}
                    <div className="flex items-center gap-3 mt-2.5 text-[11px] text-stone-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#785E47]" />
                        <span>{item.prepTimeMinutes} mins</span>
                      </span>
                      {item.calories && (
                        <>
                          <span>·</span>
                          <span>{item.calories} kcal</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Square Dish Photo with Overlapping ADD Button */}
                  <div className="relative shrink-0 flex flex-col items-center">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-stone-100 shadow-2xs relative">
                      <img
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80'}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] flex items-center justify-center text-white text-[10px] sm:text-xs font-bold uppercase font-mono tracking-wider">
                          Sold Out
                        </div>
                      )}
                    </div>

                    {/* Overlapping Action Button on bottom edge of photo */}
                    <div className="-mt-4 relative z-10 w-24 sm:w-28 text-center">
                      {totalInCart > 0 ? (
                        <div className="bg-[#FAF5EF] rounded-xl shadow-md py-1 px-1.5 flex items-center justify-between text-xs font-extrabold text-[#5A4533] font-mono">
                          <button
                            onClick={() => handleDecrement(firstCartItemId)}
                            className="w-6 h-6 hover:bg-[#EFE8DE] rounded-lg text-sm flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="tabular-nums px-1">{totalInCart}</span>
                          <button
                            onClick={() => handleIncrement(item, firstCartItemId)}
                            className="w-6 h-6 hover:bg-[#EFE8DE] rounded-lg text-sm flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddItem(item)}
                          disabled={!item.inStock}
                          className={`w-full py-1.5 px-3 rounded-xl shadow-md font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer font-mono active:scale-95 ${
                            item.inStock
                              ? 'bg-[#6E553E] hover:bg-[#584330] text-white'
                              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          }`}
                        >
                          <span>ADD</span>
                          <span className="text-base font-bold leading-none">+</span>
                        </button>
                      )}

                      {/* Customisable indicator */}
                      {item.customizations && (
                        <span className="block text-[10px] text-stone-500 font-mono mt-0.5 tracking-tight">
                          Customisable
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
