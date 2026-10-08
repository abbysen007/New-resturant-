import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, Award, ArrowRight, ShoppingBag } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { OrderType } from '../types/restaurant';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    orderType,
    setOrderType,
    appliedPromo,
    applyPromo,
    removePromo,
    tipAmount,
    setTipAmount,
    redeemedPoints,
    setRedeemedPoints,
    loyaltyUser,
    cartTotals,
    setIsCheckoutOpen
  } = useRestaurant();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const maxRedeemablePoints = Math.min(loyaltyUser.points, Math.floor(cartTotals.subtotal * 0.4));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer content */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF5EF]/95 backdrop-blur-md shadow-2xl flex flex-col justify-between text-[#262118]">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-[#EFE8DE] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#6E553E] text-white flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#262118] font-sans">
                  Your Order Bag
                </h3>
                <p className="text-[11px] text-stone-500 font-medium font-mono">
                  {cart.length} {cart.length === 1 ? 'dish' : 'dishes'} selected
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] font-bold text-red-600 hover:text-red-700 px-2 py-1 font-mono"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-200/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs">
            {/* Order Type Toggle */}
            <div className="bg-[#EAE0D3] p-1 rounded-2xl flex items-center justify-between text-xs font-bold font-mono">
              {(['delivery', 'pickup', 'dine-in'] as OrderType[]).map(type => {
                const isActive = orderType === type;
                return (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`flex-1 py-2 rounded-xl transition-all capitalize cursor-pointer ${
                      isActive
                        ? 'bg-[#6E553E] text-white shadow-xs font-extrabold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {type === 'dine-in' ? 'Table' : type}
                  </button>
                );
              })}
            </div>

            {/* Empty state */}
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#EAE0D3] text-[#6E553E] flex items-center justify-center mx-auto text-2xl">
                  🥞
                </div>
                <h4 className="text-sm font-bold text-[#262118]">Your bag is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Add golden ghee roast dosas, steaming thatte idlis, or royal banana leaf thalis!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Cart Items List */}
                {cart.map((cartItem) => (
                  <div
                    key={cartItem.cartItemId}
                    className="p-3 bg-[#F2ECE3] rounded-2xl flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-xs border-2 border-emerald-600 flex items-center justify-center p-0.5 shrink-0 bg-white">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          </span>
                          <span className="font-bold text-[#262118] text-xs sm:text-sm font-sans">
                            {cartItem.item.name}
                          </span>
                        </div>
                        {cartItem.selectedSize && (
                          <div className="text-[11px] text-[#785E47] font-semibold mt-0.5 font-mono">
                            Size: {cartItem.selectedSize}
                          </div>
                        )}
                        {cartItem.selectedAccompaniments.length > 0 && (
                          <div className="text-[10px] text-stone-500">
                            + {cartItem.selectedAccompaniments.join(', ')}
                          </div>
                        )}
                        {cartItem.selectedSpice && (
                          <div className="text-[10px] text-stone-500">
                            Spice: {cartItem.selectedSpice}
                          </div>
                        )}
                        {cartItem.specialInstructions && (
                          <div className="text-[10px] text-[#785E47] italic">
                            Note: "{cartItem.specialInstructions}"
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-[#262118] text-sm font-mono tabular-nums">
                          ₹{cartItem.customPrice * cartItem.quantity}
                        </div>
                        <div className="text-[10px] text-stone-400 font-mono tabular-nums">
                          ₹{cartItem.customPrice} each
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper & Remove */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => removeFromCart(cartItem.cartItemId)}
                        className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2 bg-[#FAF5EF] rounded-lg p-0.5">
                        <button
                          onClick={() => updateCartQuantity(cartItem.cartItemId, -1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-[#EAE0D3] rounded"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center font-bold text-[#262118] font-mono">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(cartItem.cartItemId, 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-[#EAE0D3] rounded"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Input */}
                <div className="pt-2">
                  {appliedPromo ? (
                    <div className="bg-[#EAE0D3] p-2.5 rounded-xl flex items-center justify-between text-[#4A3828]">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-[#6E553E]" />
                        <span className="font-bold text-xs font-mono">{appliedPromo}</span>
                      </div>
                      <button
                        onClick={removePromo}
                        className="text-xs font-bold text-red-600 hover:text-red-700 underline font-mono"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Coupon (DOSALOVER / FIRST50)"
                          className="w-full bg-[#F2ECE3] rounded-xl px-3 py-2 text-stone-800 uppercase focus:outline-none focus:ring-1 focus:ring-[#785E47] font-mono text-xs"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-[#6E553E] hover:bg-[#584330] text-white font-bold px-4 py-2 rounded-xl font-mono"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-red-600 mt-1 font-mono">{promoError}</p>
                  )}
                </div>

                {/* Loyalty Points Redemption Slider */}
                {maxRedeemablePoints > 0 && (
                  <div className="p-3 bg-[#EFE8DE] rounded-2xl">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-[#4A3828] font-bold text-xs">
                        <Award className="w-4 h-4 text-[#785E47]" />
                        <span>PARIMAS Rewards</span>
                      </div>
                      <span className="text-xs text-[#6E553E] font-semibold font-mono">
                        Available: {loyaltyUser.points} pts
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <input
                        type="range"
                        min="0"
                        max={maxRedeemablePoints}
                        step="10"
                        value={redeemedPoints}
                        onChange={(e) => setRedeemedPoints(Number(e.target.value))}
                        className="flex-1 accent-[#6E553E] cursor-pointer"
                      />
                      <span className="font-extrabold text-[#262118] min-w-[50px] text-right font-mono tabular-nums">
                        -₹{redeemedPoints}
                      </span>
                    </div>
                  </div>
                )}

                {/* Delivery Tip Selector */}
                {orderType === 'delivery' && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider font-mono">
                      Tip Delivery Partner
                    </span>
                    <div className="flex items-center gap-2">
                      {[0, 20, 30, 50].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setTipAmount(amount)}
                          className={`flex-1 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer font-mono ${
                            tipAmount === amount
                              ? 'bg-[#6E553E] text-white'
                              : 'bg-[#F2ECE3] text-stone-700 hover:bg-[#EAE0D3]'
                          }`}
                        >
                          {amount === 0 ? 'None' : `₹${amount}`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bill Breakdown */}
                <div className="pt-3 space-y-1.5 text-stone-600 font-sans">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-stone-800 font-mono tabular-nums">₹{cartTotals.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span className="font-mono tabular-nums">₹{cartTotals.tax}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>
                        {cartTotals.deliveryFee === 0 ? (
                          <span className="text-emerald-700 font-bold font-mono">FREE (Above ₹400)</span>
                        ) : (
                          <span className="font-mono tabular-nums">₹{cartTotals.deliveryFee}</span>
                        )}
                      </span>
                    </div>
                  )}
                  {cartTotals.tip > 0 && (
                    <div className="flex justify-between">
                      <span>Delivery Tip</span>
                      <span className="font-mono tabular-nums">₹{cartTotals.tip}</span>
                    </div>
                  )}
                  {cartTotals.discount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-bold">
                      <span>Discounts & Points</span>
                      <span className="font-mono tabular-nums">-₹{cartTotals.discount}</span>
                    </div>
                  )}

                  <div className="pt-2 flex justify-between items-center text-sm font-extrabold text-[#262118]">
                    <span>To Pay</span>
                    <span className="text-base text-[#262118] font-mono tabular-nums">₹{cartTotals.total}</span>
                  </div>

                  <div className="text-[10px] text-[#4A3828] font-semibold flex items-center justify-between bg-[#EAE0D3] p-2 rounded-lg mt-2 font-mono">
                    <span>Points to earn on this order:</span>
                    <span className="font-bold">+{cartTotals.pointsToEarn} PARIMAS Pts</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer CTA */}
          {cart.length > 0 && (
            <div className="p-4 bg-[#EFE8DE]">
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-[#6E553E] hover:bg-[#584330] active:scale-98 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-between cursor-pointer"
              >
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-[#F2ECE3] font-mono">
                    {orderType} · Proceed
                  </div>
                  <div className="text-sm font-sans">Enter Delivery & Contact</div>
                </div>
                <div className="flex items-center gap-1.5 text-base font-mono">
                  <span>₹{cartTotals.total}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
