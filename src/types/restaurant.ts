export type DietType = 'veg' | 'non-veg';

export interface MenuItem {
  id: string;
  name: string;
  tamilName?: string;
  category: 'dosas' | 'tiffin' | 'thalis' | 'curries' | 'rice' | 'beverages';
  price: number;
  originalPrice?: number;
  description: string;
  diet: DietType;
  spiceLevel: 0 | 1 | 2 | 3; // 0: None, 1: Mild, 2: Medium, 3: Spicy
  isSpecial?: boolean;
  isPopular?: boolean;
  inStock: boolean;
  imageUrl?: string;
  calories?: number;
  prepTimeMinutes: number;
  tags?: string[];
  customizations?: {
    sizes?: { name: string; priceDelta: number }[];
    accompaniments?: { name: string; priceDelta: number }[];
    spiceLevels?: string[];
  };
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedSize?: string;
  selectedSpice?: string;
  selectedAccompaniments: string[];
  customPrice: number;
  specialInstructions?: string;
}

export type OrderType = 'delivery' | 'pickup' | 'dine-in';

export type OrderStatus = 
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  orderType: OrderType;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  tip: number;
  total: number;
  status: OrderStatus;
  customer: {
    name: string;
    phone: string;
    email: string;
    address?: string;
    area?: string;
    tableNumber?: string;
    instructions?: string;
  };
  payment: {
    method: 'upi' | 'card' | 'netbanking' | 'cod';
    status: 'paid' | 'pending';
    transactionId?: string;
  };
  deliveryPartner?: {
    name: string;
    phone: string;
    vehicle: string;
    etaMinutes: number;
  };
  loyaltyPointsEarned: number;
  loyaltyPointsUsed?: number;
}

export interface TableReservation {
  id: string;
  guestName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  diningArea: 'banana-leaf-hall' | 'courtyard-ac' | 'heritage-private';
  specialOccasion?: 'none' | 'birthday' | 'anniversary' | 'business' | 'family';
  specialRequests?: string;
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  favoriteDish: string;
  verifiedDiner: boolean;
}

export interface OutletLocation {
  id: string;
  name: string;
  area: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  hours: string;
  coordinates: { lat: number; lng: number };
  popularFor: string;
  dineInOpen: boolean;
  deliveryOpen: boolean;
}

export interface LoyaltyUser {
  name: string;
  phone: string;
  membershipId: string;
  points: number;
  tier: 'Bronze Kaapi' | 'Silver Rasam' | 'Gold PARIMAS Patron';
  totalOrders: number;
  lifetimeSpent: number;
  vouchers: {
    id: string;
    title: string;
    discountAmount: number;
    pointsRequired: number;
    code: string;
    minSpend: number;
  }[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  unit: string;
  minimumStock: number;
  isLow: boolean;
}
