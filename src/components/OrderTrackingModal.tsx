import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  MapPin,
  ChevronRight,
  PackageCheck,
  ChefHat,
  Bike,
  Sparkles,
  Receipt
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { OrderStatus } from '../types/restaurant';

export const OrderTrackingModal: React.FC = () => {
  const {
    isTrackingOpen,
    setIsTrackingOpen,
    currentActiveOrder,
    orders,
    setCurrentActiveOrder,
    updateOrderStatus,
    showToast
  } = useRestaurant();

  const [etaRemaining, setEtaRemaining] = useState<number>(24);
  const [mapProgress, setMapProgress] = useState<number>(65);

  const order = currentActiveOrder || orders[0];

  // Steps configuration
  const steps: { key: OrderStatus; label: string; sub: string; icon: any }[] = [
    { key: 'confirmed', label: 'Order Confirmed', sub: 'Received at Kitchen Desk', icon: CheckCircle2 },
    { key: 'preparing', label: 'Kitchen Preparing', sub: 'Crisping on Cast-Iron Tawa', icon: ChefHat },
    { key: 'ready', label: 'Packed & Sealed', sub: 'Eco Steam-Vent Containers', icon: PackageCheck },
    { key: 'out_for_delivery', label: 'Out for Delivery', sub: 'Hero Ramesh on Bajaj Chetak EV', icon: Bike },
    { key: 'delivered', label: 'Delivered Hot', sub: 'Enjoy your authentic feast!', icon: Sparkles }
  ];

  const statusOrder: OrderStatus[] = ['confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'];
  const currentStepIdx = order ? statusOrder.indexOf(order.status) : 0;

  // Simulate progress
  const advanceToNextStatus = () => {
    if (!order) return;
    const nextIdx = Math.min(statusOrder.length - 1, currentStepIdx + 1);
    const nextStatus = statusOrder[nextIdx];
    updateOrderStatus(order.id, nextStatus);
    if (nextStatus === 'delivered') {
      setEtaRemaining(0);
      setMapProgress(100);
      showToast('Order marked as Delivered! Enjoy your meal.');
    } else {
      setEtaRemaining(prev => Math.max(5, prev - 7));
      setMapProgress(prev => Math.min(95, prev + 20));
      showToast(`Status updated to: ${steps[nextIdx].label}`);
    }
  };

  if (!isTrackingOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs">
      <div className="bg-[#FAF5EF]/95 backdrop-blur-md rounded-3xl max-w-2xl w-full max-h-[94vh] overflow-hidden flex flex-col shadow-2xl text-[#262118]">
        {/* Header */}
        <div className="p-5 bg-[#3A2E24] text-[#FAF5EF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4E3E32] text-[#D4AF37] flex items-center justify-center font-bold">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-[#D2BBA0] uppercase font-mono">
                  LIVE ORDER TRACKER
                </span>
                <span className="bg-[#4E3E32] text-[#FAF5EF] text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono">
                  {order ? `#${order.id}` : 'LIVE'}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-[#FAF5EF] font-sans">
                {order?.status === 'delivered' ? 'Order Completed' : 'Delivering Hot & Crisp'}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-1.5 text-[#D2BBA0] hover:text-[#FAF5EF] rounded-full hover:bg-[#4E3E32] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tracking Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {order ? (
            <>
              {/* ETA Banner */}
              <div className="bg-[#F3ECE2] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#785E47] text-white flex items-center justify-center shadow-md shrink-0">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#785E47] uppercase tracking-wider font-mono">
                      Estimated Delivery Time
                    </span>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-[#262118] font-sans">
                      {order.status === 'delivered' ? 'Delivered' : `${etaRemaining} Minutes`}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-stone-600">
                    Deliver to: <strong className="text-[#262118]">{order.customer.area || 'Indiranagar'}</strong>
                  </span>
                  {/* Step status advance button for testing live tracker */}
                  <button
                    onClick={advanceToNextStatus}
                    className="bg-[#3A2E24] hover:bg-[#262118] text-[#FAF5EF] text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-2xs cursor-pointer font-mono transition-colors"
                    title="Simulate Next Live Step"
                  >
                    Simulate Step ➔
                  </button>
                </div>
              </div>

              {/* 5-Stage Step Progression */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#262118] font-mono">
                  Order Progression Timeline
                </h4>
                <div className="grid grid-cols-5 gap-1 relative">
                  {steps.map((st, idx) => {
                    const isDone = currentStepIdx >= idx;
                    const isCurrent = currentStepIdx === idx;
                    const Icon = st.icon;

                    return (
                      <div key={st.key} className="flex flex-col items-center text-center">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                            isCurrent
                              ? 'bg-[#8C7355] text-white ring-4 ring-[#EAE0D3] shadow-md scale-105'
                              : isDone
                              ? 'bg-[#3A2E24] text-white'
                              : 'bg-[#EAE0D3] text-stone-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-[10px] font-extrabold mt-1.5 line-clamp-1 ${
                            isDone ? 'text-[#262118]' : 'text-stone-400'
                          }`}
                        >
                          {st.label}
                        </span>
                        <span className="text-[9px] text-stone-400 hidden sm:inline leading-tight">
                          {st.sub}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Simulated Live Rider Map */}
              <div className="relative bg-[#EAE0D3] rounded-3xl overflow-hidden h-44 shadow-inner flex flex-col justify-between p-3">
                {/* Simulated Street Map background */}
                <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <rect width="400" height="200" fill="#E5DCD0" />
                  <path d="M 20 180 L 120 100 L 250 120 L 380 40" stroke="#FAF5EF" strokeWidth="16" fill="none" />
                  <path d="M 20 180 L 120 100 L 250 120 L 380 40" stroke="#D8CABE" strokeWidth="12" fill="none" />
                  {/* Route trail in warm brown */}
                  <path d="M 20 180 L 120 100 L 250 120" stroke="#785E47" strokeWidth="5" strokeDasharray="6 4" fill="none" />
                </svg>

                {/* Restaurant Source Marker */}
                <div className="relative z-10 flex items-center gap-1 bg-[#FAF5EF]/95 text-[#262118] text-[10px] font-bold px-2 py-1 rounded-lg shadow-xs self-start">
                  <span className="w-2 h-2 rounded-full bg-[#785E47]"></span>
                  <span>PARIMAS Kitchen (Indiranagar)</span>
                </div>

                {/* Animated Moving Rider Scooter Pin */}
                <div
                  className="relative z-20 self-start transition-all duration-700"
                  style={{
                    transform: `translate(${mapProgress * 3.2}px, -15px)`
                  }}
                >
                  <div className="bg-[#3A2E24] text-[#FAF5EF] p-2 rounded-full shadow-2xl flex items-center gap-1">
                    <Bike className="w-4 h-4 animate-bounce" />
                    <span className="text-[9px] font-bold text-white pr-1">Ramesh</span>
                  </div>
                </div>

                {/* Customer Destination Marker */}
                <div className="relative z-10 flex items-center gap-1 bg-[#FAF5EF]/95 text-[#262118] text-[10px] font-bold px-2 py-1 rounded-lg shadow-xs self-end">
                  <MapPin className="w-3.5 h-3.5 text-[#785E47]" />
                  <span>{order.customer.address ? `${order.customer.address.slice(0, 24)}...` : 'Your Address'}</span>
                </div>
              </div>

              {/* Delivery Partner Details Card */}
              {order.deliveryPartner && (
                <div className="bg-[#F3ECE2] p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#785E47] text-white font-mono font-extrabold flex items-center justify-center text-sm shadow-xs">
                      RS
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#262118] text-xs sm:text-sm font-sans">
                          {order.deliveryPartner.name}
                        </span>
                        <span className="text-[10px] bg-[#EAE0D3] text-[#3A2E24] font-bold px-1.5 py-0.2 rounded font-mono">
                          ★ 4.95
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono">
                        {order.deliveryPartner.vehicle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${order.deliveryPartner.phone}`}
                      className="p-2.5 bg-[#FAF5EF] hover:bg-[#EAE0D3] text-[#3A2E24] rounded-xl shadow-2xs transition-colors"
                      title="Call Delivery Partner"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => showToast('Messaging rider: "Please do not ring bell after 9pm"')}
                      className="p-2.5 bg-[#FAF5EF] hover:bg-[#EAE0D3] text-[#3A2E24] rounded-xl shadow-2xs transition-colors"
                      title="Send Rider Message"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Order Receipt Details Accordion */}
              <div className="rounded-2xl p-4 bg-[#F3ECE2] space-y-2">
                <div className="flex items-center justify-between font-bold text-[#262118] text-xs font-mono">
                  <span className="flex items-center gap-1.5">
                    <Receipt className="w-4 h-4 text-stone-400" />
                    <span>Order Receipt Breakdown</span>
                  </span>
                  <span>₹{order.total}</span>
                </div>
                <div className="divide-y divide-stone-200/50 text-[11px] text-[#3A2E24] pt-1">
                  {order.items.map((it) => (
                    <div key={it.cartItemId} className="py-1.5 flex justify-between">
                      <span>
                        {it.quantity}x {it.item.name} {it.selectedSize ? `(${it.selectedSize})` : ''}
                      </span>
                      <span className="font-semibold text-[#262118] font-mono">
                        ₹{it.customPrice * it.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 flex items-center justify-between text-[11px] text-[#785E47] font-bold font-mono">
                  <span>Loyalty Points Credited</span>
                  <span>+{order.loyaltyPointsEarned} PARIMAS Pts</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-stone-500">
              No recent order found to track. Place an order to see live tracking.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EAE0D3] flex justify-between items-center">
          <button
            onClick={() => {
              window.print?.();
            }}
            className="text-xs font-bold text-[#3A2E24] hover:text-[#262118] underline"
          >
            Print Tax Invoice
          </button>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="bg-[#3A2E24] hover:bg-[#262118] text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-xs transition-colors"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
