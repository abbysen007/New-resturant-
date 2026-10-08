import React, { useState } from 'react';
import { X, MapPin, Phone, User, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsPaymentOpen,
    orderType,
    cartTotals,
    selectedOutlet,
    deliveryAreaSearch
  } = useRestaurant();

  const [name, setName] = useState('Ananya Raghavan');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('ananya.r@example.com');
  const [address, setAddress] = useState('Flat 402, Shanthi Nilayam, 12th Main Road');
  const [area, setArea] = useState(deliveryAreaSearch || 'Indiranagar');
  const [tableNumber, setTableNumber] = useState('Table 06');
  const [instructions, setInstructions] = useState('Leave with security or ring bell once');

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save customer details in window/temp or pass to Payment
    window.sessionStorage.setItem(
      'dakshin_pending_customer',
      JSON.stringify({
        name,
        phone,
        email,
        address: orderType === 'delivery' ? address : undefined,
        area: orderType === 'delivery' ? area : undefined,
        tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
        instructions
      })
    );
    setIsCheckoutOpen(false);
    setIsPaymentOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="bg-[#FAF5EF]/95 backdrop-blur-md rounded-3xl max-w-lg w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl text-[#262118]">
        {/* Header */}
        <div className="p-5 bg-[#EFE8DE] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#785E47] uppercase font-mono">
              STEP 1 OF 2 · CHECKOUT DETAILS
            </span>
            <h3 className="text-lg font-extrabold text-[#262118] font-sans">
              {orderType === 'delivery'
                ? 'Delivery Address & Contact'
                : orderType === 'dine-in'
                ? 'Dine-In Table Details'
                : 'Takeaway Pickup Details'}
            </h3>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#262118] flex items-center gap-1.5 font-mono">
              <User className="w-3.5 h-3.5 text-[#6E553E]" />
              <span>Contact Information</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F2ECE3] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#785E47]"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1 font-mono">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F2ECE3] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#785E47] font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Email Receipt Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F2ECE3] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#785E47]"
              />
            </div>
          </div>

          {/* Location Specific Fields */}
          {orderType === 'delivery' && (
            <div className="space-y-3 pt-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#262118] flex items-center gap-1.5 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#6E553E]" />
                <span>Delivery Location</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Area / Locality</label>
                  <input
                    type="text"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-[#F2ECE3] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#785E47]"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Kitchen Outlet Serving</label>
                  <input
                    type="text"
                    disabled
                    value={`${selectedOutlet.name} (${selectedOutlet.city})`}
                    className="w-full bg-[#EAE0D3] rounded-xl px-3 py-2 text-stone-700 cursor-not-allowed font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Complete Street / Flat / House Address</label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#F2ECE3] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#785E47]"
                />
              </div>
            </div>
          )}

          {orderType === 'dine-in' && (
            <div className="space-y-3 pt-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#262118] font-mono">
                Table Identification
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Table Number</label>
                  <input
                    type="text"
                    required
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="e.g. Table 04, Hall B"
                    className="w-full bg-[#F2ECE3] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#785E47] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Dining Section</label>
                  <select className="w-full bg-[#F2ECE3] rounded-xl px-3 py-2 text-[#262118]">
                    <option>Traditional Banana Leaf Hall</option>
                    <option>AC Family Courtyard</option>
                    <option>Express Tiffin Counter</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Delivery / Prep Notes */}
          <div className="pt-2">
            <label className="block text-stone-700 font-semibold mb-1">
              Delivery or Gate Drop Instructions
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Ring doorbell, do not honk"
              className="w-full bg-[#F2ECE3] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#785E47]"
            />
          </div>

          <div className="pt-4 flex items-center justify-between text-stone-500">
            <span className="flex items-center gap-1.5 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Contact details used strictly for order tracking</span>
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="px-4 py-3 rounded-2xl bg-[#EFE8DE] font-bold text-stone-700 hover:bg-[#E5DCD0] font-mono"
            >
              Back to Bag
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#6E553E] hover:bg-[#584330] text-white font-extrabold py-3 px-6 rounded-2xl shadow-md flex items-center justify-between cursor-pointer"
            >
              <span>Continue to Payment</span>
              <div className="flex items-center gap-1 font-mono">
                <span>₹{cartTotals.total}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
