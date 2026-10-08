import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MenuItem,
  CartItem,
  Order,
  OrderStatus,
  OrderType,
  TableReservation,
  Review,
  OutletLocation,
  LoyaltyUser,
  InventoryItem
} from '../types/restaurant';
import {
  INITIAL_MENU_ITEMS,
  OUTLET_LOCATIONS,
  INITIAL_REVIEWS,
  INITIAL_LOYALTY_USER,
  INITIAL_INVENTORY
} from '../data/menuData';

interface CartTotals {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  tip: number;
  total: number;
  pointsToEarn: number;
}

interface RestaurantContextType {
  // Menu
  menuItems: MenuItem[];
  updateMenuItem: (updated: MenuItem) => void;
  toggleStockItem: (id: string) => void;
  toggleSpecialItem: (id: string) => void;
  addDailySpecial: (item: Omit<MenuItem, 'id'>) => void;

  // Cart
  cart: CartItem[];
  addToCart: (
    item: MenuItem,
    customization?: {
      size?: string;
      spice?: string;
      accompaniments?: string[];
      specialInstructions?: string;
    },
    quantity?: number
  ) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  appliedPromo: string | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  tipAmount: number;
  setTipAmount: (amount: number) => void;
  redeemedPoints: number;
  setRedeemedPoints: (points: number) => void;
  cartTotals: CartTotals;

  // Orders
  orders: Order[];
  currentActiveOrder: Order | null;
  setCurrentActiveOrder: (order: Order | null) => void;
  placeOrder: (customer: Order['customer'], payment: Order['payment']) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Reservations
  reservations: TableReservation[];
  createReservation: (data: Omit<TableReservation, 'id' | 'createdAt' | 'status'>) => TableReservation;
  updateReservationStatus: (id: string, status: TableReservation['status']) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'verifiedDiner'>) => void;

  // Loyalty
  loyaltyUser: LoyaltyUser;
  claimVoucher: (voucherId: string) => boolean;

  // Inventory
  inventory: InventoryItem[];
  updateInventoryStock: (id: string, newStock: number) => void;

  // Outlets
  outlets: OutletLocation[];
  selectedOutlet: OutletLocation;
  setSelectedOutlet: (outlet: OutletLocation) => void;
  deliveryAreaSearch: string;
  setDeliveryAreaSearch: (search: string) => void;

  // UI Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isPaymentOpen: boolean;
  setIsPaymentOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  isLoyaltyOpen: boolean;
  setIsLoyaltyOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isUserPanelOpen: boolean;
  setIsUserPanelOpen: (open: boolean) => void;
  customizingItem: MenuItem | null;
  setCustomizingItem: (item: MenuItem | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MENU: 'dakshin_menu_items_v1',
  CART: 'dakshin_cart_v1',
  ORDERS: 'dakshin_orders_v1',
  RESERVATIONS: 'dakshin_reservations_v1',
  REVIEWS: 'dakshin_reviews_v1',
  LOYALTY: 'dakshin_loyalty_v1',
  INVENTORY: 'dakshin_inventory_v1'
};

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Menu items with local storage fallback
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MENU);
      return stored ? JSON.parse(stored) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscountAmount, setPromoDiscountAmount] = useState<number>(0);
  const [tipAmount, setTipAmount] = useState<number>(30);
  const [redeemedPoints, setRedeemedPoints] = useState<number>(0);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (stored) return JSON.parse(stored);
      // Demo active initial order for immediate testing
      const initialDemoOrder: Order = {
        id: 'DKS-9281',
        createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
        items: [
          {
            cartItemId: 'demo-1',
            item: INITIAL_MENU_ITEMS[0],
            quantity: 2,
            selectedSize: 'Large Paper Cone Roast',
            selectedSpice: 'Mild Ghee Fragrance',
            selectedAccompaniments: ['Extra Gunpowder Podi with Ghee'],
            customPrice: 250
          },
          {
            cartItemId: 'demo-2',
            item: INITIAL_MENU_ITEMS[11],
            quantity: 2,
            selectedAccompaniments: [],
            customPrice: 80
          }
        ],
        orderType: 'delivery',
        subtotal: 660,
        tax: 33,
        deliveryFee: 0,
        discount: 50,
        tip: 30,
        total: 673,
        status: 'out_for_delivery',
        customer: {
          name: 'Ananya Raghavan',
          phone: '+91 98765 43210',
          email: 'ananya.r@example.com',
          address: 'Apartment 402, Shanthi Nilayam, 12th Main, Indiranagar',
          area: 'Indiranagar'
        },
        payment: {
          method: 'upi',
          status: 'paid',
          transactionId: 'UPI-9876123498'
        },
        deliveryPartner: {
          name: 'Ramesh Sundaram',
          phone: '+91 94441 55210',
          vehicle: 'Bajaj Chetak EV (KA-03-EK-4819)',
          etaMinutes: 14
        },
        loyaltyPointsEarned: 67
      };
      return [initialDemoOrder];
    } catch {
      return [];
    }
  });

  const [currentActiveOrder, setCurrentActiveOrder] = useState<Order | null>(() => {
    return orders.length > 0 ? orders[0] : null;
  });

  // Reservations
  const [reservations, setReservations] = useState<TableReservation[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      if (stored) return JSON.parse(stored);
      return [
        {
          id: 'RES-8190',
          guestName: 'Dr. Subramanian Swamy',
          phone: '+91 98450 11223',
          email: 'subramanian@gmail.com',
          date: new Date().toISOString().split('T')[0],
          timeSlot: '07:30 PM (Dinner)',
          guestsCount: 4,
          diningArea: 'banana-leaf-hall',
          specialOccasion: 'family',
          specialRequests: 'Traditional brass water tumblers, extra spicy Rasam',
          status: 'confirmed',
          createdAt: new Date().toISOString()
        },
        {
          id: 'RES-8191',
          guestName: 'Priya & Rahul Venkat',
          phone: '+91 97110 88990',
          email: 'priya.venkat@yahoo.com',
          date: new Date().toISOString().split('T')[0],
          timeSlot: '08:15 PM (Dinner)',
          guestsCount: 2,
          diningArea: 'heritage-private',
          specialOccasion: 'anniversary',
          specialRequests: 'Anniversary cake cutting & corner peaceful booth',
          status: 'seated',
          createdAt: new Date().toISOString()
        }
      ];
    } catch {
      return [];
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return stored ? JSON.parse(stored) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Loyalty
  const [loyaltyUser, setLoyaltyUser] = useState<LoyaltyUser>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LOYALTY);
      return stored ? JSON.parse(stored) : INITIAL_LOYALTY_USER;
    } catch {
      return INITIAL_LOYALTY_USER;
    }
  });

  // Inventory
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INVENTORY);
      return stored ? JSON.parse(stored) : INITIAL_INVENTORY;
    } catch {
      return INITIAL_INVENTORY;
    }
  });

  // Outlets
  const outlets = OUTLET_LOCATIONS;
  const [selectedOutlet, setSelectedOutlet] = useState<OutletLocation>(OUTLET_LOCATIONS[0]);
  const [deliveryAreaSearch, setDeliveryAreaSearch] = useState<string>('Indiranagar, Bengaluru');

  // Modals & UI
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Sync with Local Storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOYALTY, JSON.stringify(loyaltyUser));
  }, [loyaltyUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
  }, [inventory]);

  // Cart actions
  const addToCart = (
    item: MenuItem,
    customization?: {
      size?: string;
      spice?: string;
      accompaniments?: string[];
      specialInstructions?: string;
    },
    quantity = 1
  ) => {
    let customPrice = item.price;
    if (customization?.size && item.customizations?.sizes) {
      const foundSize = item.customizations.sizes.find(s => s.name === customization.size);
      if (foundSize) customPrice += foundSize.priceDelta;
    }
    if (customization?.accompaniments && item.customizations?.accompaniments) {
      customization.accompaniments.forEach(accName => {
        const found = item.customizations?.accompaniments?.find(a => a.name === accName);
        if (found) customPrice += found.priceDelta;
      });
    }

    const cartItemId = `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    const newCartItem: CartItem = {
      cartItemId,
      item,
      quantity,
      selectedSize: customization?.size,
      selectedSpice: customization?.spice,
      selectedAccompaniments: customization?.accompaniments || [],
      customPrice,
      specialInstructions: customization?.specialInstructions
    };

    setCart(prev => [...prev, newCartItem]);
    showToast(`Added ${item.name} to cart`);
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setPromoDiscountAmount(0);
    setRedeemedPoints(0);
  };

  const applyPromo = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    if (clean === 'DOSALOVER') {
      const discount = Math.round(cartTotals.subtotal * 0.15);
      setAppliedPromo('DOSALOVER (15% Off)');
      setPromoDiscountAmount(discount);
      showToast('15% Dosa Lover discount applied!');
      return { success: true, message: '15% Off applied!' };
    }
    if (clean === 'FIRST50') {
      setAppliedPromo('FIRST50 (₹50 Off)');
      setPromoDiscountAmount(50);
      showToast('₹50 Welcome coupon applied!');
      return { success: true, message: '₹50 Off applied!' };
    }
    if (clean === 'FREEKAAPI') {
      setAppliedPromo('FREEKAAPI (₹80 Off)');
      setPromoDiscountAmount(80);
      showToast('Free Kumbakonam Kaapi discount applied!');
      return { success: true, message: '₹80 Off applied!' };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try DOSALOVER or FIRST50' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoDiscountAmount(0);
  };

  // Cart Calculations
  const subtotal = cart.reduce((acc, curr) => acc + curr.customPrice * curr.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 400 || subtotal === 0 ? 0 : 40) : 0;
  const loyaltyDiscount = redeemedPoints; // 1 point = ₹1
  const totalDiscount = promoDiscountAmount + loyaltyDiscount;
  const calculatedTotal = Math.max(0, subtotal + tax + deliveryFee + tipAmount - totalDiscount);
  const pointsToEarn = Math.floor(calculatedTotal * 0.1);

  const cartTotals: CartTotals = {
    subtotal,
    tax,
    deliveryFee,
    discount: totalDiscount,
    tip: tipAmount,
    total: calculatedTotal,
    pointsToEarn
  };

  // Order Placement
  const placeOrder = (customer: Order['customer'], payment: Order['payment']): Order => {
    const orderId = `DKS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: [...cart],
      orderType,
      subtotal,
      tax,
      deliveryFee,
      discount: totalDiscount,
      tip: tipAmount,
      total: calculatedTotal,
      status: 'confirmed',
      customer,
      payment,
      deliveryPartner: orderType === 'delivery' ? {
        name: 'Ramesh Sundaram',
        phone: '+91 94441 55210',
        vehicle: 'Bajaj Chetak EV (KA-03-EK-4819)',
        etaMinutes: 28
      } : undefined,
      loyaltyPointsEarned: pointsToEarn,
      loyaltyPointsUsed: redeemedPoints
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentActiveOrder(newOrder);

    // Update loyalty user points
    setLoyaltyUser(prev => ({
      ...prev,
      points: Math.max(0, prev.points - redeemedPoints + pointsToEarn),
      totalOrders: prev.totalOrders + 1,
      lifetimeSpent: prev.lifetimeSpent + calculatedTotal
    }));

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
    if (currentActiveOrder && currentActiveOrder.id === orderId) {
      setCurrentActiveOrder(prev => (prev ? { ...prev, status } : null));
    }
  };

  // Reservations
  const createReservation = (data: Omit<TableReservation, 'id' | 'createdAt' | 'status'>): TableReservation => {
    const resId = `RES-${Math.floor(2000 + Math.random() * 8000)}`;
    const newReservation: TableReservation = {
      ...data,
      id: resId,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    setReservations(prev => [newReservation, ...prev]);
    return newReservation;
  };

  const updateReservationStatus = (id: string, status: TableReservation['status']) => {
    setReservations(prev =>
      prev.map(r => (r.id === id ? { ...r, status } : r))
    );
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'verifiedDiner'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verifiedDiner: true
    };
    setReviews(prev => [newReview, ...prev]);
    showToast('Thank you for sharing your dining review!');
  };

  // Loyalty Vouchers
  const claimVoucher = (voucherId: string): boolean => {
    const voucher = loyaltyUser.vouchers.find(v => v.id === voucherId);
    if (!voucher) return false;
    if (loyaltyUser.points < voucher.pointsRequired) {
      showToast('Insufficient loyalty points for this perk');
      return false;
    }
    setLoyaltyUser(prev => ({
      ...prev,
      points: prev.points - voucher.pointsRequired
    }));
    applyPromo(voucher.code);
    showToast(`Voucher ${voucher.code} claimed and applied!`);
    return true;
  };

  // Inventory
  const updateInventoryStock = (id: string, newStock: number) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, currentStock: newStock, isLow: newStock <= item.minimumStock }
          : item
      )
    );
  };

  // Menu Admin Operations
  const updateMenuItem = (updated: MenuItem) => {
    setMenuItems(prev => prev.map(item => (item.id === updated.id ? updated : item)));
  };

  const toggleStockItem = (id: string) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, inStock: !item.inStock } : item
      )
    );
  };

  const toggleSpecialItem = (id: string) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isSpecial: !item.isSpecial } : item
      )
    );
  };

  const addDailySpecial = (itemData: Omit<MenuItem, 'id'>) => {
    const newId = `item-${Date.now()}`;
    const newItem: MenuItem = {
      ...itemData,
      id: newId
    };
    setMenuItems(prev => [newItem, ...prev]);
    showToast(`Added ${itemData.name} to Daily Specials!`);
  };

  return (
    <RestaurantContext.Provider
      value={{
        menuItems,
        updateMenuItem,
        toggleStockItem,
        toggleSpecialItem,
        addDailySpecial,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        orderType,
        setOrderType,
        appliedPromo,
        applyPromo,
        removePromo,
        tipAmount,
        setTipAmount,
        redeemedPoints,
        setRedeemedPoints,
        cartTotals,
        orders,
        currentActiveOrder,
        setCurrentActiveOrder,
        placeOrder,
        updateOrderStatus,
        reservations,
        createReservation,
        updateReservationStatus,
        reviews,
        addReview,
        loyaltyUser,
        claimVoucher,
        inventory,
        updateInventoryStock,
        outlets,
        selectedOutlet,
        setSelectedOutlet,
        deliveryAreaSearch,
        setDeliveryAreaSearch,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isPaymentOpen,
        setIsPaymentOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        isReservationOpen,
        setIsReservationOpen,
        isLoyaltyOpen,
        setIsLoyaltyOpen,
        isAdminOpen,
        setIsAdminOpen,
        isUserPanelOpen,
        setIsUserPanelOpen,
        customizingItem,
        setCustomizingItem,
        toastMessage,
        showToast
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
