import React from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RestaurantAmbienceSection } from './components/RestaurantAmbienceSection';
import { MenuSection } from './components/MenuSection';
import { InstagramReelsSection } from './components/InstagramReelsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';

// Modals
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PaymentModal } from './components/PaymentModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ReservationModal } from './components/ReservationModal';
import { LoyaltyModal } from './components/LoyaltyModal';
import { AdminPanel } from './components/AdminPanel';
import { UserPanel } from './components/UserPanel';

const MainAppContent: React.FC = () => {
  const {
    cart,
    cartTotals,
    setIsCartOpen,
    toastMessage
  } = useRestaurant();

  const totalCartCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-transparent text-[#2D241E] font-sans selection:bg-[#7D6346] selection:text-white relative">
      {/* Top Delivery Header with GPS Detection, Manual Address & Live Search */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Authentic Restaurant Image & Dining Ambience Section */}
      <RestaurantAmbienceSection />

      {/* Comprehensive Menu System & Customizations */}
      <MenuSection />

      {/* Trending Instagram Reels Views Section (Floating Sideways) */}
      <InstagramReelsSection />

      {/* Diner Reviews & Rating (Floating Sideways) */}
      <ReviewsSection />

      {/* Footer with Sleek Staff Admin Console Link */}
      <Footer />

      {/* Floating Mobile Bottom Action Pill (Only visible on small screens when cart > 0) */}
      {totalCartCount > 0 && (
        <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#5C4835] hover:bg-[#463627] active:scale-98 text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F5EFEB] text-[#463627] font-bold text-xs flex items-center justify-center font-mono">
                {totalCartCount}
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider font-mono">View Bag & Checkout</span>
            </div>
            <div className="font-extrabold text-sm font-mono">
              ₹{cartTotals.total} ➔
            </div>
          </button>
        </div>
      )}

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#352B23]/95 backdrop-blur-md text-[#F5EFEB] text-xs font-bold px-4 py-2.5 rounded-2xl shadow-2xl animate-in slide-in-from-top-4 duration-200 flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <ItemCustomizeModal />
      <CartDrawer />
      <CheckoutModal />
      <PaymentModal />
      <OrderTrackingModal />
      <ReservationModal />
      <LoyaltyModal />
      <AdminPanel />
      <UserPanel />
    </div>
  );
};

export default function App() {
  return (
    <RestaurantProvider>
      <MainAppContent />
    </RestaurantProvider>
  );
}
