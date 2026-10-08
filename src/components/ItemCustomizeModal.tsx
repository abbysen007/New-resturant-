import React, { useState } from 'react';
import { X, Check, Flame, Plus, Minus } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem } from '../types/restaurant';

interface ItemCustomizeModalDialogProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    customization: {
      size?: string;
      spice?: string;
      accompaniments: string[];
      specialInstructions?: string;
    },
    quantity: number
  ) => void;
}

const ItemCustomizeModalDialog: React.FC<ItemCustomizeModalDialogProps> = ({
  item,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>(
    item.customizations?.sizes?.[0]?.name || ''
  );
  const [selectedSpice, setSelectedSpice] = useState<string>(
    item.customizations?.spiceLevels?.[0] || 'Traditional Medium'
  );
  const [selectedAccompaniments, setSelectedAccompaniments] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  const toggleAccompaniment = (name: string) => {
    setSelectedAccompaniments(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  // Calculate customized total price
  let basePrice = item.price;
  if (selectedSize && item.customizations?.sizes) {
    const sizeObj = item.customizations.sizes.find(s => s.name === selectedSize);
    if (sizeObj) basePrice += sizeObj.priceDelta;
  }
  selectedAccompaniments.forEach(acc => {
    const accObj = item.customizations?.accompaniments?.find(a => a.name === acc);
    if (accObj) basePrice += accObj.priceDelta;
  });
  const totalPrice = basePrice * quantity;

  const handleAdd = () => {
    onAddToCart(
      item,
      {
        size: selectedSize || undefined,
        spice: selectedSpice,
        accompaniments: selectedAccompaniments,
        specialInstructions: specialInstructions.trim() || undefined
      },
      quantity
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF5EF]/95 backdrop-blur-md rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-[#262118]">
        {/* Header */}
        <div className="p-5 flex items-start justify-between bg-[#EFE8DE]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-xs border-2 border-emerald-600 flex items-center justify-center p-0.5 bg-white">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              </span>
              <h3 className="text-lg font-extrabold text-[#262118] font-sans">
                Customize {item.name}
              </h3>
            </div>
            {item.tamilName && (
              <p className="text-xs text-[#785E47] font-medium italic mt-0.5 font-sans">
                {item.tamilName}
              </p>
            )}
            <p className="text-xs text-stone-500 mt-1 line-clamp-2">
              {item.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Customization Options */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Sizes / Crust Style */}
          {item.customizations?.sizes && item.customizations.sizes.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#262118] mb-2.5 font-mono">
                Select Size & Style
              </h4>
              <div className="space-y-2">
                {item.customizations.sizes.map(size => {
                  const isSelected = selectedSize === size.name;
                  return (
                    <label
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#EAE0D3] shadow-xs'
                          : 'bg-[#F2ECE3] hover:bg-[#EAE0D3]/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-[#6E553E]' : 'bg-stone-300'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="font-semibold text-stone-800 font-sans">{size.name}</span>
                      </div>
                      <span className="text-xs font-bold text-stone-600 font-mono">
                        {size.priceDelta > 0 ? `+₹${size.priceDelta}` : 'Included'}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spice Levels */}
          {item.customizations?.spiceLevels && item.customizations.spiceLevels.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#262118] mb-2.5 flex items-center gap-1.5 font-mono">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>Spice Level</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {item.customizations.spiceLevels.map(lvl => {
                  const isSelected = selectedSpice === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedSpice(lvl)}
                      className={`p-2.5 rounded-xl text-center text-xs font-bold transition-all cursor-pointer font-mono ${
                        isSelected
                          ? 'bg-[#6E553E] text-white shadow-xs'
                          : 'bg-[#F2ECE3] text-stone-700 hover:bg-[#EAE0D3]'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Accompaniments & Extra Add-ons */}
          {item.customizations?.accompaniments && item.customizations.accompaniments.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#262118] mb-2.5 font-mono">
                Extra Accompaniments & Chutneys
              </h4>
              <div className="space-y-2">
                {item.customizations.accompaniments.map(acc => {
                  const isChecked = selectedAccompaniments.includes(acc.name);
                  return (
                    <label
                      key={acc.name}
                      onClick={() => toggleAccompaniment(acc.name)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#EAE0D3]'
                          : 'bg-[#F2ECE3] hover:bg-[#EAE0D3]/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center ${
                            isChecked ? 'bg-[#6E553E] text-white' : 'bg-stone-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-medium text-stone-800 font-sans">{acc.name}</span>
                      </div>
                      <span className="text-xs font-bold text-stone-600 font-mono">
                        {acc.priceDelta > 0 ? `+₹${acc.priceDelta}` : 'Free'}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Kitchen Cooking Notes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#262118] mb-1.5 font-mono">
              Special Kitchen Instructions
            </h4>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra crispy on edges, less oil, keep sambar hot"
              className="w-full text-xs bg-[#F2ECE3] rounded-xl px-3 py-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#785E47]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#EFE8DE] flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2 bg-[#FAF5EF] rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-600 hover:bg-[#EAE0D3] disabled:opacity-40 cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-bold text-[#262118] text-sm font-mono">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-600 hover:bg-[#EAE0D3] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAdd}
            className="flex-1 bg-[#6E553E] hover:bg-[#584330] active:scale-98 text-white font-bold py-3 px-6 rounded-2xl shadow-md transition-all flex items-center justify-between cursor-pointer font-mono"
          >
            <span className="text-xs uppercase tracking-wider">Add to Order</span>
            <span className="text-sm font-extrabold tabular-nums">₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const ItemCustomizeModal: React.FC = () => {
  const { customizingItem, setCustomizingItem, addToCart } = useRestaurant();

  if (!customizingItem) return null;

  return (
    <ItemCustomizeModalDialog
      key={customizingItem.id}
      item={customizingItem}
      onClose={() => setCustomizingItem(null)}
      onAddToCart={addToCart}
    />
  );
};
