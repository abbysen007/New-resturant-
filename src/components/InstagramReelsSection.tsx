import React, { useState } from 'react';
import { 
  Instagram, 
  Play, 
  Pause, 
  Heart, 
  MessageCircle, 
  Share2, 
  Volume2, 
  VolumeX, 
  X, 
  Eye, 
  Sparkles, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight,
  Music2,
  CheckCircle2
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

interface ReelItem {
  id: string;
  title: string;
  caption: string;
  views: string;
  viewsCount: number;
  initialLikes: number;
  commentsCount: number;
  audioTrack: string;
  thumbnailUrl: string;
  dishName: string;
  dishPrice: number;
  dishCategory: string;
  duration: string;
  tags: string[];
}

const REELS_DATA: ReelItem[] = [
  {
    id: 'reel-ghee-dosa',
    title: 'The 4-Foot Family Ghee Roast Dosa Drop',
    caption: 'Pure A2 Gir cow ghee sizzling over our 100-year seasoned cast-iron tawa. That crackle is pure poetry! 🧈🔥 #ParimasKitchen #GheeRoast',
    views: '1.8M',
    viewsCount: 1840000,
    initialLikes: 142500,
    commentsCount: 1840,
    audioTrack: 'Sizzling Tawa ASMR · PARIMAS Original Audio',
    thumbnailUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80',
    dishName: 'Heritage Ghee Roast Dosa',
    dishPrice: 180,
    dishCategory: 'Signature Dosas',
    duration: '0:26',
    tags: ['#crispydosa', '#pureghee', '#bengalurueats']
  },
  {
    id: 'reel-sambar-vada',
    title: 'That First Sambar Vada Crunch',
    caption: 'Cloud-soft urad dal inside, gold crunch outside. Dipped boiling hot into slow-simmered shallot sambar. 🤤🥣 #MeduVada #SambarDip',
    views: '1.2M',
    viewsCount: 1220000,
    initialLikes: 98400,
    commentsCount: 920,
    audioTrack: 'Crispy Vada Crunch · Foodie Beats',
    thumbnailUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
    dishName: 'Tiffin Medu Vada (Sambar Dip)',
    dishPrice: 110,
    dishCategory: 'Idli & Vada Tiffin',
    duration: '0:19',
    tags: ['#meduvada', '#sambar', '#tiffinlovers']
  },
  {
    id: 'reel-filter-kaapi',
    title: 'Degree Filter Kaapi Meter-Pour Froth Magic',
    caption: 'Meter-pour technique from a 3-foot height to aerate the chicory-peaberry decoction into velvety foam. ☕✨ #FilterKaapi #ChennaiVibes',
    views: '2.4M',
    viewsCount: 2410000,
    initialLikes: 189000,
    commentsCount: 2350,
    audioTrack: 'Kumbakonam Morning Raga · Brass Beats',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
    dishName: 'Kumbakonam Degree Filter Kaapi',
    dishPrice: 65,
    dishCategory: 'Filter Kaapi & Sweets',
    duration: '0:22',
    tags: ['#degreecoffee', '#filterkaapi', '#kaapilovers']
  },
  {
    id: 'reel-podi-idli',
    title: 'Molagapodi Ghee Cascade Over Thatte Idli',
    caption: 'Gunpowder roasted spices, sesame crunch, and smoking hot cow ghee drowned over pillow-soft Thatte Idlis. 💥🍛 #PodiIdli',
    views: '890K',
    viewsCount: 890000,
    initialLikes: 74200,
    commentsCount: 680,
    audioTrack: 'Spiced Podi Sizzle · PARIMAS Sound',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80',
    dishName: 'Guntur Podi Thatte Idli',
    dishPrice: 120,
    dishCategory: 'Idli & Vada Tiffin',
    duration: '0:18',
    tags: ['#gunpowderpodi', '#thatteidli', '#spicejunkie']
  },
  {
    id: 'reel-banana-leaf',
    title: 'The Royal 18-Curry Banana Leaf Feast Rollout',
    caption: 'From pineapple rasam and paruppu payasam to appalam and avail, served on an uncut fresh plantain leaf. 🍃👑 #SouthIndianThali',
    views: '1.5M',
    viewsCount: 1530000,
    initialLikes: 118000,
    commentsCount: 1420,
    audioTrack: 'Carnatic Fusion Vibes · Wedding Feast',
    thumbnailUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=900&q=80',
    dishName: 'Grand Banana Leaf Royal Thali',
    dishPrice: 320,
    dishCategory: 'Banana Leaf Thalis',
    duration: '0:32',
    tags: ['#bananaleaf', '#thali', '#festivefood']
  }
];

export const InstagramReelsSection: React.FC = () => {
  const { menuItems, addToCart, showToast } = useRestaurant();
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, { count: number; userLiked: boolean }>>(() => {
    const initial: Record<string, { count: number; userLiked: boolean }> = {};
    REELS_DATA.forEach(r => {
      initial[r.id] = { count: r.initialLikes, userLiked: false };
    });
    return initial;
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showHeartsAnim, setShowHeartsAnim] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>('');
  const [commentsFeed, setCommentsFeed] = useState<Record<string, string[]>>({
    'reel-ghee-dosa': ['Best dosa in Bangalore hands down! 🔥', 'That ghee aroma through the screen 🤤', 'Ordering right now for lunch!'],
    'reel-sambar-vada': ['The crunch in the beginning got me craving!', 'Drumstick sambar looks legendary.'],
    'reel-filter-kaapi': ['Nothing beats real Kumbakonam kaapi ❤️', 'That foam consistency is unmatched.'],
    'reel-podi-idli': ['Podi lovers paradise 🌶️', 'Pure comfort breakfast!'],
    'reel-banana-leaf': ['Grand feast perfection 🍃', 'Payasam with appalam is bliss.']
  });

  const [isSidewaysFloating, setIsSidewaysFloating] = useState<boolean>(true);
  const seamlessReels = [...REELS_DATA, ...REELS_DATA, ...REELS_DATA, ...REELS_DATA];

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const toggleLike = (reelId: string) => {
    setLikesMap(prev => {
      const current = prev[reelId] || { count: 0, userLiked: false };
      const nextUserLiked = !current.userLiked;
      const nextCount = nextUserLiked ? current.count + 1 : current.count - 1;
      return {
        ...prev,
        [reelId]: { count: nextCount, userLiked: nextUserLiked }
      };
    });

    if (!likesMap[reelId]?.userLiked) {
      setShowHeartsAnim(true);
      setTimeout(() => setShowHeartsAnim(false), 900);
    }
  };

  const handleAddComment = (reelId: string) => {
    if (!commentInput.trim()) return;
    setCommentsFeed(prev => ({
      ...prev,
      [reelId]: [commentInput.trim(), ...(prev[reelId] || [])]
    }));
    setCommentInput('');
    showToast('Comment posted to reel!');
  };

  const handleOrderReelDish = (reel: ReelItem) => {
    const dish = menuItems.find(it => it.name.toLowerCase().includes(reel.dishName.toLowerCase())) || menuItems[0];
    if (dish) {
      addToCart(dish, {}, 1);
      showToast(`Added ${dish.name} from reel to your order!`);
    }
  };

  return (
    <section id="instagram-reels-section" className="py-14 sm:py-18 bg-transparent relative overflow-hidden">
      {/* Decorative backdrop elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#785E47]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#8C7355]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DE]/90 backdrop-blur-md text-[#5A4533] text-xs font-bold uppercase tracking-wider shadow-2xs font-mono mb-2">
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>@PARIMAS.KITCHEN · 52.4K FOOD LOVERS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#262118] font-sans tracking-tight uppercase">
              TRENDING REELS & TAWA MOMENTS
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mt-1 font-sans">
              Watch our masters craft crispy dosas, sizzle desi ghee, and froth degree kaapi. Floating sideways live stream!
            </p>
          </div>

          {/* Social Follow Action & Carousel Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Toggle Sideways Floating Motion */}
            <button
              onClick={() => setIsSidewaysFloating(!isSidewaysFloating)}
              className="bg-[#EFE8DE]/90 backdrop-blur-md hover:bg-[#E5DCD0] text-[#2D241E] px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer font-mono"
              title="Toggle sideways float motion"
            >
              {isSidewaysFloating ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#5A4533]" />
                  <span>Pause Float</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#5A4533]" />
                  <span>Resume Float</span>
                </>
              )}
            </button>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#EFE8DE]/90 backdrop-blur-md hover:bg-[#E5DCD0] text-[#2D241E] px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs cursor-pointer font-mono"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>Follow On IG</span>
            </a>

            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => scrollCarousel('left')}
                className="w-9 h-9 rounded-xl bg-[#EFE8DE]/90 backdrop-blur-md text-stone-700 hover:text-[#262118] hover:bg-[#E5DCD0] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                aria-label="Previous reels"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="w-9 h-9 rounded-xl bg-[#EFE8DE]/90 backdrop-blur-md text-stone-700 hover:text-[#262118] hover:bg-[#E5DCD0] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                aria-label="Next reels"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sideways Floating Reels Horizontal Stream */}
        <div className="relative w-full overflow-hidden py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {/* Subtle edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-transparent to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-transparent to-transparent pointer-events-none z-10" />

          <div
            ref={scrollContainerRef}
            className={`flex items-center gap-4 sm:gap-6 w-max overflow-x-auto no-scrollbar pb-3 pt-1 ${
              isSidewaysFloating && !selectedReel ? 'animate-sideways-float-fast pause-on-hover' : ''
            }`}
            style={{ willChange: 'transform' }}
          >
            {seamlessReels.map((reel, idx) => {
              const currentLikes = likesMap[reel.id] || { count: reel.initialLikes, userLiked: false };

              return (
                <div
                  key={`${reel.id}-${idx}`}
                  onClick={() => setSelectedReel(reel)}
                  className="w-64 sm:w-72 shrink-0 bg-stone-900 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 relative group cursor-pointer flex flex-col aspect-[9/16] hover:-translate-y-1.5 select-none"
                >
                {/* Reel Background Image */}
                <img
                  src={reel.thumbnailUrl}
                  alt={reel.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 select-none"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

                {/* Top Overlay: Views badge & Instagram icon */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 font-mono">
                    <Eye className="w-3 h-3 text-amber-400" />
                    <span>{reel.views}</span>
                  </span>

                  <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Instagram className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Center Play Button on hover */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom Overlay: Audio, Title & Order Trigger */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 text-white space-y-2">
                  {/* Audio Pill */}
                  <div className="flex items-center gap-1.5 text-[10px] text-stone-300 font-mono truncate">
                    <Music2 className="w-3 h-3 shrink-0 text-amber-300" />
                    <span className="truncate">{reel.audioTrack}</span>
                  </div>

                  {/* Caption */}
                  <h3 className="text-sm font-bold leading-snug line-clamp-2 font-sans drop-shadow-xs">
                    {reel.title}
                  </h3>

                  {/* Dish Bar & Engagement */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="truncate">
                      <span className="text-[10px] uppercase tracking-wider text-amber-300 font-mono block">
                        Featured Dish
                      </span>
                      <span className="text-xs font-black font-sans truncate">
                        ₹{reel.dishPrice} · {reel.dishName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(reel.id);
                        }}
                        className={`p-1.5 rounded-full transition-transform active:scale-75 ${
                          currentLikes.userLiked ? 'text-red-500 fill-red-500' : 'text-white hover:text-red-400'
                        }`}
                        title="Like Reel"
                      >
                        <Heart className={`w-4 h-4 ${currentLikes.userLiked ? 'fill-red-500' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOrderReelDish(reel);
                        }}
                        className="bg-[#6E553E] hover:bg-[#584330] text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-mono uppercase tracking-wider shadow-xs cursor-pointer"
                        title="Add Dish to Bag"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>

      {/* Interactive Instagram Reel Video Player Modal */}
      {selectedReel && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm sm:max-w-md bg-stone-950 rounded-3xl overflow-hidden shadow-2xl flex flex-col aspect-[9/16] max-h-[92vh]">
            
            {/* Reel Video Background with simulated playback */}
            <div className="relative flex-1 w-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedReel.thumbnailUrl}
                alt={selectedReel.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover select-none ${isPlaying ? 'scale-102 transition-transform duration-[6000ms]' : ''}`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none" />

              {/* Flying Hearts Animation when Liked */}
              {showHeartsAnim && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in zoom-in-50 fade-out-80 duration-700">
                  <Heart className="w-24 h-24 text-red-500 fill-red-500 drop-shadow-2xl" />
                </div>
              )}

              {/* Reel Progress Bar */}
              <div className="absolute top-2 left-3 right-3 h-1 bg-white/30 rounded-full overflow-hidden z-20">
                <div 
                  className={`h-full bg-white transition-all ${
                    isPlaying ? 'w-3/4 duration-1000' : 'w-1/2'
                  }`}
                />
              </div>

              {/* Top Controls: Profile, Views & Close */}
              <div className="absolute top-5 left-3.5 right-3.5 flex items-center justify-between z-20 text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-pink-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-xs font-mono">
                      P
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold font-sans">parimas.kitchen</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                    </div>
                    <span className="text-[10px] text-stone-300 font-mono">
                      {selectedReel.views} views
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                    aria-label="Toggle mute"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setSelectedReel(null)}
                    className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
                    aria-label="Close reel"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Center Play/Pause toggle */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center text-white/70 hover:text-white transition-opacity"
              >
                {!isPlaying && (
                  <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                )}
              </button>

              {/* Right Vertical Action Buttons: Like, Comment, Share */}
              <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 z-20 text-white">
                {/* Like Button */}
                <button
                  onClick={() => toggleLike(selectedReel.id)}
                  className="flex flex-col items-center gap-0.5 active:scale-75 transition-transform"
                >
                  <div className={`p-2.5 rounded-full ${
                    likesMap[selectedReel.id]?.userLiked ? 'bg-red-500/20 text-red-500' : 'bg-black/40 hover:bg-black/60'
                  }`}>
                    <Heart className={`w-5 h-5 ${likesMap[selectedReel.id]?.userLiked ? 'fill-red-500' : ''}`} />
                  </div>
                  <span className="text-[10px] font-bold font-mono">
                    {((likesMap[selectedReel.id]?.count || 0) / 1000).toFixed(1)}k
                  </span>
                </button>

                {/* Comment Counter */}
                <div className="flex flex-col items-center gap-0.5">
                  <div className="p-2.5 rounded-full bg-black/40">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold font-mono">
                    {(commentsFeed[selectedReel.id]?.length || 0) + 120}
                  </span>
                </div>

                {/* Share Button */}
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast('Reel link copied to clipboard!');
                  }}
                  className="flex flex-col items-center gap-0.5"
                  title="Share"
                >
                  <div className="p-2.5 rounded-full bg-black/40 hover:bg-black/60">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold font-mono">Share</span>
                </button>
              </div>

              {/* Bottom Caption, Audio & Order Bar */}
              <div className="absolute bottom-3 left-3 right-16 z-20 text-white space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-mono">
                  <Music2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="truncate">{selectedReel.audioTrack}</span>
                </div>

                <p className="text-xs leading-relaxed text-stone-200 line-clamp-2 font-sans">
                  {selectedReel.caption}
                </p>

                {/* Order Featured Dish Floating Bar */}
                <div className="bg-[#FAF5EF]/95 backdrop-blur-md text-[#262118] p-2 sm:p-2.5 rounded-2xl flex items-center justify-between gap-2 shadow-xl">
                  <div className="truncate">
                    <span className="text-[9px] uppercase font-bold text-[#785E47] font-mono block">
                      Featured in Reel
                    </span>
                    <span className="text-xs font-black font-sans truncate">
                      {selectedReel.dishName}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      handleOrderReelDish(selectedReel);
                      setSelectedReel(null);
                    }}
                    className="bg-[#6E553E] hover:bg-[#584330] text-white px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer font-mono shrink-0 shadow-xs active:scale-95 transition-transform"
                  >
                    <span>Add ₹{selectedReel.dishPrice}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Comment Bar inside Reel Modal */}
            <div className="p-3 bg-stone-900 flex items-center gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment(selectedReel.id)}
                placeholder="Add a comment to this reel..."
                className="flex-1 bg-stone-800 text-white placeholder-stone-400 text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                onClick={() => handleAddComment(selectedReel.id)}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 px-2 py-1 font-mono uppercase"
              >
                Post
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
