import React, { useState } from 'react';
import { 
  X, 
  User, 
  MapPin, 
  Clock, 
  Award, 
  Tag, 
  Heart, 
  Phone, 
  Mail, 
  Edit3, 
  Check, 
  Plus, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  Headphones, 
  RotateCcw,
  Leaf,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const UserPanel: React.FC = () => {
  const {
    isUserPanelOpen,
    setIsUserPanelOpen,
    loyaltyUser,
    setIsLoyaltyOpen,
    orders,
    addToCart,
    menuItems,
    setIsCartOpen,
    setIsTrackingOpen,
    applyPromo,
    showToast,
    setDeliveryAreaSearch
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'preferences' | 'offers' | 'support'>('orders');

  // User Profile State
  const [userName, setUserName] = useState<string>('Aravind Sundaram');
  const [userPhone, setUserPhone] = useState<string>('+91 98450 88219');
  const [userEmail, setUserEmail] = useState<string>('aravind.s@gmail.com');
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);

  // Saved Addresses
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-home',
      label: 'Home',
      street: 'Flat 402, Palm Meadows, 100ft Road',
      area: 'Indiranagar',
      city: 'Bengaluru',
      pincode: '560038',
      isDefault: true
    },
    {
      id: 'addr-work',
      label: 'Office',
      street: 'Tower B - 4th Floor, RMZ Infinity, Old Madras Road',
      area: 'Bennigana Halli',
      city: 'Bengaluru',
      pincode: '560016',
      isDefault: false
    },
    {
      id: 'addr-parents',
      label: 'Family Home',
      street: 'Sita Nivas, 4th Main, 15th Cross',
      area: 'Malleshwaram',
      city: 'Bengaluru',
      pincode: '560003',
      isDefault: false
    }
  ]);

  const [newAddrLabel, setNewAddrLabel] = useState('Other');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrArea, setNewAddrArea] = useState('');
  const [isAddingAddr, setIsAddingAddr] = useState(false);

  // Diner Preferences
  const [spicePreference, setSpicePreference] = useState<'mild' | 'medium' | 'spicy'>('medium');
  const [isJainOption, setIsJainOption] = useState<boolean>(false);
  const [noPlasticCutlery, setNoPlasticCutlery] = useState<boolean>(true);
  const [extraChutneyPreference, setExtraChutneyPreference] = useState<boolean>(true);

  if (!isUserPanelOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    showToast('Profile details updated successfully');
  };

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrStreet.trim() || !newAddrArea.trim()) {
      showToast('Please enter complete street and area');
      return;
    }
    const newAddress = {
      id: `addr-${Date.now()}`,
      label: newAddrLabel,
      street: newAddrStreet,
      area: newAddrArea,
      city: 'Bengaluru',
      pincode: '560001',
      isDefault: false
    };
    setAddresses(prev => [...prev, newAddress]);
    setNewAddrStreet('');
    setNewAddrArea('');
    setIsAddingAddr(false);
    showToast('New address added to your profile');
  };

  const handleSelectAddressForDelivery = (addr: typeof addresses[0]) => {
    setDeliveryAreaSearch(`${addr.area}, ${addr.city}`);
    showToast(`Delivery location set to: ${addr.label} (${addr.area})`);
  };

  const handleReorder = (orderItems: typeof orders[0]['items']) => {
    if (!orderItems || orderItems.length === 0) return;
    orderItems.forEach(cartItem => {
      addToCart(cartItem.item, {
        size: cartItem.selectedSize,
        spice: cartItem.selectedSpice,
        accompaniments: cartItem.selectedAccompaniments
      }, cartItem.quantity);
    });
    setIsUserPanelOpen(false);
    setIsCartOpen(true);
    showToast('Previous order items added to bag!');
  };

  const handleApplyCoupon = (code: string) => {
    const res = applyPromo(code);
    showToast(res.message);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={() => setIsUserPanelOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF5EF]/95 backdrop-blur-md shadow-2xl flex flex-col text-[#262118] relative z-10 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 bg-[#3A2E24] text-[#FAF5EF] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#594433] to-[#3A2E24] flex items-center justify-center font-extrabold text-[#FAF5EF] text-base shadow-inner font-mono">
                AS
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-extrabold font-sans tracking-tight text-[#FAF5EF]">
                    {userName}
                  </h2>
                  <span className="text-[10px] bg-amber-400 text-stone-950 font-black px-1.5 py-0.2 rounded font-mono uppercase tracking-wider">
                    GOLD
                  </span>
                </div>
                <p className="text-xs text-[#D2BBA0] font-mono">
                  #PAR-88219 · {userPhone}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsUserPanelOpen(false)}
              className="p-2 text-[#D2BBA0] hover:text-[#FAF5EF] hover:bg-[#4E3E32] rounded-xl transition-colors cursor-pointer"
              aria-label="Close User Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Stats: Wallet Points & Orders Count */}
          <div className="bg-[#F3ECE2] p-4 grid grid-cols-3 gap-2 text-center">
            <div 
              onClick={() => {
                setIsUserPanelOpen(false);
                setIsLoyaltyOpen(true);
              }}
              className="p-2.5 rounded-xl bg-[#FAF5EF] cursor-pointer transition-colors shadow-2xs"
            >
              <span className="text-[10px] text-stone-500 font-mono block uppercase">
                Loyalty Pts
              </span>
              <span className="text-base font-black text-[#262118] font-mono tabular-nums">
                {loyaltyUser.points}
              </span>
              <span className="text-[9px] text-[#785E47] font-bold block font-mono">
                ₹{loyaltyUser.points} value
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF5EF] shadow-2xs">
              <span className="text-[10px] text-stone-500 font-mono block uppercase">
                Past Orders
              </span>
              <span className="text-base font-black text-[#262118] font-mono tabular-nums">
                {orders.length > 0 ? orders.length + 8 : 12}
              </span>
              <span className="text-[9px] text-stone-500 font-mono block">
                All delivered
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF5EF] shadow-2xs">
              <span className="text-[10px] text-stone-500 font-mono block uppercase">
                Tier Status
              </span>
              <span className="text-xs font-black text-amber-700 font-mono block mt-1">
                Gold Patron
              </span>
              <span className="text-[9px] text-[#785E47] font-bold block font-mono">
                Free Delivery
              </span>
            </div>
          </div>

          {/* Panel Navigation Tabs */}
          <div className="flex bg-[#EAE0D3] text-xs font-bold text-[#594433] overflow-x-auto no-scrollbar font-mono">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3 px-3.5 shrink-0 transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'text-[#262118] bg-[#FAF5EF] font-extrabold'
                  : 'hover:text-[#262118]'
              }`}
            >
              Recent Orders
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`py-3 px-3.5 shrink-0 transition-colors cursor-pointer ${
                activeTab === 'addresses'
                  ? 'text-[#262118] bg-[#FAF5EF] font-extrabold'
                  : 'hover:text-[#262118]'
              }`}
            >
              Addresses
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`py-3 px-3.5 shrink-0 transition-colors cursor-pointer ${
                activeTab === 'preferences'
                  ? 'text-[#262118] bg-[#FAF5EF] font-extrabold'
                  : 'hover:text-[#262118]'
              }`}
            >
              Taste Prefs
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`py-3 px-3.5 shrink-0 transition-colors cursor-pointer ${
                activeTab === 'offers'
                  ? 'text-[#262118] bg-[#FAF5EF] font-extrabold'
                  : 'hover:text-[#262118]'
              }`}
            >
              Coupons
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`py-3 px-3.5 shrink-0 transition-colors cursor-pointer ${
                activeTab === 'support'
                  ? 'text-[#262118] bg-[#FAF5EF] font-extrabold'
                  : 'hover:text-[#262118]'
              }`}
            >
              Help
            </button>
          </div>

          {/* Tab Content Body (Scrollable, no scrollbars) */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4">
            
            {/* TAB 1: RECENT ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#785E47] font-mono">
                    Order History & Quick Reorder
                  </h3>
                  <button
                    onClick={() => {
                      setIsUserPanelOpen(false);
                      setIsTrackingOpen(true);
                    }}
                    className="text-[11px] font-bold text-[#785E47] underline font-mono cursor-pointer"
                  >
                    Live Tracker ➔
                  </button>
                </div>

                {/* Demonstration historical order 1 */}
                <div className="bg-[#F3ECE2] rounded-2xl p-4 shadow-2xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black font-mono text-[#262118]">
                          #PAR-77821
                        </span>
                        <span className="text-[10px] bg-[#EAE0D3] text-[#785E47] font-bold px-1.5 py-0.2 rounded font-mono">
                          Delivered
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500 font-mono">
                        Yesterday, 8:45 PM · Indiranagar Hub
                      </span>
                    </div>

                    <span className="text-sm font-black font-mono text-[#262118]">
                      ₹365
                    </span>
                  </div>

                  <div className="text-xs text-[#3A2E24] font-sans py-2 space-y-1">
                    <div className="flex justify-between">
                      <span>2x Heritage Ghee Roast Dosa</span>
                      <span className="font-mono text-stone-500">₹240</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1x Tiffin Medu Vada (Sambar Dip)</span>
                      <span className="font-mono text-stone-500">₹60</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1x Kumbakonam Degree Filter Kaapi</span>
                      <span className="font-mono text-stone-500">₹65</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-stone-400 font-mono">
                      Paid via UPI · ⭐ 5-Star Rated
                    </span>
                    <button
                      onClick={() => {
                        const dosa = menuItems.find(it => it.id === 'dosa-heritage-ghee-roast') || menuItems[0];
                        const kaapi = menuItems.find(it => it.id === 'bev-kumbakonam-degree-kaapi') || menuItems[1];
                        addToCart(dosa, {}, 1);
                        addToCart(kaapi, {}, 1);
                        setIsUserPanelOpen(false);
                        setIsCartOpen(true);
                        showToast('Reordered dishes added to bag!');
                      }}
                      className="bg-[#785E47] hover:bg-[#604936] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-mono cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reorder</span>
                    </button>
                  </div>
                </div>

                {/* Demonstration historical order 2 */}
                <div className="bg-[#F3ECE2] rounded-2xl p-4 shadow-2xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black font-mono text-[#262118]">
                          #PAR-77402
                        </span>
                        <span className="text-[10px] bg-[#EAE0D3] text-[#785E47] font-bold px-1.5 py-0.2 rounded font-mono">
                          Delivered
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500 font-mono">
                        Oct 04, 1:15 PM · Koramangala Hub
                      </span>
                    </div>

                    <span className="text-sm font-black font-mono text-[#262118]">
                      ₹480
                    </span>
                  </div>

                  <div className="text-xs text-[#3A2E24] font-sans py-2 space-y-1">
                    <div className="flex justify-between">
                      <span>1x Grand Banana Leaf Royal Thali</span>
                      <span className="font-mono text-stone-500">₹320</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1x Guntur Podi Thatte Idli</span>
                      <span className="font-mono text-stone-500">₹95</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1x Jigarthanda Royale</span>
                      <span className="font-mono text-stone-500">₹65</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-stone-400 font-mono">
                      Paid via Credit Card
                    </span>
                    <button
                      onClick={() => {
                        const thali = menuItems.find(it => it.id === 'thali-grand-royal-banana-leaf') || menuItems[0];
                        addToCart(thali, {}, 1);
                        setIsUserPanelOpen(false);
                        setIsCartOpen(true);
                        showToast('Reordered dishes added to bag!');
                      }}
                      className="bg-[#785E47] hover:bg-[#604936] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-mono cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reorder</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#785E47] font-mono">
                    Saved Delivery Locations
                  </h3>
                  <button
                    onClick={() => setIsAddingAddr(!isAddingAddr)}
                    className="text-xs font-bold text-[#785E47] flex items-center gap-1 font-mono cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New</span>
                  </button>
                </div>

                {isAddingAddr && (
                  <form onSubmit={handleAddNewAddress} className="bg-[#F3ECE2] p-3.5 rounded-2xl space-y-3">
                    <div className="flex gap-2">
                      {['Home', 'Work', 'Other'].map(lbl => (
                        <button
                          type="button"
                          key={lbl}
                          onClick={() => setNewAddrLabel(lbl)}
                          className={`text-xs font-bold px-3 py-1 rounded-lg font-mono ${
                            newAddrLabel === lbl ? 'bg-[#785E47] text-white' : 'bg-[#FAF5EF] text-[#3A2E24]'
                          }`}
                        >
                          {lbl}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Flat / House / Building details"
                      value={newAddrStreet}
                      onChange={(e) => setNewAddrStreet(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl bg-[#FAF5EF] text-[#262118] focus:outline-none focus:ring-1 focus:ring-[#785E47]"
                    />
                    <input
                      type="text"
                      placeholder="Area / Neighborhood (e.g. Indiranagar)"
                      value={newAddrArea}
                      onChange={(e) => setNewAddrArea(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl bg-[#FAF5EF] text-[#262118] focus:outline-none focus:ring-1 focus:ring-[#785E47]"
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        type="submit"
                        className="flex-1 bg-[#785E47] text-white text-xs font-bold py-2 rounded-xl font-mono cursor-pointer"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingAddr(false)}
                        className="px-3 text-xs text-stone-500 font-mono"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-2.5">
                  {addresses.map(addr => (
                    <div
                      key={addr.id}
                      className="bg-[#F3ECE2] p-3.5 rounded-2xl hover:bg-[#EAE0D3] transition-all flex items-start justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#EAE0D3] text-[#785E47] flex items-center justify-center shrink-0 mt-0.5">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-[#262118] font-sans">
                              {addr.label}
                            </span>
                            {addr.isDefault && (
                              <span className="text-[9px] bg-[#EAE0D3] text-[#785E47] font-bold px-1.5 py-0.2 rounded font-mono">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#3A2E24] mt-0.5 font-sans leading-snug">
                            {addr.street}, {addr.area}, {addr.city} - {addr.pincode}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectAddressForDelivery(addr)}
                        className="text-[11px] font-bold text-[#785E47] bg-[#FAF5EF] hover:bg-[#EAE0D3] px-2.5 py-1 rounded-lg font-mono shrink-0 cursor-pointer"
                      >
                        Deliver Here
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: TASTE & DINING PREFERENCES */}
            {activeTab === 'preferences' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#785E47] font-mono">
                  Kitchen Customizations & Taste
                </h3>

                {/* Pure Veg Banner */}
                <div className="bg-[#F3ECE2] p-3.5 rounded-2xl flex items-center gap-3">
                  <div className="w-5 h-5 rounded-xs bg-[#FAF5EF] flex items-center justify-center shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#785E47]" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#262118] font-sans block">
                      100% Pure Vegetarian Kitchen
                    </span>
                    <span className="text-[11px] text-[#3A2E24] font-sans">
                      All foods prepared with dedicated A2 desi ghee & wood-pressed sesame oil.
                    </span>
                  </div>
                </div>

                {/* Spice Tolerance */}
                <div className="bg-[#F3ECE2] p-4 rounded-2xl space-y-2">
                  <label className="text-xs font-bold text-[#262118] font-mono block">
                    Default Spice Tolerance
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['mild', 'medium', 'spicy'] as const).map(sp => (
                      <button
                        key={sp}
                        onClick={() => {
                          setSpicePreference(sp);
                          showToast(`Spice preference set to ${sp.toUpperCase()}`);
                        }}
                        className={`py-2 rounded-xl text-xs font-bold capitalize font-mono transition-all ${
                          spicePreference === sp
                            ? 'bg-[#785E47] text-white shadow-xs'
                            : 'bg-[#FAF5EF] text-[#3A2E24] hover:bg-[#EAE0D3]'
                        }`}
                      >
                        {sp === 'mild' ? '🌱 Mild' : sp === 'medium' ? '🌶️ Medium' : '🔥 Traditional'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Switches */}
                <div className="space-y-2.5">
                  <div 
                    onClick={() => {
                      setIsJainOption(!isJainOption);
                      showToast(isJainOption ? 'Jain preference disabled' : 'Jain (No Onion/Garlic) preference enabled');
                    }}
                    className="p-3.5 bg-[#F3ECE2] rounded-2xl flex items-center justify-between cursor-pointer hover:bg-[#EAE0D3]"
                  >
                    <div>
                      <span className="text-xs font-bold text-[#262118] block font-sans">
                        Jain Friendly (No Onion, No Garlic)
                      </span>
                      <span className="text-[11px] text-stone-500 font-sans">
                        Use hing, ginger and raw banana for gravies
                      </span>
                    </div>
                    <div className={`w-10 h-6 rounded-full p-1 transition-colors ${isJainOption ? 'bg-[#785E47]' : 'bg-stone-300'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isJainOption ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                  </div>

                  <div 
                    onClick={() => {
                      setNoPlasticCutlery(!noPlasticCutlery);
                      showToast(noPlasticCutlery ? 'Cutlery will be included' : 'Eco-friendly mode: No plastic cutlery');
                    }}
                    className="p-3.5 bg-[#F3ECE2] rounded-2xl flex items-center justify-between cursor-pointer hover:bg-[#EAE0D3]"
                  >
                    <div>
                      <span className="text-xs font-bold text-[#262118] block font-sans">
                        Eco-Friendly Delivery (No Plastic Cutlery)
                      </span>
                      <span className="text-[11px] text-stone-500 font-sans">
                        Help us reduce waste; banana leaf liners provided
                      </span>
                    </div>
                    <div className={`w-10 h-6 rounded-full p-1 transition-colors ${noPlasticCutlery ? 'bg-[#785E47]' : 'bg-stone-300'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${noPlasticCutlery ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                  </div>

                  <div 
                    onClick={() => {
                      setExtraChutneyPreference(!extraChutneyPreference);
                      showToast('Chutney preference saved');
                    }}
                    className="p-3.5 bg-[#F3ECE2] rounded-2xl flex items-center justify-between cursor-pointer hover:bg-[#EAE0D3]"
                  >
                    <div>
                      <span className="text-xs font-bold text-[#262118] block font-sans">
                        Extra Chutney & Sambar Lover
                      </span>
                      <span className="text-[11px] text-stone-500 font-sans">
                        Automatically include generous portion of fresh coconut chutney
                      </span>
                    </div>
                    <div className={`w-10 h-6 rounded-full p-1 transition-colors ${extraChutneyPreference ? 'bg-[#785E47]' : 'bg-stone-300'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${extraChutneyPreference ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: OFFERS & COUPONS */}
            {activeTab === 'offers' && (
              <div className="space-y-3.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#785E47] font-mono">
                  Active PARIMAS Rewards Coupons
                </h3>

                {[
                  {
                    code: 'PARIMASGOLD',
                    desc: '20% Flat Discount on all signature dosas & tiffins',
                    validity: 'Valid on orders above ₹299',
                    tag: 'MEMBER EXCLUSIVE'
                  },
                  {
                    code: 'KAAPILOVE',
                    desc: 'Complimentary Kumbakonam Degree Filter Kaapi',
                    validity: 'Valid on orders above ₹199',
                    tag: 'CHEF FAVORITE'
                  },
                  {
                    code: 'FIRSTDOSA',
                    desc: 'Flat ₹75 Off on your authentic ghee roast order',
                    validity: 'Valid once per customer',
                    tag: 'WELCOME REWARD'
                  }
                ].map(coupon => (
                  <div 
                    key={coupon.code}
                    className="bg-[#F3ECE2] p-3.5 rounded-2xl shadow-2xs space-y-2 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black font-mono bg-[#FAF5EF] text-[#262118] px-2.5 py-1 rounded-lg">
                        {coupon.code}
                      </span>
                      <span className="text-[10px] text-amber-800 font-bold font-mono">
                        {coupon.tag}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#262118] font-sans">
                      {coupon.desc}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-stone-500 font-mono">
                        {coupon.validity}
                      </span>
                      <button
                        onClick={() => handleApplyCoupon(coupon.code)}
                        className="text-xs font-bold text-[#785E47] hover:underline font-mono cursor-pointer"
                      >
                        Apply To Cart ➔
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 5: KITCHEN SUPPORT */}
            {activeTab === 'support' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#785E47] font-mono">
                  Dedicated Kitchen Concierge
                </h3>

                <div className="bg-[#F3ECE2] p-4 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#3A2E24] text-[#FAF5EF] flex items-center justify-center">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#262118] font-sans">
                        Outlet Kitchen Support
                      </h4>
                      <p className="text-[11px] text-stone-500 font-mono">
                        Indiranagar Main Hub · Active 7:00 AM – 11:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2 text-xs font-mono">
                    <a
                      href="tel:+918041234567"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF5EF] text-[#262118] hover:bg-[#EAE0D3]"
                    >
                      <span>📞 Call Kitchen Manager</span>
                      <span className="font-bold text-[#785E47]">+91 80 4123 4567</span>
                    </a>

                    <a
                      href="https://wa.me/918041234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF5EF] text-[#262118] hover:bg-[#EAE0D3]"
                    >
                      <span>💬 WhatsApp Live Delivery Help</span>
                      <span className="font-bold text-[#785E47]">Chat Now</span>
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-[#F3ECE2] rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold text-[#262118] font-sans">
                    FSSAI License & Hygiene Commitment
                  </h4>
                  <p className="text-[11px] text-[#3A2E24] font-sans leading-relaxed">
                    License No. 11221334000189. All kitchens sanitised every 90 minutes. Temperature logged live.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Footer Bar */}
          <div className="p-4 bg-[#EAE0D3] flex items-center justify-between">
            <span className="text-[11px] text-stone-600 font-mono">
              PARIMAS DINER v3.2 · Bengaluru
            </span>
            <button
              onClick={() => {
                showToast('Diner logged out safely');
                setIsUserPanelOpen(false);
              }}
              className="text-xs font-bold text-stone-600 hover:text-red-700 font-mono cursor-pointer"
            >
              Sign Out
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
