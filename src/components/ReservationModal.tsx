import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { TableReservation } from '../types/restaurant';

export const ReservationModal: React.FC = () => {
  const {
    isReservationOpen,
    setIsReservationOpen,
    createReservation,
    selectedOutlet,
    showToast
  } = useRestaurant();

  const [guestName, setGuestName] = useState('Ananya Raghavan');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('ananya.r@example.com');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('07:30 PM (Dinner)');
  const [guestsCount, setGuestsCount] = useState(4);
  const [diningArea, setDiningArea] = useState<TableReservation['diningArea']>('banana-leaf-hall');
  const [specialOccasion, setSpecialOccasion] = useState<TableReservation['specialOccasion']>('family');
  const [specialRequests, setSpecialRequests] = useState('Prefer traditional brass tumblers and extra podi');

  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(null);

  if (!isReservationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRes = createReservation({
      guestName,
      phone,
      email,
      date,
      timeSlot,
      guestsCount,
      diningArea,
      specialOccasion,
      specialRequests
    });
    setConfirmedReservation(newRes);
    showToast(`Table confirmed! Reservation ID #${newRes.id}`);
  };

  const handleClose = () => {
    setIsReservationOpen(false);
    setConfirmedReservation(null);
  };

  const timeSlots = [
    '08:00 AM (Breakfast)',
    '09:30 AM (Breakfast)',
    '12:30 PM (Royal Lunch)',
    '01:30 PM (Royal Lunch)',
    '04:30 PM (Filter Kaapi & Tiffin)',
    '07:00 PM (Dinner)',
    '08:00 PM (Dinner)',
    '09:00 PM (Dinner)'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs">
      <div className="bg-[#FAF5EF]/95 backdrop-blur-md rounded-3xl max-w-xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl text-[#262118]">
        {/* Header */}
        <div className="p-5 bg-[#3A2E24] text-[#FAF5EF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#4E3E32] text-[#D4AF37] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#D2BBA0] uppercase font-mono">
                INSTANT TABLE BOOKING
              </span>
              <h3 className="text-base font-extrabold text-[#FAF5EF] font-sans">
                Reserve a Table at {selectedOutlet.name}
              </h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#D2BBA0] hover:text-[#FAF5EF] rounded-full hover:bg-[#4E3E32] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {confirmedReservation ? (
            /* Confirmation View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EFE7DC] text-[#785E47] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#785E47] uppercase tracking-widest bg-[#EFE7DC] px-2.5 py-1 rounded-full">
                  RESERVATION CONFIRMED
                </span>
                <h4 className="text-2xl font-extrabold text-[#262118] font-serif mt-2">
                  Table Confirmed for {confirmedReservation.guestName}
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Booking Reference: <strong className="text-[#262118] font-mono text-sm">#{confirmedReservation.id}</strong>
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-[#F3ECE2] p-4 rounded-2xl max-w-md mx-auto text-left space-y-2 text-[#3A2E24]">
                <div className="flex justify-between">
                  <span className="text-stone-500">Outlet Location:</span>
                  <span className="font-bold text-[#262118]">{selectedOutlet.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Date & Slot:</span>
                  <span className="font-bold text-[#262118]">{confirmedReservation.date} · {confirmedReservation.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Party Size:</span>
                  <span className="font-bold text-[#262118]">{confirmedReservation.guestsCount} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Dining Hall:</span>
                  <span className="font-bold text-[#8C7355] capitalize">{confirmedReservation.diningArea.replace(/-/g, ' ')}</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 max-w-sm mx-auto">
                A confirmation SMS & calendar invite has been sent to {confirmedReservation.phone}. We hold your table for 15 minutes past the slot.
              </p>

              <button
                onClick={handleClose}
                className="bg-[#3A2E24] hover:bg-[#262118] text-[#FAF5EF] font-bold py-2.5 px-6 rounded-xl text-xs transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          ) : (
            /* Reservation Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#3A2E24] font-bold mb-1">Reservation Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#F3ECE2] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#8C7355]"
                  />
                </div>
                <div>
                  <label className="block text-[#3A2E24] font-bold mb-1">Time Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#F3ECE2] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#8C7355]"
                  >
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-[#3A2E24] font-bold mb-1 flex items-center justify-between font-mono">
                  <span>Number of Guests</span>
                  <span className="text-[#8C7355] font-extrabold">{guestsCount} Guests</span>
                </label>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuestsCount(num)}
                      className={`w-9 h-9 rounded-xl font-bold transition-all text-xs shrink-0 cursor-pointer font-mono ${
                        guestsCount === num
                          ? 'bg-[#3A2E24] text-[#FAF5EF] shadow-xs'
                          : 'bg-[#F3ECE2] text-[#3A2E24] hover:bg-[#EAE0D3]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dining Atmosphere */}
              <div>
                <label className="block text-[#3A2E24] font-bold mb-1 font-mono">Dining Area & Experience</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'banana-leaf-hall', label: 'Banana Leaf Hall', desc: 'Traditional authentic feast seating' },
                    { id: 'courtyard-ac', label: 'AC Courtyard', desc: 'Family air-conditioned ambience' },
                    { id: 'heritage-private', label: 'Private Room', desc: 'Heritage wooden booth' }
                  ].map(hall => (
                    <button
                      key={hall.id}
                      type="button"
                      onClick={() => setDiningArea(hall.id as any)}
                      className={`p-3 rounded-2xl text-left transition-all cursor-pointer ${
                        diningArea === hall.id
                          ? 'bg-[#EAE0D3] ring-2 ring-[#785E47]'
                          : 'hover:bg-[#EAE0D3] bg-[#F3ECE2]'
                      }`}
                    >
                      <div className="font-bold text-[#262118] text-xs font-sans">{hall.label}</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">{hall.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[#3A2E24] font-bold mb-1">Guest Name</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#F3ECE2] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#8C7355]"
                  />
                </div>
                <div>
                  <label className="block text-[#3A2E24] font-bold mb-1 font-mono">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F3ECE2] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#8C7355] font-mono"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-[#3A2E24] font-bold mb-1">Special Occasion & Dietary Preferences</label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Jain food (no onion/garlic), baby high-chair, birthday celebration"
                  className="w-full bg-[#F3ECE2] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#8C7355]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#785E47] hover:bg-[#604936] active:scale-98 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-mono"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Table Booking</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
