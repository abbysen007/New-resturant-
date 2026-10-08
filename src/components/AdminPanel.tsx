import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  ChefHat,
  Package,
  Layers,
  Calendar,
  AlertTriangle,
  Plus,
  CheckCircle2,
  Search,
  Clock,
  Sparkles,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem, OrderStatus } from '../types/restaurant';

export const AdminPanel: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    menuItems,
    toggleStockItem,
    toggleSpecialItem,
    addDailySpecial,
    orders,
    updateOrderStatus,
    reservations,
    updateReservationStatus,
    inventory,
    updateInventoryStock,
    showToast
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<'analytics' | 'kds' | 'menu' | 'inventory' | 'reservations'>('analytics');
  const [menuSearch, setMenuSearch] = useState('');
  const [showAddSpecialModal, setShowAddSpecialModal] = useState(false);

  // New Special form state
  const [newSpecialName, setNewSpecialName] = useState('');
  const [newSpecialCategory, setNewSpecialCategory] = useState<MenuItem['category']>('dosas');
  const [newSpecialPrice, setNewSpecialPrice] = useState(210);
  const [newSpecialDesc, setNewSpecialDesc] = useState('');
  const [newSpecialSpice, setNewSpecialSpice] = useState<0 | 1 | 2 | 3>(2);

  if (!isAdminOpen) return null;

  // Real-time sales calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.payment.status === 'paid' ? o.total : 0), 0) + 14850;
  const totalOrdersCount = orders.length + 28;
  const avgOrderValue = Math.round(totalRevenue / totalOrdersCount);
  const deliveryOrders = orders.filter(o => o.orderType === 'delivery').length + 18;
  const dineInOrders = orders.filter(o => o.orderType === 'dine-in').length + 8;

  const handleAddSpecialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpecialName.trim() || !newSpecialDesc.trim()) return;
    addDailySpecial({
      name: newSpecialName.trim(),
      category: newSpecialCategory,
      price: newSpecialPrice,
      description: newSpecialDesc.trim(),
      diet: 'veg',
      spiceLevel: newSpecialSpice,
      isSpecial: true,
      inStock: true,
      prepTimeMinutes: 12
    });
    setNewSpecialName('');
    setNewSpecialDesc('');
    setShowAddSpecialModal(false);
    showToast(`Added "${newSpecialName}" to live daily specials`);
  };

  const filteredMenuItems = menuItems.filter(m =>
    m.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
    m.category.toLowerCase().includes(menuSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#2C1810]/75 backdrop-blur-md">
      {/* Beige & Brown Executive Admin Container */}
      <div className="bg-[#FAF7F2] text-[#2C1810] rounded-3xl max-w-5xl w-full h-[94vh] flex flex-col shadow-2xl border-2 border-[#D7CCC8] overflow-hidden font-sans">
        
        {/* Executive Header in Rich Espresso Brown */}
        <div className="p-4 sm:p-5 border-b border-[#4E342E] bg-[#3E2723] text-[#FAF7F2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5D4037] border border-[#6D4C41] text-[#D7CCC8] flex items-center justify-center shadow-xs">
              <ChefHat className="w-5 h-5 text-[#EFEBE6]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D7CCC8] font-mono">
                  PARIMAS OPERATIONS CONSOLE
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] text-[#A1887F] font-mono">LIVE KITCHEN FEED</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white font-sans tracking-tight">
                Staff Management & Real-Time Analytics
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 text-[#D7CCC8] hover:text-white rounded-full hover:bg-[#4E342E] transition-colors cursor-pointer"
            title="Close Admin Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Navigation Tabs in Warm Sand / Cream */}
        <div className="bg-[#EFE8DD] border-b border-[#D7CCC8] px-4 sm:px-6 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar text-xs font-bold tracking-wider uppercase font-mono py-2">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-[#4E342E] text-white shadow-xs font-bold'
                : 'text-[#5D4037] hover:text-[#2C1810] hover:bg-[#E4D9CB]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Sales & Reports</span>
          </button>

          <button
            onClick={() => setActiveTab('kds')}
            className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer relative ${
              activeTab === 'kds'
                ? 'bg-[#4E342E] text-white shadow-xs font-bold'
                : 'text-[#5D4037] hover:text-[#2C1810] hover:bg-[#E4D9CB]'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>Live Kitchen (KDS)</span>
            <span className="bg-[#8D6E63] text-white text-[10px] font-mono px-1.5 py-0.2 rounded-full">
              {orders.filter(o => o.status !== 'delivered').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'menu'
                ? 'bg-[#4E342E] text-white shadow-xs font-bold'
                : 'text-[#5D4037] hover:text-[#2C1810] hover:bg-[#E4D9CB]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Menu & 86-ing</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-[#4E342E] text-white shadow-xs font-bold'
                : 'text-[#5D4037] hover:text-[#2C1810] hover:bg-[#E4D9CB]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Inventory Stocks</span>
            {inventory.some(i => i.isLow) && (
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('reservations')}
            className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'reservations'
                ? 'bg-[#4E342E] text-white shadow-xs font-bold'
                : 'text-[#5D4037] hover:text-[#2C1810] hover:bg-[#E4D9CB]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Reservations Desk</span>
            <span className="text-[#8D6E63] font-mono">({reservations.length})</span>
          </button>
        </div>

        {/* Panel Main Area in Beige & Brown Theme */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs space-y-6 bg-[#FAF7F2]">
          
          {/* TAB 1: REAL-TIME SALES & REPORTS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Stat Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#E0D7CC] shadow-xs space-y-1">
                  <span className="text-[#795548] text-[10px] font-bold uppercase font-mono tracking-wider">
                    Today's Revenue
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-[#2C1810] font-mono tabular-nums">
                    ₹{totalRevenue.toLocaleString()}
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono inline-block">
                    ▲ +18.4% vs Yesterday
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E0D7CC] shadow-xs space-y-1">
                  <span className="text-[#795548] text-[10px] font-bold uppercase font-mono tracking-wider">
                    Total Orders
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-[#2C1810] font-mono tabular-nums">
                    {totalOrdersCount}
                  </div>
                  <span className="text-[#5D4037] bg-[#F5EFE6] px-2 py-0.5 rounded-full text-[10px] font-mono inline-block">
                    Avg Ticket: ₹{avgOrderValue}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E0D7CC] shadow-xs space-y-1">
                  <span className="text-[#795548] text-[10px] font-bold uppercase font-mono tracking-wider">
                    Dine-In Covers
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-[#4E342E] font-mono tabular-nums">
                    84%
                  </div>
                  <span className="text-[#5D4037] bg-[#F5EFE6] px-2 py-0.5 rounded-full text-[10px] font-mono inline-block">
                    Peak: Courtyard Hall
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E0D7CC] shadow-xs space-y-1">
                  <span className="text-[#795548] text-[10px] font-bold uppercase font-mono tracking-wider">
                    Delivery Orders
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-[#2C1810] font-mono tabular-nums">
                    {Math.round((deliveryOrders / totalOrdersCount) * 100)}%
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono inline-block">
                    Avg Dispatch: 24 Mins
                  </span>
                </div>
              </div>

              {/* Hourly Sales Visual Chart in Mocha & Sand */}
              <div className="bg-white p-5 rounded-2xl border border-[#E0D7CC] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-[#2C1810] text-sm font-sans">
                      Hourly Kitchen Sales Velocity
                    </h3>
                    <p className="text-[11px] text-[#795548]">Live order count across peak tiffin & dinner services</p>
                  </div>
                  <span className="text-[#8D6E63] font-mono text-[10px] bg-[#F5EFE6] px-2.5 py-1 rounded-lg">
                    Real-Time Feed
                  </span>
                </div>

                <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2 border-b border-[#EDE5DA]">
                  {[
                    { hour: '7 AM', val: 35, orders: 8 },
                    { hour: '8 AM', val: 78, orders: 19 },
                    { hour: '9 AM', val: 95, orders: 24 },
                    { hour: '10 AM', val: 60, orders: 14 },
                    { hour: '12 PM', val: 85, orders: 22 },
                    { hour: '1 PM', val: 100, orders: 29 },
                    { hour: '2 PM', val: 70, orders: 17 },
                    { hour: '5 PM', val: 55, orders: 12 },
                    { hour: '7 PM', val: 90, orders: 25 },
                    { hour: '8 PM', val: 92, orders: 26 }
                  ].map(bar => (
                    <div key={bar.hour} className="flex-1 flex flex-col items-center gap-1 group">
                      <div className="text-[9px] text-[#4E342E] opacity-0 group-hover:opacity-100 font-mono font-bold">
                        {bar.orders} ord
                      </div>
                      <div
                        className="w-full bg-[#8D6E63] group-hover:bg-[#4E342E] rounded-t-md transition-colors"
                        style={{ height: `${bar.val}%` }}
                      ></div>
                      <span className="text-[9px] text-[#795548] font-mono mt-1 font-bold">{bar.hour}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Rankings & Kitchen Velocity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#E0D7CC] shadow-xs space-y-3">
                  <h4 className="font-bold text-[#2C1810] text-xs font-sans uppercase tracking-wider">
                    Top 4 Best-Selling Dishes Today
                  </h4>
                  <div className="space-y-2">
                    {[
                      { name: 'PARIMAS Golden Ghee Roast', sold: 48, revenue: 8640 },
                      { name: 'Kumbakonam Degree Filter Kaapi', sold: 62, revenue: 4960 },
                      { name: 'Grand PARIMAS Banana Leaf Thali', sold: 24, revenue: 8640 },
                      { name: 'Bidadi Thatte Idli Duo', sold: 31, revenue: 4960 }
                    ].map((d, i) => (
                      <div key={d.name} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE9DF]">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-5 h-5 rounded-full bg-[#4E342E] text-white font-mono text-[10px] flex items-center justify-center font-bold shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-[#2C1810] font-bold text-xs truncate">{d.name}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[#3E2723] font-mono font-bold text-xs">₹{d.revenue}</span>
                          <span className="text-[#8D6E63] text-[10px] ml-1.5 font-mono">({d.sold} sold)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E0D7CC] shadow-xs space-y-3">
                  <h4 className="font-bold text-[#2C1810] text-xs font-sans uppercase tracking-wider">
                    Kitchen Metrics & Dispatch SLAs
                  </h4>
                  <div className="space-y-2.5 text-[#5D4037]">
                    <div className="flex justify-between items-center p-2 rounded-xl bg-[#FAF7F2]">
                      <span className="font-medium">Average Tawa Prep Time</span>
                      <span className="font-mono font-bold text-[#2C1810]">11.4 mins</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-[#FAF7F2]">
                      <span className="font-medium">Order Accuracy Rate</span>
                      <span className="font-mono font-bold text-emerald-700">99.2%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-[#FAF7F2]">
                      <span className="font-medium">Active Delivery Couriers</span>
                      <span className="font-mono font-bold text-[#4E342E]">6 Riders</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-[#FAF7F2]">
                      <span className="font-medium">Patron Satisfaction Score</span>
                      <span className="font-mono font-bold text-[#4E342E]">4.92 / 5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE KITCHEN DISPLAY (KDS) */}
          {activeTab === 'kds' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#2C1810] text-sm font-sans">
                    Live Active Kitchen Tickets ({orders.length})
                  </h3>
                  <p className="text-[#795548] text-[11px]">
                    Direct staff triggers to advance order status in real time.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white rounded-2xl border-2 border-[#D7CCC8] p-4 space-y-3 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      {/* Ticket Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-[#EDE5DA]">
                        <div>
                          <span className="font-mono font-bold text-[#3E2723] text-sm">
                            #{ord.id}
                          </span>
                          <div className="text-[10px] text-[#795548] capitalize font-mono">
                            {ord.orderType} · {ord.customer.name}
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase font-mono ${
                            ord.status === 'confirmed'
                              ? 'bg-amber-100 text-[#4E342E] border border-[#D7CCC8]'
                              : ord.status === 'preparing'
                              ? 'bg-[#EFE8DD] text-[#3E2723] border border-[#BCAAA4]'
                              : ord.status === 'ready'
                              ? 'bg-[#D7CCC8] text-[#2C1810]'
                              : ord.status === 'out_for_delivery'
                              ? 'bg-[#8D6E63] text-white'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {ord.status.replace(/_/g, ' ')}
                        </span>
                      </div>

                      {/* Items List */}
                      <div className="py-2 space-y-1.5 text-[#2C1810]">
                        {ord.items.map((it) => (
                          <div key={it.cartItemId} className="flex justify-between items-start">
                            <div>
                              <span className="font-bold text-[#4E342E] font-mono">
                                {it.quantity}x
                              </span>{' '}
                              <span className="font-medium text-xs">{it.item.name}</span>
                              {it.selectedSize && (
                                <div className="text-[10px] text-[#8D6E63] pl-4 font-mono">
                                  Size: {it.selectedSize}
                                </div>
                              )}
                              {it.selectedAccompaniments.length > 0 && (
                                <div className="text-[10px] text-[#8D6E63] pl-4 font-mono">
                                  + {it.selectedAccompaniments.join(', ')}
                                </div>
                              )}
                              {it.specialInstructions && (
                                <div className="text-[10px] text-[#6D4C41] italic pl-4">
                                  Note: "{it.specialInstructions}"
                                </div>
                              )}
                            </div>
                            <span className="font-mono text-[#5D4037] text-[11px] tabular-nums font-bold">
                              ₹{it.customPrice * it.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status Advance Action */}
                    <div className="pt-2 border-t border-[#EDE5DA] space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#795548] font-mono">
                        <span>Total: <strong className="text-[#2C1810]">₹{ord.total}</strong></span>
                        <span>{ord.payment.method.toUpperCase()} ({ord.payment.status})</span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        {ord.status === 'confirmed' && (
                          <button
                            onClick={() => {
                              updateOrderStatus(ord.id, 'preparing');
                              showToast(`Order #${ord.id} sent to tawa chefs`);
                            }}
                            className="col-span-2 bg-[#5D4037] hover:bg-[#4E342E] text-white font-bold py-2 rounded-xl text-center font-mono cursor-pointer transition-colors"
                          >
                            🍳 Start Preparing
                          </button>
                        )}
                        {ord.status === 'preparing' && (
                          <button
                            onClick={() => {
                              updateOrderStatus(ord.id, 'ready');
                              showToast(`Order #${ord.id} packed & ready`);
                            }}
                            className="col-span-2 bg-[#6D4C41] hover:bg-[#5D4037] text-white font-bold py-2 rounded-xl text-center font-mono cursor-pointer transition-colors"
                          >
                            📦 Mark Ready & Sealed
                          </button>
                        )}
                        {ord.status === 'ready' && (
                          <button
                            onClick={() => {
                              updateOrderStatus(ord.id, 'out_for_delivery');
                              showToast(`Order #${ord.id} handed to delivery partner`);
                            }}
                            className="col-span-2 bg-[#4E342E] hover:bg-[#3E2723] text-white font-bold py-2 rounded-xl text-center font-mono cursor-pointer transition-colors"
                          >
                            🛵 Dispatch to Courier
                          </button>
                        )}
                        {ord.status === 'out_for_delivery' && (
                          <button
                            onClick={() => {
                              updateOrderStatus(ord.id, 'delivered');
                              showToast(`Order #${ord.id} confirmed delivered`);
                            }}
                            className="col-span-2 bg-[#2D4522] hover:bg-[#1E3017] text-white font-bold py-2 rounded-xl text-center font-mono cursor-pointer transition-colors"
                          >
                            ✓ Mark Delivered
                          </button>
                        )}
                        {ord.status === 'delivered' && (
                          <div className="col-span-2 text-center text-emerald-800 bg-emerald-50 font-bold py-1.5 rounded-xl font-mono">
                            ✓ Order Completed
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MENU CUSTOMIZATION & INSTANT 86-ING */}
          {activeTab === 'menu' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-[#2C1810] text-sm font-sans">
                    Menu Management & Stock Control
                  </h3>
                  <p className="text-[#795548] text-[11px]">
                    Instantly 86 items when batter or ingredients deplete.
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-60">
                    <input
                      type="text"
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      placeholder="Filter dishes..."
                      className="w-full bg-white border border-[#D7CCC8] rounded-xl pl-3 pr-8 py-1.5 text-[#2C1810] text-xs focus:outline-none focus:ring-1 focus:ring-[#5D4037]"
                    />
                    <Search className="w-3.5 h-3.5 text-[#8D6E63] absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    onClick={() => setShowAddSpecialModal(true)}
                    className="bg-[#4E342E] hover:bg-[#3E2723] text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shrink-0 font-mono cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Special</span>
                  </button>
                </div>
              </div>

              {/* Menu Items Table with Crisp Alignment */}
              <div className="bg-white rounded-2xl border border-[#D7CCC8] overflow-hidden shadow-xs">
                <div className="bg-[#F5EFE6] px-4 py-2.5 text-[10px] font-bold text-[#5D4037] uppercase font-mono tracking-wider flex items-center justify-between border-b border-[#E0D7CC]">
                  <span>Dish Information</span>
                  <div className="flex items-center gap-8 mr-2">
                    <span>Price</span>
                    <span>Special Badge</span>
                    <span>Stock Status</span>
                  </div>
                </div>

                <div className="divide-y divide-[#EDE5DA]">
                  {filteredMenuItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-[#FAF7F2] transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-3.5 h-3.5 rounded-xs border-2 flex items-center justify-center p-0.5 shrink-0 ${
                            item.diet === 'veg' ? 'border-emerald-600' : 'border-red-600'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.diet === 'veg' ? 'bg-emerald-600' : 'bg-red-600'
                            }`}
                          />
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-[#2C1810] text-xs sm:text-sm flex items-center gap-2 truncate">
                            <span>{item.name}</span>
                            {item.isSpecial && (
                              <span className="text-[9px] bg-[#EFE8DD] text-[#3E2723] border border-[#D7CCC8] px-1.5 rounded font-bold font-mono">
                                SPECIAL
                              </span>
                            )}
                          </div>
                          <div className="text-[#795548] text-[10px] uppercase font-mono">
                            Category: {item.category} · Prep: {item.prepTimeMinutes} mins
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                        <div className="text-right w-16">
                          <span className="font-mono font-bold text-[#2C1810] text-sm tabular-nums">
                            ₹{item.price}
                          </span>
                        </div>

                        {/* Chef Special Toggle */}
                        <button
                          onClick={() => {
                            toggleSpecialItem(item.id);
                            showToast(`Toggled Chef Special status for ${item.name}`);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer font-mono ${
                            item.isSpecial
                              ? 'bg-[#EFE8DD] text-[#3E2723] border-[#BCAAA4]'
                              : 'text-[#8D6E63] border-[#D7CCC8] hover:text-[#2C1810]'
                          }`}
                        >
                          ★ Special
                        </button>

                        {/* Instant 86-ing Switch */}
                        <button
                          onClick={() => {
                            toggleStockItem(item.id);
                            showToast(`${item.name} is now ${item.inStock ? '86-ed (Sold Out)' : 'In Stock'}`);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-mono ${
                            item.inStock
                              ? 'bg-[#4E342E] hover:bg-[#3E2723] text-white shadow-xs'
                              : 'bg-red-700 hover:bg-red-800 text-white animate-pulse'
                          }`}
                        >
                          {item.inStock ? 'In Stock' : '86 / Sold Out'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INVENTORY STOCKS & RAW MATERIALS */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#2C1810] text-sm font-sans">
                    Kitchen Commodities & Live Stock Counts
                  </h3>
                  <p className="text-[#795548] text-[11px]">
                    Track vital South Indian commodities (Batter, Ghee, Filter Kaapi, Leaves).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inventory.map((inv) => (
                  <div
                    key={inv.id}
                    className={`bg-white p-4 rounded-2xl border ${
                      inv.isLow ? 'border-amber-600 bg-amber-50/50' : 'border-[#D7CCC8]'
                    } space-y-3 shadow-xs`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#795548] font-bold">
                          {inv.category}
                        </span>
                        <h4 className="font-bold text-[#2C1810] text-sm mt-0.5">{inv.name}</h4>
                      </div>
                      {inv.isLow && (
                        <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                          <AlertTriangle className="w-3 h-3" />
                          <span>LOW</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                      <div>
                        <span className="text-2xl font-black font-mono text-[#2C1810] tabular-nums">
                          {inv.currentStock}
                        </span>
                        <span className="text-[#795548] text-xs ml-1 font-mono">{inv.unit}</span>
                      </div>
                      <span className="text-[11px] text-[#8D6E63] font-mono">
                        Min threshold: {inv.minimumStock} {inv.unit}
                      </span>
                    </div>

                    {/* Stock Adjustment Stepper in Beige/Brown */}
                    <div className="pt-2 border-t border-[#EDE5DA] flex items-center justify-between gap-2">
                      <button
                        onClick={() => updateInventoryStock(inv.id, Math.max(0, inv.currentStock - 5))}
                        className="flex-1 py-1.5 bg-[#F5EFE6] hover:bg-[#EFE9DF] text-[#4E342E] border border-[#D7CCC8] rounded-xl font-bold font-mono cursor-pointer transition-colors"
                      >
                        -5 {inv.unit}
                      </button>
                      <button
                        onClick={() => updateInventoryStock(inv.id, inv.currentStock + 10)}
                        className="flex-1 py-1.5 bg-[#4E342E] hover:bg-[#3E2723] text-white rounded-xl font-bold font-mono cursor-pointer transition-colors shadow-xs"
                      >
                        +10 {inv.unit}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TABLE RESERVATIONS */}
          {activeTab === 'reservations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#2C1810] text-sm font-sans">
                    Table Reservations Desk ({reservations.length})
                  </h3>
                  <p className="text-[#795548] text-[11px]">
                    Manage upcoming guest seatings for Banana Leaf and AC Courtyard.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#D7CCC8] overflow-hidden divide-y divide-[#EDE5DA] shadow-xs">
                {reservations.map((res) => (
                  <div key={res.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-[#FAF7F2] transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#4E342E]">#{res.id}</span>
                        <span className="font-bold text-[#2C1810] text-sm">{res.guestName}</span>
                        <span className="text-[10px] bg-[#F5EFE6] text-[#5D4037] border border-[#D7CCC8] px-2 py-0.5 rounded-full font-mono">
                          {res.guestsCount} Guests
                        </span>
                      </div>
                      <div className="text-[11px] text-[#795548] font-mono">
                        {res.date} · {res.timeSlot} · Hall: <strong className="text-[#3E2723] capitalize">{res.diningArea.replace(/-/g, ' ')}</strong>
                      </div>
                      <div className="text-[10px] text-[#8D6E63]">
                        Phone: {res.phone} {res.specialRequests && `· Note: "${res.specialRequests}"`}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase font-mono ${
                          res.status === 'confirmed'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : res.status === 'seated'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {res.status}
                      </span>

                      {res.status === 'confirmed' && (
                        <button
                          onClick={() => {
                            updateReservationStatus(res.id, 'seated');
                            showToast(`Guest ${res.guestName} marked as Seated`);
                          }}
                          className="bg-[#4E342E] hover:bg-[#3E2723] text-white font-bold px-3 py-1.5 rounded-xl text-xs font-mono cursor-pointer"
                        >
                          Mark Seated
                        </button>
                      )}

                      {res.status !== 'cancelled' && (
                        <button
                          onClick={() => {
                            updateReservationStatus(res.id, 'cancelled');
                            showToast(`Reservation #${res.id} cancelled`);
                          }}
                          className="bg-[#F5EFE6] hover:bg-[#EFE9DF] text-[#795548] px-2.5 py-1.5 rounded-xl text-xs font-mono cursor-pointer border border-[#D7CCC8]"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal for adding Daily Special */}
        {showAddSpecialModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#2C1810]/80 backdrop-blur-xs">
            <div className="bg-[#FAF7F2] border-2 border-[#D7CCC8] text-[#2C1810] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#D7CCC8]">
                <h4 className="font-extrabold text-base text-[#3E2723] font-sans">Add Today's Daily Special</h4>
                <button
                  onClick={() => setShowAddSpecialModal(false)}
                  className="text-[#795548] hover:text-[#2C1810] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddSpecialSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#5D4037] mb-1 font-bold">Special Dish Name</label>
                  <input
                    type="text"
                    required
                    value={newSpecialName}
                    onChange={(e) => setNewSpecialName(e.target.value)}
                    placeholder="e.g. Jackfruit Podi Roast Dosa"
                    className="w-full bg-white border border-[#D7CCC8] rounded-xl px-3 py-2 text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#5D4037]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#5D4037] mb-1 font-bold">Category</label>
                    <select
                      value={newSpecialCategory}
                      onChange={(e) => setNewSpecialCategory(e.target.value as any)}
                      className="w-full bg-white border border-[#D7CCC8] rounded-xl px-3 py-2 text-[#2C1810] focus:outline-none"
                    >
                      <option value="dosas">Signature Dosas</option>
                      <option value="tiffin">Tiffin & Idli-Vada</option>
                      <option value="thalis">Banana Leaf Thalis</option>
                      <option value="curries">Curries</option>
                      <option value="rice">Rice & Parottas</option>
                      <option value="beverages">Kaapi & Sweets</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#5D4037] mb-1 font-bold font-mono">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newSpecialPrice}
                      onChange={(e) => setNewSpecialPrice(Number(e.target.value))}
                      className="w-full bg-white border border-[#D7CCC8] rounded-xl px-3 py-2 text-[#2C1810] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#5D4037] mb-1 font-bold">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={newSpecialDesc}
                    onChange={(e) => setNewSpecialDesc(e.target.value)}
                    placeholder="Crisp tawa roasted with tender raw jackfruit palya..."
                    className="w-full bg-white border border-[#D7CCC8] rounded-xl px-3 py-2 text-[#2C1810] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddSpecialModal(false)}
                    className="px-4 py-2 rounded-xl text-[#795548] hover:text-[#2C1810] font-mono cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#4E342E] hover:bg-[#3E2723] text-white font-bold px-4 py-2 rounded-xl font-mono cursor-pointer shadow-xs"
                  >
                    Add Special to Menu
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Executive Console Footer */}
        <div className="p-3 bg-[#3E2723] text-[#D7CCC8] border-t border-[#4E342E] flex items-center justify-between text-[11px] px-6">
          <div className="flex items-center gap-2 font-mono">
            <span>Staff Desk: Kitchen Master & Operations Manager</span>
            <span>·</span>
            <span>Indiranagar Central Hub</span>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="text-[#D7CCC8] hover:text-white underline font-mono cursor-pointer"
          >
            Exit Ops Console
          </button>
        </div>
      </div>
    </div>
  );
};
