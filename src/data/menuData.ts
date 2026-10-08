import { MenuItem, OutletLocation, Review, LoyaltyUser, InventoryItem } from '../types/restaurant';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'dosa-ghee-roast',
    name: 'PARIMAS Golden Ghee Roast',
    tamilName: 'நெய் ரோஸ்ட் தோசை',
    category: 'dosas',
    price: 180,
    originalPrice: 210,
    description: 'Golden paper-thin crepe roasted generously in pure A2 Gir cow ghee, served with stone-ground coconut, tomato-shallot chutneys and aromatic piping hot sambar.',
    diet: 'veg',
    spiceLevel: 1,
    isSpecial: true,
    isPopular: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    calories: 380,
    prepTimeMinutes: 12,
    tags: ['Crispy', 'Chef Signature', 'Pure Desi Ghee'],
    customizations: {
      sizes: [
        { name: 'Regular Crisp', priceDelta: 0 },
        { name: 'Large Paper Cone Roast', priceDelta: 40 },
        { name: 'Family 3-Foot Maharaja Roast', priceDelta: 160 }
      ],
      accompaniments: [
        { name: 'Extra Gunpowder Podi with Ghee', priceDelta: 30 },
        { name: 'Extra Bowl of Drumstick Sambar', priceDelta: 25 },
        { name: 'Jain Sambar (No Onion/Garlic)', priceDelta: 0 }
      ],
      spiceLevels: ['Mild Ghee Fragrance', 'Traditional Medium', 'Spicy Madras Heat']
    }
  },
  {
    id: 'dosa-mysore-masala',
    name: 'Mysore Masala Dosa',
    tamilName: 'மைசூர் மசாலா தோசை',
    category: 'dosas',
    price: 195,
    originalPrice: 220,
    description: 'Crisp exterior layered inside with fiery Byadgi red chilli-garlic chutney paste and stuffed with buttery spiced potato palya.',
    diet: 'veg',
    spiceLevel: 2,
    isSpecial: true,
    isPopular: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    calories: 420,
    prepTimeMinutes: 14,
    tags: ['Best Seller', 'Authentic Mysore Style'],
    customizations: {
      sizes: [
        { name: 'Standard Butter Roast', priceDelta: 0 },
        { name: 'Extra Cheese Mysore Dosa', priceDelta: 45 }
      ],
      accompaniments: [
        { name: 'Extra Mysore Red Paste', priceDelta: 20 },
        { name: 'Fried Cashew Tadka', priceDelta: 35 }
      ],
      spiceLevels: ['Gentle Spice', 'Mysore Classic (Medium-High)', 'Fiery Byadgi Blast']
    }
  },
  {
    id: 'dosa-madras-onion-rava',
    name: 'Madras Onion Rava Crisp',
    tamilName: 'வெங்காய ரவா தோசை',
    category: 'dosas',
    price: 185,
    description: 'Lacy, ultra-crispy semolina crepe studded with caramelized pearl shallots, crushed peppercorns, cumin, curry leaves, and green chillies.',
    diet: 'veg',
    spiceLevel: 2,
    isPopular: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    calories: 340,
    prepTimeMinutes: 15,
    tags: ['Lacy & Crunchy', 'Madras Heritage'],
    customizations: {
      sizes: [
        { name: 'Classic Onion Rava', priceDelta: 0 },
        { name: 'Onion Rava Masala (with Aloo)', priceDelta: 30 },
        { name: 'Rava Cashew Roast', priceDelta: 50 }
      ],
      accompaniments: [
        { name: 'Tomato Onion Relish Chutney', priceDelta: 20 },
        { name: 'Extra Ghee Roast Bath', priceDelta: 35 }
      ],
      spiceLevels: ['Mild', 'Classic Peppery', 'Extra Green Chilli Cut']
    }
  },
  {
    id: 'dosa-kara-podi-paneer',
    name: 'Kara Podi Paneer Roast',
    tamilName: 'கார பொடி பன்னீர் தோசை',
    category: 'dosas',
    price: 225,
    originalPrice: 250,
    description: 'Crispy fermented batter dusted with spicy roasted lentil Gunpowder (Idli Podi), melted country butter, and tender crumbled Malabar cottage cheese.',
    diet: 'veg',
    spiceLevel: 3,
    isSpecial: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    calories: 460,
    prepTimeMinutes: 14,
    tags: ['Spicy', 'Protein Rich', 'Podi Lover'],
    customizations: {
      sizes: [
        { name: 'Single Crisp', priceDelta: 0 },
        { name: 'Double Stuffed Paneer', priceDelta: 55 }
      ],
      accompaniments: [
        { name: 'Cold-pressed Sesame Oil Podi', priceDelta: 25 },
        { name: 'Sweet Mango Ginger Pickle', priceDelta: 20 }
      ],
      spiceLevels: ['Medium Podi', 'Spicy Guntur Podi (Authentic)', 'Extreme Fire Podi']
    }
  },
  {
    id: 'tiffin-thatte-idli-platter',
    name: 'Bidadi Thatte Idli Duo with Vada',
    tamilName: 'தட்டே இட்லி & வடை',
    category: 'tiffin',
    price: 160,
    description: 'Giant pillowy soft disc idlis steamed in traditional screwpine leaf mould, topped with a dollop of white butter and gunpowder podi, paired with 1 crunchy medu vada.',
    diet: 'veg',
    spiceLevel: 1,
    isPopular: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    calories: 360,
    prepTimeMinutes: 10,
    tags: ['Melt in Mouth', 'Steamed Pure']
  },
  {
    id: 'tiffin-medu-vada-sambar-dip',
    name: 'Sambar Dipped Medu Vada (2 Pcs)',
    tamilName: 'சாம்பார் வடை',
    category: 'tiffin',
    price: 130,
    description: 'Crisp golden urad dal fritters soaked in piping hot bowl of coriander-laced vegetable sambar, garnished with freshly grated coconut and chopped cilantro.',
    diet: 'veg',
    spiceLevel: 2,
    isPopular: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    calories: 310,
    prepTimeMinutes: 8,
    tags: ['Crunchy Outside', 'Spongy Inside']
  },
  {
    id: 'thali-royal-dakshin-feast',
    name: 'Grand PARIMAS Banana Leaf Thali',
    tamilName: 'ராஜ விருந்து சாப்பாடு',
    category: 'thalis',
    price: 360,
    originalPrice: 420,
    description: 'The ultimate royal feast: Mysore Poori, Malabar Avial, Ennai Kathirikai (brinjal curry), Chettinad Kootu, Urad Vada, Sambar, Rasam, Curd Rice, Appalam, and Elaneer Payasam.',
    diet: 'veg',
    spiceLevel: 2,
    isSpecial: true,
    isPopular: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
    calories: 780,
    prepTimeMinutes: 18,
    tags: ['All-in-One Feast', 'Traditional Banana Leaf Style']
  },
  {
    id: 'curry-chettinad-pepper-paneer',
    name: 'Chettinad Black Pepper Paneer Gravy',
    tamilName: 'செட்டிநாடு பெப்பர் பன்னீர்',
    category: 'curries',
    price: 260,
    description: 'Tender cottage cheese simmered in a dark, intensely aromatic stone-ground gravy of dry-roasted black peppercorns, fennel seeds, star anise, and fresh shallots.',
    diet: 'veg',
    spiceLevel: 3,
    isSpecial: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    calories: 490,
    prepTimeMinutes: 16,
    tags: ['Heirloom Spice Blend', 'Chettinad Pride']
  },
  {
    id: 'rice-malabar-parotta-korma',
    name: 'Malabar Flaky Parotta with Veg Kurma',
    tamilName: 'மலபார் பரோட்டா குருமா',
    category: 'rice',
    price: 210,
    description: '3 golden, flaky, coin-layered Kerala parottas beaten fresh on the grill, served with aromatic coconut milk vegetable kurma and pickled shallots.',
    diet: 'veg',
    spiceLevel: 2,
    isPopular: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    calories: 540,
    prepTimeMinutes: 15,
    tags: ['Kerala Classic', 'Layered & Flaky']
  },
  {
    id: 'rice-bisi-bele-bath',
    name: 'Mysore Bisi Bele Bath with Boondi',
    tamilName: 'பிசிபேளே பாத்',
    category: 'rice',
    price: 175,
    description: 'A comforting wholesome Karnataka one-pot harmony of rice, toor dal, seasonal vegetables, nutmeg, and dry coconut spices, cooked in pure ghee and topped with spicy boondi.',
    diet: 'veg',
    spiceLevel: 2,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
    calories: 410,
    prepTimeMinutes: 12,
    tags: ['Wholesome', 'Desi Ghee Comfort']
  },
  {
    id: 'rice-curd-rice-tadka',
    name: 'Temple Style Bagalabath (Curd Rice)',
    tamilName: 'தயிர் சாதம்',
    category: 'rice',
    price: 140,
    description: 'Cooling probiotic creamy curd rice tempered with mustard seeds, curry leaves, ginger, slit green chillies, roasted cashews, and fresh ruby pomegranate pearls.',
    diet: 'veg',
    spiceLevel: 1,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    calories: 290,
    prepTimeMinutes: 8,
    tags: ['Cooling', 'Probiotic', 'Temple Style']
  },
  {
    id: 'drink-kumbakonam-filter-kaapi',
    name: 'Kumbakonam Degree Filter Kaapi',
    tamilName: 'கும்பகோணம் டிகிரி காப்பி',
    category: 'beverages',
    price: 80,
    description: 'Brewed from shade-grown Chicory-Peaberry beans in traditional brass decoction filter, frothed with thick cows milk and served in heirloom brass davarah-tumbler.',
    diet: 'veg',
    spiceLevel: 0,
    isPopular: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    calories: 120,
    prepTimeMinutes: 5,
    tags: ['Brass Tumbler', 'Aromatic Foam', 'Cult Classic']
  },
  {
    id: 'dessert-elaneer-payasam',
    name: 'Tender Coconut Elaneer Payasam',
    tamilName: 'இளநீர் பாயாசம்',
    category: 'beverages',
    price: 120,
    description: 'Velvety Kerala dessert crafted with fresh tender coconut pulp, infused with coconut milk, condensed milk, green cardamom, and toasted golden cashews.',
    diet: 'veg',
    spiceLevel: 0,
    isSpecial: true,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    calories: 240,
    prepTimeMinutes: 5,
    tags: ['Chilled Sweet', 'Tender Coconut']
  }
];

export const OUTLET_LOCATIONS: OutletLocation[] = [
  {
    id: 'loc-indiranagar',
    name: 'Indiranagar Flagship',
    area: '100ft Road, Indiranagar',
    address: 'Plot 742, 100 Feet Rd, HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    phone: '+91 (080) 4124-8890',
    hours: 'Mon-Sun: 7:00 AM – 11:00 PM',
    coordinates: { lat: 12.9784, lng: 77.6408 },
    popularFor: 'Live Ghee Roast Counter & Courtyard Dining',
    dineInOpen: true,
    deliveryOpen: true
  },
  {
    id: 'loc-mylapore',
    name: 'Mylapore Heritage',
    area: 'Kapaleeshwarar Temple St',
    address: '14/2 North Mada Street, Mylapore',
    city: 'Chennai',
    pincode: '600004',
    phone: '+91 (044) 2464-1984',
    hours: 'Mon-Sun: 6:30 AM – 10:30 PM',
    coordinates: { lat: 13.0336, lng: 80.2676 },
    popularFor: 'Heirloom Brass Kaapi & Traditional Banana Leaf Feast',
    dineInOpen: true,
    deliveryOpen: true
  },
  {
    id: 'loc-jubilee-hills',
    name: 'Jubilee Hills Grand',
    area: 'Road No. 36, Jubilee Hills',
    address: 'Near Peddamma Temple, Road No. 36, Jubilee Hills',
    city: 'Hyderabad',
    pincode: '500033',
    phone: '+91 (040) 6678-4321',
    hours: 'Mon-Sun: 7:00 AM – 11:30 PM',
    coordinates: { lat: 17.4319, lng: 78.4073 },
    popularFor: 'Guntur Spicy Podi Tawa Specials & AC Family Hall',
    dineInOpen: true,
    deliveryOpen: true
  },
  {
    id: 'loc-connaught-place',
    name: 'Connaught Place Colonial',
    area: 'Outer Circle, Block M',
    address: 'M-Block, Outer Circle, Connaught Place',
    city: 'New Delhi',
    pincode: '110001',
    phone: '+91 (011) 4356-9011',
    hours: 'Mon-Sun: 8:00 AM – 11:00 PM',
    coordinates: { lat: 28.6315, lng: 77.2167 },
    popularFor: 'Mysore Masala Breakfast & Executive Thali Luncheons',
    dineInOpen: true,
    deliveryOpen: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Kavitha Ramachandran',
    city: 'Bengaluru',
    rating: 5,
    date: 'Yesterday',
    comment: 'PARIMAS Ghee Roast is pure nostalgia! You can taste the genuine aged batter and golden cow ghee. Sambar has that authentic drumstick-shallot aroma with zero shortcuts.',
    favoriteDish: 'PARIMAS Golden Ghee Roast',
    verifiedDiner: true
  },
  {
    id: 'rev-2',
    author: 'Arjun Nambiar',
    city: 'Chennai',
    rating: 5,
    date: '3 days ago',
    comment: 'The Kumbakonam Filter Coffee served piping hot in heirloom brass tumblers is unmatched. We also ordered the Bidadi Thatte Idli which was like eating edible clouds.',
    favoriteDish: 'Kumbakonam Degree Filter Kaapi',
    verifiedDiner: true
  },
  {
    id: 'rev-3',
    author: 'Deepika Sundaram',
    city: 'Hyderabad',
    rating: 5,
    date: '1 week ago',
    comment: 'Booked a table for 8 for my father’s 60th birthday in the Banana Leaf Hall. The service was impeccable, food served with warmth and traditional generosity.',
    favoriteDish: 'Grand PARIMAS Banana Leaf Thali',
    verifiedDiner: true
  },
  {
    id: 'rev-4',
    author: 'Rohit Iyer',
    city: 'Delhi',
    rating: 4,
    date: '2 weeks ago',
    comment: 'Super fast delivery! The dosa arrived remarkably crisp with three separate chutney containers and hot sambar in leak-proof packaging. 10/10 ordering experience.',
    favoriteDish: 'Mysore Masala Dosa',
    verifiedDiner: true
  }
];

export const INITIAL_LOYALTY_USER: LoyaltyUser = {
  name: 'Ananya Raghavan',
  phone: '+91 98765 43210',
  membershipId: 'PRM-8842-GOLD',
  points: 340,
  tier: 'Silver Rasam',
  totalOrders: 14,
  lifetimeSpent: 4890,
  vouchers: [
    {
      id: 'vouc-kaapi',
      title: 'Complimentary Degree Filter Kaapi',
      discountAmount: 80,
      pointsRequired: 80,
      code: 'FREEKAAPI',
      minSpend: 150
    },
    {
      id: 'vouc-ghee-dosa',
      title: '₹100 Off PARIMAS Ghee Roast',
      discountAmount: 100,
      pointsRequired: 150,
      code: 'DOSA100',
      minSpend: 250
    },
    {
      id: 'vouc-royal-feast',
      title: '₹200 Off Royal Thali Feast',
      discountAmount: 200,
      pointsRequired: 250,
      code: 'ROYAL200',
      minSpend: 500
    }
  ]
};

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'inv-1', name: 'Stone-Ground Dosa Batter (Aged 36h)', category: 'Prep', currentStock: 48, unit: 'Liters', minimumStock: 20, isLow: false },
  { id: 'inv-2', name: 'Pure Gir Cow Desi Ghee', category: 'Dairy', currentStock: 18, unit: 'Kg', minimumStock: 10, isLow: false },
  { id: 'inv-3', name: 'Peaberry Shade-Grown Kaapi Powder', category: 'Dry Goods', currentStock: 14, unit: 'Kg', minimumStock: 5, isLow: false },
  { id: 'inv-4', name: 'Fresh Madurai Curry Leaves', category: 'Produce', currentStock: 4, unit: 'Kg', minimumStock: 3, isLow: false },
  { id: 'inv-5', name: 'Byadgi & Guntur Dry Chillies', category: 'Spices', currentStock: 12, unit: 'Kg', minimumStock: 6, isLow: false },
  { id: 'inv-6', name: 'Fresh Grated Pollachi Coconut', category: 'Produce', currentStock: 8, unit: 'Kg', minimumStock: 12, isLow: true },
  { id: 'inv-7', name: 'Export-Grade Fresh Banana Leaves', category: 'Packaging', currentStock: 120, unit: 'Sheets', minimumStock: 150, isLow: true }
];
