import React from 'react';
import { X, Award, Gift, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const LoyaltyModal: React.FC = () => {
  const {
    isLoyaltyOpen,
    setIsLoyaltyOpen,
    loyaltyUser,
    claimVoucher,
    setIsCartOpen
  } = useRestaurant();

  if (!isLoyaltyOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs">
      <div className="bg-[#FAF5EF]/95 backdrop-blur-md rounded-3xl max-w-lg w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl text-[#262118]">
        {/* Header */}
        <div className="p-5 bg-[#3A2E24] text-[#FAF5EF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#4E3E32] text-[#D4AF37] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#D2BBA0] uppercase font-mono">
                PARIMAS REWARDS CLUB
              </span>
              <h3 className="text-base font-extrabold text-[#FAF5EF] font-sans">
                Frequent Diner Privileges
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsLoyaltyOpen(false)}
            className="p-1.5 text-[#D2BBA0] hover:text-[#FAF5EF] rounded-full hover:bg-[#4E3E32] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Member Card Simulation in Warm Brown/Gold */}
          <div className="bg-gradient-to-tr from-[#262118] via-[#3A2E24] to-[#594433] text-white p-5 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl"></div>

            <div className="flex items-start justify-between relative z-10 mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#D2BBA0] font-bold uppercase">
                  TIER: {loyaltyUser.tier}
                </span>
                <h4 className="text-lg font-extrabold font-sans mt-0.5 text-white">{loyaltyUser.name}</h4>
                <p className="text-[10px] text-stone-300 font-mono">{loyaltyUser.membershipId}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-[#EAE0D3] font-mono">Points Balance</span>
                <div className="text-2xl font-black text-white font-mono">
                  {loyaltyUser.points} <span className="text-xs font-normal text-[#D2BBA0]">PTS</span>
                </div>
              </div>
            </div>

            {/* Progress to Gold Patron Tier */}
            <div className="space-y-1 relative z-10 pt-2">
              <div className="flex justify-between text-[10px] text-stone-300 font-mono">
                <span>Silver Tier</span>
                <span className="text-[#EAE0D3]">160 pts to Gold Patron</span>
              </div>
              <div className="w-full h-2 bg-[#1B1714] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#8C7355] to-amber-300 w-3/5 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Quick Perks Overview */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#F3ECE2] p-2.5 rounded-xl">
              <div className="font-extrabold text-[#262118] text-sm font-mono">{loyaltyUser.totalOrders}</div>
              <div className="text-[10px] text-stone-500">Orders Enjoyed</div>
            </div>
            <div className="bg-[#F3ECE2] p-2.5 rounded-xl">
              <div className="font-extrabold text-[#262118] text-sm font-mono">₹{loyaltyUser.lifetimeSpent}</div>
              <div className="text-[10px] text-stone-500">Lifetime Spent</div>
            </div>
            <div className="bg-[#F3ECE2] p-2.5 rounded-xl">
              <div className="font-extrabold text-[#785E47] text-sm font-mono">10% Back</div>
              <div className="text-[10px] text-stone-500">Every Order</div>
            </div>
          </div>

          {/* Redeemable Vouchers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#262118] flex items-center gap-1.5 font-mono">
              <Gift className="w-4 h-4 text-[#785E47]" />
              <span>Redeem Points for Meal Vouchers</span>
            </h4>

            <div className="space-y-2">
              {loyaltyUser.vouchers.map(v => {
                const canAfford = loyaltyUser.points >= v.pointsRequired;
                return (
                  <div
                    key={v.id}
                    className="p-3.5 bg-[#F3ECE2] rounded-2xl shadow-2xs flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-bold text-[#262118] text-xs sm:text-sm font-sans">
                        {v.title}
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">
                        Requires min order ₹{v.minSpend} · Use code <code className="font-mono font-bold text-[#3A2E24] bg-[#EAE0D3] px-1 rounded">{v.code}</code>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const success = claimVoucher(v.id);
                        if (success) {
                          setIsLoyaltyOpen(false);
                          setIsCartOpen(true);
                        }
                      }}
                      disabled={!canAfford}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer font-mono ${
                        canAfford
                          ? 'bg-[#785E47] hover:bg-[#604936] text-white shadow-2xs'
                          : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? `Redeem (${v.pointsRequired} Pts)` : `Need ${v.pointsRequired} Pts`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EAE0D3] text-center">
          <p className="text-[11px] text-[#594433]">
            Points are automatically credited on all dine-in, takeaway, and online delivery orders.
          </p>
        </div>
      </div>
    </div>
  );
};
