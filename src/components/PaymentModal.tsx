import React, { useState } from 'react';
import { X, QrCode, CreditCard, Landmark, Banknote, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const PaymentModal: React.FC = () => {
  const {
    isPaymentOpen,
    setIsPaymentOpen,
    cartTotals,
    placeOrder,
    setIsTrackingOpen,
    showToast
  } = useRestaurant();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('ananya@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8819');
  const [expiry, setExpiry] = useState('08/29');
  const [cvv, setCvv] = useState('321');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isPaymentOpen) return null;

  const handlePay = (methodOverride?: 'upi' | 'card' | 'netbanking' | 'cod') => {
    setIsProcessing(true);

    const savedCustomerStr = window.sessionStorage.getItem('dakshin_pending_customer');
    let customerData = {
      name: 'Ananya Raghavan',
      phone: '+91 98765 43210',
      email: 'ananya.r@example.com',
      address: 'Flat 402, Shanthi Nilayam, Indiranagar',
      area: 'Indiranagar'
    };

    if (savedCustomerStr) {
      try {
        customerData = JSON.parse(savedCustomerStr);
      } catch (e) {
        // fallback
      }
    }

    const chosenMethod = methodOverride || paymentMethod;

    setTimeout(() => {
      const order = placeOrder(customerData, {
        method: chosenMethod,
        status: chosenMethod === 'cod' ? 'pending' : 'paid',
        transactionId: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`
      });

      setIsProcessing(false);
      setIsPaymentOpen(false);
      setIsTrackingOpen(true);
      showToast(`Order #${order.id} placed successfully! Tracking your delivery.`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs">
      <div className="bg-[#FAF5EF]/95 backdrop-blur-md rounded-3xl max-w-md w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl text-[#262118]">
        {/* Header */}
        <div className="p-5 bg-[#EFE8DE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#6E553E]" />
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#785E47] uppercase font-mono">
                SECURE 256-BIT ENCRYPTED GATEWAY
              </span>
              <h3 className="text-base font-extrabold text-[#262118] font-sans">
                Complete Payment · <span className="font-mono">₹{cartTotals.total}</span>
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsPaymentOpen(false)}
            disabled={isProcessing}
            className="p-1.5 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Payment Methods Tabs */}
        <div className="p-4 bg-[#EAE0D3] grid grid-cols-4 gap-1.5 text-xs font-bold font-mono">
          <button
            onClick={() => setPaymentMethod('upi')}
            className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 transition-all ${
              paymentMethod === 'upi' ? 'bg-[#FAF5EF] text-[#262118] shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <QrCode className="w-4 h-4 text-[#6E553E]" />
            <span>UPI / QR</span>
          </button>
          <button
            onClick={() => setPaymentMethod('card')}
            className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 transition-all ${
              paymentMethod === 'card' ? 'bg-[#FAF5EF] text-[#262118] shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <CreditCard className="w-4 h-4 text-[#6E553E]" />
            <span>Card</span>
          </button>
          <button
            onClick={() => setPaymentMethod('netbanking')}
            className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 transition-all ${
              paymentMethod === 'netbanking' ? 'bg-[#FAF5EF] text-[#262118] shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Landmark className="w-4 h-4 text-[#6E553E]" />
            <span>NetBank</span>
          </button>
          <button
            onClick={() => setPaymentMethod('cod')}
            className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 transition-all ${
              paymentMethod === 'cod' ? 'bg-[#FAF5EF] text-[#262118] shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Banknote className="w-4 h-4 text-[#6E553E]" />
            <span>Cash</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* UPI Mode */}
          {paymentMethod === 'upi' && (
            <div className="space-y-4 text-center">
              <div className="bg-[#F2ECE3] p-4 rounded-2xl flex flex-col items-center justify-center">
                {/* Simulated QR Code SVG */}
                <div className="w-36 h-36 bg-white p-2 rounded-xl shadow-xs flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <rect x="5" y="5" width="25" height="25" fill="#1C1917" />
                    <rect x="9" y="9" width="17" height="17" fill="#FFFFFF" />
                    <rect x="13" y="13" width="9" height="9" fill="#1C1917" />

                    <rect x="70" y="5" width="25" height="25" fill="#1C1917" />
                    <rect x="74" y="9" width="17" height="17" fill="#FFFFFF" />
                    <rect x="78" y="13" width="9" height="9" fill="#1C1917" />

                    <rect x="5" y="70" width="25" height="25" fill="#1C1917" />
                    <rect x="9" y="74" width="17" height="17" fill="#FFFFFF" />
                    <rect x="13" y="78" width="9" height="9" fill="#1C1917" />

                    {/* QR Code pattern dots */}
                    <rect x="35" y="10" width="5" height="10" fill="#1C1917" />
                    <rect x="45" y="15" width="15" height="5" fill="#1C1917" />
                    <rect x="35" y="35" width="30" height="30" fill="#B45309" rx="4" />
                    <rect x="70" y="40" width="10" height="20" fill="#1C1917" />
                    <rect x="40" y="75" width="15" height="10" fill="#1C1917" />
                    <rect x="70" y="70" width="20" height="15" fill="#1C1917" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-stone-700 mt-2">
                  Scan with GPay, PhonePe, Paytm, or BHIM
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  UPI ID: parimasartisanal@icici
                </span>
              </div>

              <div>
                <label className="block text-left text-stone-700 font-semibold mb-1">
                  Or Enter Your VPA / UPI ID
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full bg-[#F2ECE3] rounded-xl px-3 py-2 text-[#262118] focus:outline-none focus:ring-2 focus:ring-[#785E47] font-mono text-xs"
                />
              </div>
            </div>
          )}

          {/* Card Mode */}
          {paymentMethod === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-[#F2ECE3] rounded-xl px-3 py-2 text-[#262118] font-mono focus:outline-none focus:ring-2 focus:ring-[#785E47] text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Valid Thru (MM/YY)</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full bg-[#F2ECE3] rounded-xl px-3 py-2 text-[#262118] font-mono focus:outline-none focus:ring-2 focus:ring-[#785E47] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">CVV / CVC</label>
                  <input
                    type="password"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full bg-[#F2ECE3] rounded-xl px-3 py-2 text-[#262118] font-mono focus:outline-none focus:ring-2 focus:ring-[#785E47] text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Net Banking Mode */}
          {paymentMethod === 'netbanking' && (
            <div className="space-y-3">
              <label className="block text-stone-700 font-semibold">Select Popular Bank</label>
              <div className="grid grid-cols-2 gap-2">
                {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map(bank => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => setSelectedBank(bank)}
                    className={`p-3 rounded-xl text-center font-bold text-xs transition-colors ${
                      selectedBank === bank
                        ? 'bg-[#EAE0D3] text-[#4A3828] shadow-xs'
                        : 'bg-[#F2ECE3] text-stone-700 hover:bg-[#EAE0D3]/60'
                    }`}
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cash on Delivery Mode */}
          {paymentMethod === 'cod' && (
            <div className="bg-[#EAE0D3] p-4 rounded-2xl text-center space-y-2">
              <Banknote className="w-8 h-8 text-[#785E47] mx-auto" />
              <h4 className="font-bold text-[#262118] text-xs">Cash / UPI on Delivery</h4>
              <p className="text-[11px] text-stone-600">
                You can pay using Cash or scan our delivery partner’s QR code upon arrival at your doorstep.
              </p>
            </div>
          )}

          {/* Security Seal */}
          <div className="flex items-center justify-center gap-2 text-stone-400 text-[11px] pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Bank-grade security · RBI compliant tokenization</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#EFE8DE] space-y-2">
          <button
            onClick={() => handlePay()}
            disabled={isProcessing}
            className="w-full bg-[#6E553E] hover:bg-[#584330] active:scale-98 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 font-mono"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Authorizing Payment...</span>
              </span>
            ) : (
              <span>Pay & Confirm Order (₹{cartTotals.total})</span>
            )}
          </button>

          {/* Instant 1-Click Test Checkout */}
          <button
            onClick={() => handlePay('upi')}
            disabled={isProcessing}
            className="w-full bg-[#3D3025] hover:bg-[#2C2219] text-[#EFE8DE] hover:text-white text-xs font-bold py-2 rounded-xl transition-colors font-mono cursor-pointer"
          >
            ⚡ 1-Click Fast Demo Pay (Skip Input)
          </button>
        </div>
      </div>
    </div>
  );
};
