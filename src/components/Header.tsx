import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Crosshair,
  ShoppingBag,
  Award,
  Calendar,
  Menu as MenuIcon,
  X,
  ChevronDown,
  Clock,
  Sparkles,
  Check,
  User
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Header: React.FC = () => {
  const {
    cart,
    setIsCartOpen,
    setIsReservationOpen,
    setIsLoyaltyOpen,
    isUserPanelOpen,
    setIsUserPanelOpen,
    loyaltyUser,
    deliveryAreaSearch,
    setDeliveryAreaSearch,
    orderType,
    setOrderType,
    outlets,
    setSelectedOutlet,
    menuItems,
    addToCart,
    setCustomizingItem,
    showToast
  } = useRestaurant();

  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Manual address inputs
  const [manualStreet, setManualStreet] = useState('100ft Road, HAL 2nd Stage');
  const [manualArea, setManualArea] = useState('Indiranagar');
  const [manualCity, setManualCity] = useState('Bengaluru');
  const [manualPincode, setManualPincode] = useState('560038');

  // Search input in navbar
  const [navSearch, setNavSearch] = useState('');

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filtered items for live search dropdown
  const matchingSearchItems = navSearch.trim()
    ? menuItems
        .filter(it =>
          it.name.toLowerCase().includes(navSearch.toLowerCase()) ||
          it.description.toLowerCase().includes(navSearch.toLowerCase()) ||
          it.tamilName?.toLowerCase().includes(navSearch.toLowerCase()) ||
          it.tags?.some(t => t.toLowerCase().includes(navSearch.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setTimeout(() => {
            const detectedArea = `${manualArea || 'Indiranagar'}, ${manualCity || 'Bengaluru'}`;
            setDeliveryAreaSearch(detectedArea);
            setIsDetectingLocation(false);
            setAddressModalOpen(false);
            showToast(`Location detected: ${detectedArea} (GPS coordinates locked)`);
          }, 800);
        },
        (error) => {
          setTimeout(() => {
            setIsDetectingLocation(false);
            const fallbackArea = 'Indiranagar Flagship, Bengaluru';
            setDeliveryAreaSearch(fallbackArea);
            setAddressModalOpen(false);
            showToast('Using nearest kitchen hub: Indiranagar, Bengaluru');
          }, 600);
        },
        { timeout: 5000 }
      );
    } else {
      setTimeout(() => {
        setIsDetectingLocation(false);
        setDeliveryAreaSearch('Indiranagar, Bengaluru');
        setAddressModalOpen(false);
        showToast('Location set: Indiranagar, Bengaluru');
      }, 500);
    }
  };

  const handleSaveManualAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const fullAddress = `${manualStreet}, ${manualArea}, ${manualCity} ${manualPincode}`;
    setDeliveryAreaSearch(`${manualArea}, ${manualCity}`);
    
    // Find nearest outlet if matching
    const matchingOutlet = outlets.find(
      o => o.city.toLowerCase().includes(manualCity.toLowerCase()) ||
           o.area.toLowerCase().includes(manualArea.toLowerCase())
    );
    if (matchingOutlet) {
      setSelectedOutlet(matchingOutlet);
    }

    setAddressModalOpen(false);
    showToast(`Delivery location set to: ${manualArea}`);
  };

  const handleNavSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!navSearch.trim()) return;
    const menuEl = document.getElementById('menu-section');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#3A2E24]/90 backdrop-blur-md text-[#F5EFEB] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-18 flex items-center justify-between gap-3 sm:gap-6">
            
            {/* Left: Sleek White Bold Logo: PARIMAS */}
            <div className="flex items-center gap-4 shrink-0">
              <a
                href="#"
                className="group flex flex-col justify-center select-none"
                aria-label="PARIMAS South Indian Kitchen"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-sans uppercase">
                    PARIMAS
                  </span>
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-[#D4C3B3] font-semibold -mt-1 font-mono">
                  SOUTH INDIAN KITCHEN
                </span>
              </a>

              {/* Delivery / Pickup Segmented Control */}
              <div className="hidden lg:flex items-center bg-[#282019]/80 p-1 rounded-full text-xs font-bold">
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    orderType === 'delivery'
                      ? 'bg-[#5C4835] text-white shadow-xs'
                      : 'text-[#D4C3B3] hover:text-white'
                  }`}
                >
                  Delivery
                </button>
                <button
                  onClick={() => setOrderType('pickup')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    orderType === 'pickup'
                      ? 'bg-[#5C4835] text-white shadow-xs'
                      : 'text-[#D4C3B3] hover:text-white'
                  }`}
                >
                  Pickup
                </button>
              </div>
            </div>

            {/* Middle: Location Detector & Manual Address Trigger Button */}
            <div className="flex-1 max-w-sm hidden md:block">
              <button
                onClick={() => setAddressModalOpen(true)}
                className="w-full bg-[#2C231B]/80 hover:bg-[#382C22] text-left px-3.5 py-2 rounded-xl transition-colors flex items-center justify-between gap-2 group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <MapPin className="w-4 h-4 text-[#CBB5A0] shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="truncate">
                    <span className="text-[10px] text-[#CBB5A0] block uppercase font-mono tracking-wider">
                      Deliver to
                    </span>
                    <span className="text-xs font-bold text-white truncate block">
                      {deliveryAreaSearch || 'Indiranagar, Bengaluru'}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-[#CBB5A0] shrink-0" />
              </button>
            </div>

            {/* Middle: Search Bar inside Navbar with Live Dropdown */}
            <div className="flex-1 max-w-xs lg:max-w-sm hidden md:block relative">
              <form onSubmit={handleNavSearchSubmit} className="relative">
                <input
                  type="text"
                  value={navSearch}
                  onChange={(e) => setNavSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search dosas, thalis, kaapi..."
                  className="w-full bg-[#2C231B]/80 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-[#B8A492] focus:outline-none focus:ring-1 focus:ring-[#CBB5A0]"
                />
                <Search className="w-4 h-4 text-[#B8A492] absolute left-3 top-1/2 -translate-y-1/2" />
                {navSearch && (
                  <button
                    type="button"
                    onClick={() => { setNavSearch(''); setSearchFocused(false); }}
                    className="text-[#B8A492] hover:text-white text-xs absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Live Search Suggestions Dropdown */}
              {searchFocused && navSearch.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-[#F7F2EB]/95 backdrop-blur-md rounded-2xl shadow-2xl text-[#2D241E] p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider px-3 py-1 font-mono flex items-center justify-between">
                    <span>Dishes Matching "{navSearch}"</span>
                    <button
                      type="button"
                      onClick={() => setSearchFocused(false)}
                      className="text-stone-500 hover:text-stone-800 cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                  {matchingSearchItems.length === 0 ? (
                    <div className="p-3 text-center text-xs text-stone-600 font-sans">
                      No dishes found. Press Enter to view full menu.
                    </div>
                  ) : (
                    <div className="space-y-1 mt-1">
                      {matchingSearchItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2 hover:bg-[#EFE8DE] rounded-xl transition-colors group cursor-pointer"
                          onClick={() => {
                            if (item.customizations) {
                              setCustomizingItem(item);
                            } else {
                              addToCart(item, {}, 1);
                              showToast(`Added ${item.name} to bag`);
                            }
                            setSearchFocused(false);
                          }}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-10 h-10 rounded-lg object-cover shrink-0"
                            />
                            <div className="truncate">
                              <div className="text-xs font-bold text-[#2D241E] truncate font-sans">
                                {item.name}
                              </div>
                              <div className="text-[10px] text-stone-600 font-mono">
                                ₹{item.price} · {item.prepTimeMinutes} mins
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.customizations) {
                                setCustomizingItem(item);
                              } else {
                                addToCart(item, {}, 1);
                                showToast(`Added ${item.name} to bag`);
                              }
                              setSearchFocused(false);
                            }}
                            className="bg-[#5C4835] hover:bg-[#463627] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg font-mono uppercase tracking-wider shrink-0 cursor-pointer"
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                      <div className="pt-1 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setSearchFocused(false);
                            const menuEl = document.getElementById('menu-section');
                            if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-[11px] font-bold text-[#5C4835] hover:underline font-mono py-1 block w-full cursor-pointer"
                        >
                          View all dishes in menu ➔
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Action Icons & Navigation */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              {/* Quick links */}
              <nav className="hidden lg:flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-[#E3D7CB]">
                <button
                  onClick={() => scrollTo('menu-section')}
                  className="hover:text-white transition-colors cursor-pointer py-1"
                >
                  Menu
                </button>
                <button
                  onClick={() => scrollTo('restaurant-ambience-section')}
                  className="hover:text-white transition-colors cursor-pointer py-1"
                >
                  Ambience
                </button>
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer py-1 flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#D4C3B3]" />
                  <span>Reserve</span>
                </button>
                <button
                  onClick={() => setIsLoyaltyOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer py-1 flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>{loyaltyUser.points} pts</span>
                </button>
              </nav>

              {/* Mobile Location Button */}
              <button
                onClick={() => setAddressModalOpen(true)}
                className="md:hidden p-2 rounded-xl bg-[#282019] text-[#D4C3B3] hover:text-white"
                aria-label="Set Delivery Location"
              >
                <MapPin className="w-4 h-4" />
              </button>

              {/* User Profile Panel Trigger */}
              <button
                onClick={() => setIsUserPanelOpen(true)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-[#282019] hover:bg-[#201913] text-white transition-all cursor-pointer shadow-2xs group"
                aria-label="Open Diner Account & Profile"
                title="Diner Account & Preferences"
              >
                <div className="w-6 h-6 rounded-lg bg-[#5C4835] text-white flex items-center justify-center text-[10px] font-black font-mono shadow-inner group-hover:bg-[#6E5740] transition-colors">
                  AS
                </div>
                <div className="hidden sm:flex flex-col text-left leading-none pr-0.5">
                  <span className="text-[11px] font-bold text-stone-100 font-sans truncate max-w-[80px]">
                    Aravind S.
                  </span>
                  <span className="text-[9px] text-[#D4C3B3] font-mono uppercase tracking-wider font-semibold">
                    Gold Diner
                  </span>
                </div>
              </button>

              {/* Shopping Bag Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-[#F5EFEB] hover:bg-[#ECE3DA] text-[#2D241E] p-2.5 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                aria-label="View Order Cart"
              >
                <ShoppingBag className="w-4 h-4 text-[#2D241E]" />
                <span className="hidden sm:inline">Bag</span>
                {totalCartCount > 0 && (
                  <span className="bg-[#5C4835] text-white text-[11px] font-black px-1.5 py-0.2 rounded-full font-mono">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:bg-[#282019] rounded-xl focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#2D241C] px-4 py-4 space-y-3 text-xs font-semibold">
            <div className="flex gap-2 pb-2">
              <button
                onClick={() => { setOrderType('delivery'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded-xl text-center font-bold ${
                  orderType === 'delivery' ? 'bg-[#5C4835] text-white' : 'bg-[#201913] text-[#D4C3B3]'
                }`}
              >
                Delivery (28 mins)
              </button>
              <button
                onClick={() => { setOrderType('pickup'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 rounded-xl text-center font-bold ${
                  orderType === 'pickup' ? 'bg-[#5C4835] text-white' : 'bg-[#201913] text-[#D4C3B3]'
                }`}
              >
                Self Pickup
              </button>
            </div>

            <button
              onClick={() => { setMobileMenuOpen(false); setIsUserPanelOpen(true); }}
              className="block w-full text-left py-2 text-[#F2EAE1] hover:text-white flex items-center gap-2 pb-3"
            >
              <div className="w-5 h-5 rounded-md bg-[#5C4835] text-white flex items-center justify-center text-[9px] font-bold font-mono">
                AS
              </div>
              <span>My Account (Aravind S. · Gold)</span>
            </button>
            <button
              onClick={() => scrollTo('menu-section')}
              className="block w-full text-left py-2 text-[#F2EAE1] hover:text-white"
            >
              Explore Full Menu
            </button>
            <button
              onClick={() => scrollTo('restaurant-ambience-section')}
              className="block w-full text-left py-2 text-[#F2EAE1] hover:text-white"
            >
              Restaurant Ambience & Dining Hall
            </button>
            <button
              onClick={() => scrollTo('hero-section')}
              className="block w-full text-left py-2 text-[#F2EAE1] hover:text-white"
            >
              Signature Medu Vada & Specials
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); setIsReservationOpen(true); }}
              className="block w-full text-left py-2 text-[#F2EAE1] hover:text-white flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#D4C3B3]" />
              <span>Table Reservations</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); setIsLoyaltyOpen(true); }}
              className="block w-full text-left py-2 text-[#F2EAE1] hover:text-white flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>PARIMAS Rewards ({loyaltyUser.points} Pts)</span>
            </button>
          </div>
        )}
      </header>

      {/* Delivery Address & GPS Location Detection Modal */}
      {addressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF6F0]/95 backdrop-blur-md rounded-3xl max-w-md w-full p-6 shadow-2xl text-[#262118] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#785E47] uppercase font-mono">
                  DELIVERY LOCATION
                </span>
                <h3 className="text-base font-extrabold text-[#262118] font-sans">
                  Choose Where To Deliver
                </h3>
              </div>
              <button
                onClick={() => setAddressModalOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-200/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              {/* Option 1: Current Location Detection */}
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
                className="w-full p-3.5 bg-[#EFE8DE] hover:bg-[#E5DCD0] text-[#2D241E] rounded-2xl flex items-center justify-between transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#5C4835] text-white flex items-center justify-center shadow-xs">
                    {isDetectingLocation ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Crosshair className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-extrabold text-xs text-[#2D241E]">
                      {isDetectingLocation ? 'Locating via GPS...' : 'Use Current GPS Location'}
                    </div>
                    <div className="text-[11px] text-[#7A634E]">
                      Auto-detect using device location
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#5C4835] underline">
                  Detect
                </span>
              </button>

              <div className="relative flex items-center justify-center">
                <span className="bg-[#FAF6F0] px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono">
                  OR ENTER ADDRESS MANUALLY
                </span>
              </div>

              {/* Option 2: Manual Address Form */}
              <form onSubmit={handleSaveManualAddress} className="space-y-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    House / Flat No. & Street
                  </label>
                  <input
                    type="text"
                    required
                    value={manualStreet}
                    onChange={(e) => setManualStreet(e.target.value)}
                    placeholder="e.g. Flat 302, 12th Main Road"
                    className="w-full bg-[#F3ECE2] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#7A634E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">
                      Area / Locality
                    </label>
                    <input
                      type="text"
                      required
                      value={manualArea}
                      onChange={(e) => setManualArea(e.target.value)}
                      placeholder="e.g. Indiranagar"
                      className="w-full bg-[#F3ECE2] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#7A634E]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={manualCity}
                      onChange={(e) => setManualCity(e.target.value)}
                      placeholder="e.g. Bengaluru"
                      className="w-full bg-[#F3ECE2] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#7A634E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    Postal Pincode
                  </label>
                  <input
                    type="text"
                    required
                    value={manualPincode}
                    onChange={(e) => setManualPincode(e.target.value)}
                    placeholder="e.g. 560038"
                    className="w-full bg-[#F3ECE2] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#7A634E] font-mono"
                  />
                </div>

                {/* Popular hubs */}
                <div>
                  <span className="text-[10px] font-bold text-stone-500 uppercase font-mono block mb-1">
                    Quick Kitchen Hubs
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Indiranagar', 'Mylapore', 'Jubilee Hills', 'Connaught Place'].map(hub => (
                      <button
                        key={hub}
                        type="button"
                        onClick={() => {
                          setManualArea(hub);
                          setManualCity(hub === 'Mylapore' ? 'Chennai' : hub === 'Jubilee Hills' ? 'Hyderabad' : hub === 'Connaught Place' ? 'New Delhi' : 'Bengaluru');
                        }}
                        className="text-[10px] font-bold bg-[#EFE8DE] hover:bg-[#E5DCD0] text-[#2D241E] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        {hub}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#5C4835] hover:bg-[#463627] text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save & Deliver to this Address</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
