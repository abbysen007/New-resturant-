import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Calendar, 
  Sparkles,
  ArrowRight,
  Star
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

// Curated high-fidelity South Indian culinary photography presets
const HERO_PRESETS = [
  {
    id: 'crisp-ghee-dosa',
    title: 'Artisanal Crispy Ghee Dosa & Chutneys',
    description: 'Crisp golden paper masala dosa on banana leaf with brass bowls of sambar & fresh chutneys',
    url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=2400&q=85'
  },
  {
    id: 'south-tiffin-thali',
    title: 'Royal Dakshin Tiffin Platter',
    description: 'Fluffy idlis, golden medu vada, crispy dosa, and authentic filter kaapi',
    url: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=2400&q=85'
  },
  {
    id: 'chettinad-claypot-feast',
    title: 'Heritage Chettinad Spice Feast',
    description: 'Fragrant stone-ground spices, claypot curries, and steamed Kerala parottas',
    url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=2400&q=85'
  },
  {
    id: 'temple-mural-ambience',
    title: 'Heritage Temple Dining Hall',
    description: 'Warm ambient dining with traditional murals, brass lamps, and teak furniture',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=85'
  }
];

export const HeroSection: React.FC = () => {
  const { setIsReservationOpen } = useRestaurant();
  
  // Selected hero image state (defaults to crisp golden dosa feast, replacing previous image)
  const [heroImage, setHeroImage] = useState<string>(HERO_PRESETS[0].url);

  // Smooth scroll to menu
  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu-section');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth scroll to reels
  const scrollToReels = () => {
    const reelsEl = document.getElementById('instagram-reels-section');
    if (reelsEl) {
      reelsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Overlay classes based on beige warm theme colors
  const blendClasses = 'from-[#1E1712]/92 via-[#292019]/65 to-transparent/30';

  return (
    <section id="hero-section" className="relative w-full bg-transparent overflow-hidden group">
      {/* Ambient background glow accents for warm beige theme cohesion */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#8C7355]/20 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Expanded Edge-to-Edge Hero Background & Visual Layer (No Frame) */}
      <div className="relative w-full min-h-[640px] sm:min-h-[700px] md:min-h-[750px] lg:min-h-[800px] overflow-hidden">
        <img
          src={heroImage}
          alt="Authentic South Indian Artisanal Dosa Feast at PARIMAS"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-1000 ease-out select-none"
          onError={() => {
            setHeroImage('https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=2400&q=85');
          }}
        />

        {/* Seamless Theme-Blended Gradients (Earthy Warm Beige & Deep Mahogany Vignettes) */}
        {/* 1. Lateral gradient for crystal clear text readability on the left */}
        <div className={`absolute inset-0 bg-gradient-to-r ${blendClasses} z-10 transition-colors duration-500`} />
        
        {/* 2. Bottom vertical gradient for grounding & seamless transition into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1C1510] via-[#1C1510]/70 to-transparent z-10" />
        
        {/* 3. Subtle top-down vignette blending with sticky navbar */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#2B211A]/90 via-[#2B211A]/40 to-transparent z-10" />
        
        {/* 4. Warm Ochre & Beige Color Harmonizer Layer */}
        <div className="absolute inset-0 bg-[#5A4533]/20 mix-blend-color-burn z-10 pointer-events-none" />

        {/* Expanded Content Overlay Container (Aligned with site width, full viewport height presence) */}
        <div className="relative z-20 w-full h-full min-h-[640px] sm:min-h-[700px] md:min-h-[750px] lg:min-h-[800px] flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          
          {/* Top Row: Live Diner Rating */}
          <div className="flex items-center justify-end w-full">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/40 backdrop-blur-md text-[#F4ECE3] text-xs font-medium font-mono">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-white">4.9</span>
              <span className="text-[#DDD0C2]">· 14,200+ Diners</span>
            </div>
          </div>

          {/* Center-Bottom Core Typography & Action Area */}
          <div className="max-w-3xl space-y-6 sm:space-y-7 mt-auto pt-16">
            
            {/* Grand Headline with Peak Typography & Font Styling */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] font-sans drop-shadow-md">
                Handcrafted Dosas,{' '}
                <span className="bg-gradient-to-r from-[#F7EBDD] via-[#FCE3B4] to-[#E9D6BE] bg-clip-text text-transparent">
                  Heritage Spices
                </span>{' '}
                & Timeless Flavors.
              </h1>
            </div>

            {/* Narrative Description with Exceptional Detail */}
            <p className="text-sm sm:text-base md:text-lg text-[#EAE0D5] leading-relaxed max-w-2xl font-normal drop-shadow-sm">
              Naturally fermented stone-ground batters roasted to golden perfection in pure farm-churned A2 desi ghee. Served sizzling on fresh banana leaves with four signature stone-pestle chutneys, steaming drumstick sambar, and authentic Kumbakonam degree kaapi.
            </p>

            {/* Action Buttons: Primary Order + Secondary Reservation + Reels Link */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              
              {/* Primary CTA: Order Online */}
              <button
                onClick={scrollToMenu}
                className="px-6 py-3.5 rounded-2xl bg-[#6E553E] hover:bg-[#83654B] active:scale-98 text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-xl shadow-black/40 flex items-center gap-2.5 group/btn cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#F2EAE1] group-hover/btn:scale-110 transition-transform" />
                <span>Explore Menu & Order</span>
                <ArrowRight className="w-4 h-4 text-[#F2EAE1] group-hover/btn:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA: Reserve Heritage Table */}
              <button
                onClick={() => setIsReservationOpen(true)}
                className="px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-98 text-white font-bold text-sm sm:text-base transition-all duration-200 backdrop-blur-md flex items-center gap-2.5 cursor-pointer shadow-lg"
              >
                <Calendar className="w-4 h-4 text-[#ECDDCB]" />
                <span>Reserve a Table</span>
              </button>

              {/* Tertiary CTA: Kitchen Reels */}
              <button
                onClick={scrollToReels}
                className="px-4 py-3.5 rounded-2xl bg-black/30 hover:bg-black/50 text-[#E2D5C8] hover:text-white font-medium text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Watch Kitchen Reels</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
