import React from 'react';
import { Lock } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Footer: React.FC = () => {
  const {
    setIsAdminOpen,
    setIsReservationOpen,
    setIsLoyaltyOpen,
    setIsTrackingOpen
  } = useRestaurant();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D241C]/90 backdrop-blur-md text-[#E5DCD0] pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Sleek PARIMAS Logo in White Bold */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans uppercase">
              PARIMAS
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#D4C3B3] font-bold font-mono mt-0.5">
            SOUTH INDIAN ARTISANAL KITCHEN · ESTD 1984
          </span>
        </div>

        {/* Navigation Links in Footer */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-bold uppercase tracking-widest text-[#F2EAE1] font-mono">
          <button
            onClick={() => scrollTo('menu-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Our Menu
          </button>
          <button
            onClick={() => scrollTo('restaurant-ambience-section')}
            className="hover:text-white transition-colors cursor-pointer text-[#EFE3D5]"
          >
            Restaurant Ambience
          </button>
          <button
            onClick={() => scrollTo('instagram-reels-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Trending Reels
          </button>
          <button
            onClick={() => scrollTo('reviews-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Patron Reviews
          </button>
          <button
            onClick={() => setIsReservationOpen(true)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Reservations
          </button>
          <button
            onClick={() => setIsLoyaltyOpen(true)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Rewards Club
          </button>
          <button
            onClick={() => setIsTrackingOpen(true)}
            className="hover:text-white transition-colors cursor-pointer text-[#EFE3D5]"
          >
            Track Active Order
          </button>
          <button
            onClick={() => scrollTo('menu-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Order Online
          </button>
        </div>

        <div className="text-xs text-[#CDBEAF]">
          <span>Direct diner hotline: </span>
          <a
            href="mailto:contact@parimas.com"
            className="font-bold text-white hover:underline font-mono"
          >
            contact@parimas.com
          </a>
        </div>

        <p className="text-[11px] text-[#B8A796] max-w-xl mx-auto leading-relaxed">
          PARIMAS is a sanctuary for authentic, made-from-scratch South Indian delicacies. Stone-ground batter, pure Gir cow ghee, and fresh morning decoctions delivered express to your doorstep.
        </p>

        {/* Bottom copyright and sleek discrete admin toggle */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#B8A796] gap-3">
          <div className="font-mono">
            © 1984 - 2026 PARIMAS KITCHEN CO. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#B8A796]">Pure Ghee · Stone Ground · Probiotic</span>
            <span className="text-[#6E553E]">|</span>
            {/* Sleek, unhighlighted Staff link */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-[#B8A796] hover:text-white transition-colors flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-[#3D3025] cursor-pointer"
              title="Restaurant Staff & Kitchen Operations"
            >
              <Lock className="w-3 h-3 text-[#B8A796]" />
              <span className="font-mono text-[10px] tracking-wider uppercase">Staff Console</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
