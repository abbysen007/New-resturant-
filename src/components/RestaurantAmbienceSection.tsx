import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Users, 
  Clock, 
  Maximize2, 
  Calendar, 
  Check 
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

interface AmbienceView {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  description: string;
  tag: string;
}

const AMBIENCE_VIEWS: AmbienceView[] = [
  {
    id: 'temple-mural-hall',
    title: 'Heritage Temple Mural Dining Hall',
    subtitle: 'Main Dining Hall with Hand-Painted Gopuram Fresco & Teak Seating',
    // High-resolution restaurant interior with traditional temple mural on warm ochre wall, wooden tables & ambient lamps
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85',
    description: 'Our signature dining space features a magnificent hand-painted temple gopuram mural against ochre walls, polished teakwood dining tables, and warm brass hanging lamps that evoke the timeless sanctity of heritage South Indian homes.',
    tag: 'Main Dining Hall'
  },
  {
    id: 'chettinad-courtyard',
    title: 'Chettinad Teak & Courtyard Pavilion',
    subtitle: 'Sunlit Skylight Dining with Traditional Athangudi-Style Tiles',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=85',
    description: 'Crafted with authentic Chettinad teak pillars and patterned Athangudi tiles, this airy courtyard pavilion offers comfortable booth seating for intimate lunches and celebratory family gatherings.',
    tag: 'Courtyard Space'
  },
  {
    id: 'brass-kaapi-counter',
    title: 'Live Kaapi & Tiffin Show Kitchen',
    subtitle: 'Where Fresh Degree Filter Coffee Meets Sizzling Cast-Iron Tawas',
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2000&q=85',
    description: 'Watch our master baristas meter-pour frothy Kumbakonam degree kaapi from brass davarahs while dosas sizzle in pure ghee right before your eyes.',
    tag: 'Live Counter'
  },
  {
    id: 'private-family-dining',
    title: 'Royal Mezzanine Family Lounge',
    subtitle: 'Exclusive Dining Alcove for Traditional Banana Leaf Banquets',
    imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2000&q=85',
    description: 'A serene elevated alcove reserved for traditional banana leaf thali feasts, complete with soft classical Carnatic ragas and dedicated table attendants.',
    tag: 'Family Banquets'
  }
];

export const RestaurantAmbienceSection: React.FC = () => {
  const { setIsReservationOpen } = useRestaurant();
  const [activeViewId, setActiveViewId] = useState<string>('temple-mural-hall');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const activeView = AMBIENCE_VIEWS.find(v => v.id === activeViewId) || AMBIENCE_VIEWS[0];
  const currentImageUrl = activeView.imageUrl;

  return (
    <section id="restaurant-ambience-section" className="py-14 sm:py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DE]/90 backdrop-blur-md text-[#5A4533] text-xs font-bold uppercase tracking-wider shadow-2xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>DINE-IN ATMOSPHERE & HERITAGE SPACES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#262118] font-sans tracking-tight uppercase">
              THE PARIMAS RESTAURANT EXPERIENCE
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-1.5 max-w-2xl font-sans leading-relaxed">
              Step into our dining room surrounded by temple murals, warm ambient light, handcrafted teak tables, and the soothing sound of sizzling tawas.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsReservationOpen(true)}
              className="bg-[#6E553E] hover:bg-[#584330] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer font-mono"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Table</span>
            </button>
          </div>
        </div>

        {/* Main Ambience Showcase Card */}
        <div className="bg-[#FAF5EF]/90 backdrop-blur-md rounded-3xl p-4 sm:p-7 shadow-lg transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Large Image Display with Floating Glow & Lightbox */}
            <div className="lg:col-span-8 relative group rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-900 shadow-md">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                <img
                  src={currentImageUrl}
                  alt={activeView.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out select-none"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                {/* View Tag Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="bg-[#241C15]/85 backdrop-blur-md text-[#F4ECE3] text-xs font-bold px-3 py-1.5 rounded-full font-mono flex items-center gap-1.5 shadow-md">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeView.tag}</span>
                  </span>
                </div>

                {/* Lightbox Expand Button */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                  title="View fullscreen photo"
                  aria-label="Expand image"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <span className="text-amber-400 text-xs font-mono font-bold tracking-wider uppercase block">
                    {activeView.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-sans tracking-tight text-white mt-0.5">
                    {activeView.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Right Information & Perspective Switcher */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] font-bold tracking-widest text-[#785E47] uppercase font-mono block">
                  ARCHITECTURE & INTERIOR HIGHLIGHTS
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold text-[#262118] font-sans tracking-tight mt-1">
                  Traditional Temple Murals & Warm Wooden Dining
                </h4>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-2.5 font-sans">
                  {activeView.description}
                </p>

                {/* Key Facility Badges */}
                <div className="grid grid-cols-2 gap-2.5 mt-5">
                  <div className="bg-[#EFE8DE]/90 rounded-xl p-2.5 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#5A4533] shrink-0" />
                    <div>
                      <div className="text-[11px] font-black text-[#262118] font-mono">140 Seats</div>
                      <div className="text-[10px] text-stone-500 font-sans">Spacious Seating</div>
                    </div>
                  </div>

                  <div className="bg-[#EFE8DE]/90 rounded-xl p-2.5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <div className="text-[11px] font-black text-[#262118] font-mono">Temple Art</div>
                      <div className="text-[10px] text-stone-500 font-sans">Cultural Frescoes</div>
                    </div>
                  </div>

                  <div className="bg-[#EFE8DE]/90 rounded-xl p-2.5 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#5A4533] shrink-0" />
                    <div>
                      <div className="text-[11px] font-black text-[#262118] font-mono">6:30 AM - 11 PM</div>
                      <div className="text-[10px] text-stone-500 font-sans">Open Daily</div>
                    </div>
                  </div>

                  <div className="bg-[#EFE8DE]/90 rounded-xl p-2.5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-[11px] font-black text-[#262118] font-mono">Central A/C</div>
                      <div className="text-[10px] text-stone-500 font-sans">Climate Controlled</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Perspective Selector Mini Cards */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider font-mono block mb-2">
                  Select Ambience Gallery View
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {AMBIENCE_VIEWS.map((view) => (
                    <button
                      key={view.id}
                      onClick={() => {
                        setActiveViewId(view.id);
                      }}
                      className={`relative rounded-xl overflow-hidden aspect-[4/3] transition-all cursor-pointer group/thumb ${
                        activeViewId === view.id
                          ? 'ring-2 ring-[#6E553E] scale-102'
                          : 'opacity-75 hover:opacity-100'
                      }`}
                      title={view.title}
                    >
                      <img
                        src={view.imageUrl}
                        alt={view.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover select-none"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-black/0 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-stone-300 p-2 font-mono text-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Close [Esc]</span>
              ✕
            </button>
            <img
              src={currentImageUrl}
              alt="Restaurant Interior Lightbox"
              referrerPolicy="no-referrer"
              className="max-h-[80vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border border-white/20 select-none"
            />
            <div className="text-center mt-3 text-stone-300 font-sans text-xs sm:text-sm">
              PARIMAS South Indian Artisanal Kitchen · Heritage Dining Hall & Temple Art Mural
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
