import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, X, Play, Pause, Sparkles } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview } = useRestaurant();
  const [modalOpen, setModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [favoriteDish, setFavoriteDish] = useState('PARIMAS Golden Ghee Roast');
  const [isSidewaysFloating, setIsSidewaysFloating] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;
    addReview({
      author: author.trim(),
      city: city.trim(),
      rating,
      comment: comment.trim(),
      favoriteDish
    });
    setAuthor('');
    setComment('');
    setModalOpen(false);
  };

  // Duplicate reviews array to create a seamless infinite sideways floating marquee
  const seamlessReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <section id="reviews-section" className="py-16 sm:py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DE]/90 backdrop-blur-md text-[#5A4533] text-xs font-bold uppercase tracking-wider shadow-2xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AUTHENTIC DINER EXPERIENCES</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#262118] font-sans tracking-tight uppercase">
              PATRON VOICES & REVIEWS
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                ))}
              </div>
              <span className="text-sm font-extrabold text-[#262118] font-mono">4.9 / 5.0</span>
              <span className="text-xs text-stone-500 font-mono">· Based on 3,420+ verified diners</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Sideways Float Pause/Resume Control */}
            <button
              onClick={() => setIsSidewaysFloating(!isSidewaysFloating)}
              className="bg-[#EFE8DE]/90 backdrop-blur-md text-[#262118] text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-full shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer font-mono"
              title="Toggle sideways floating motion"
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

            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#6E553E] hover:bg-[#584330] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer font-mono"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-200" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sideways Floating Reviews Track */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Soft edge blur vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-transparent to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-transparent to-transparent pointer-events-none z-10" />

        <div
          className={`flex items-stretch gap-5 w-max ${
            isSidewaysFloating ? 'animate-sideways-float pause-on-hover' : ''
          }`}
          style={{ willChange: 'transform' }}
        >
          {seamlessReviews.map((rev, idx) => (
            <div
              key={`${rev.id}-${idx}`}
              className="w-72 sm:w-80 shrink-0 bg-[#FAF5EF]/90 backdrop-blur-md p-5 rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group select-none"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">{rev.date}</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed italic mb-4 font-sans line-clamp-4 group-hover:text-stone-900 transition-colors">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-stone-900 font-sans">{rev.author}</span>
                  {rev.verifiedDiner && (
                    <span title="Verified Diner">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-stone-400 font-mono">{rev.city}</div>
                <div className="mt-1 text-[10px] text-[#785E47] font-semibold truncate font-mono">
                  Ordered: {rev.favoriteDish}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF5EF]/95 backdrop-blur-md rounded-3xl max-w-md w-full p-6 shadow-2xl text-[#262118]">
            <div className="flex items-center justify-between pb-3 mb-4">
              <h4 className="text-base font-extrabold text-[#262118] font-sans">
                Share Your Dining Experience
              </h4>
              <button
                onClick={() => setModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Radhika Menon"
                  className="w-full bg-[#EFE8DE] rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#785E47]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Bengaluru"
                    className="w-full bg-[#EFE8DE] rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#785E47]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Star Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-[#EFE8DE] rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#785E47] font-mono"
                  >
                    <option value={5}>5 Stars - Perfection</option>
                    <option value={4}>4 Stars - Great</option>
                    <option value={3}>3 Stars - Average</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Favorite Dish</label>
                <input
                  type="text"
                  value={favoriteDish}
                  onChange={(e) => setFavoriteDish(e.target.value)}
                  className="w-full bg-[#EFE8DE] rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#785E47]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Your Review</label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about the crispness, chutney freshness, and courier speed..."
                  className="w-full bg-[#EFE8DE] rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#785E47]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-200/50 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6E553E] hover:bg-[#584330] text-white font-bold shadow-sm cursor-pointer"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
