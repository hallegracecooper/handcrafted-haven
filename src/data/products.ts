export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'art' | 'textiles' | 'jewelry' | 'home' | 'accessories';
  image: string;
  seller: {
    id: string;
    name: string;
    username: string;
  };
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Handwoven Cotton Throw Blanket',
    description: 'Beautiful handwoven cotton throw blanket in earthy tones. Perfect for adding warmth and texture to any room. Each piece is unique with slight variations in the weaving pattern.',
    price: 89.99,
    category: 'textiles',
    image: '/api/placeholder/400/300',
    seller: {
      id: 'seller1',
      name: 'Sarah Weaver',
      username: 'sarahweaver'
    },
    rating: 4.8,
    reviewCount: 23,
    inStock: true,
    tags: ['handwoven', 'cotton', 'throw', 'home decor']
  },
  {
    id: '2',
    title: 'Ceramic Mug Set - Forest Collection',
    description: 'Set of 4 handcrafted ceramic mugs featuring forest-inspired designs. Each mug is thrown by hand and glazed with food-safe materials. Microwave and dishwasher safe.',
    price: 45.00,
    category: 'home',
    image: '/api/placeholder/400/300',
    seller: {
      id: 'seller2',
      name: 'Mike Potter',
      username: 'mikepotter'
    },
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    tags: ['ceramic', 'mugs', 'handmade', 'kitchen']
  },
  {
    id: '3',
    title: 'Sterling Silver Leaf Necklace',
    description: 'Delicate sterling silver necklace featuring a hand-carved leaf pendant. Each leaf is unique with natural variations. Chain length is 18 inches with lobster clasp.',
    price: 125.00,
    category: 'jewelry',
    image: '/api/placeholder/400/300',
    seller: {
      id: 'seller3',
      name: 'Emma Goldsmith',
      username: 'emmagoldsmith'
    },
    rating: 4.7,
    reviewCount: 34,
    inStock: true,
    tags: ['sterling silver', 'necklace', 'leaf', 'hand-carved']
  },
  {
    id: '4',
    title: 'Watercolor Landscape Painting',
    description: 'Original watercolor painting of a mountain landscape. Painted on high-quality watercolor paper using professional-grade paints. Frame not included.',
    price: 180.00,
    category: 'art',
    image: '/api/placeholder/400/300',
    seller: {
      id: 'seller4',
      name: 'David Artist',
      username: 'davidartist'
    },
    rating: 4.6,
    reviewCount: 12,
    inStock: true,
    tags: ['watercolor', 'landscape', 'original', 'painting']
  },
  {
    id: '5',
    title: 'Leather Crossbody Bag',
    description: 'Hand-stitched leather crossbody bag in rich brown leather. Features multiple compartments and adjustable strap. Perfect for everyday use.',
    price: 95.00,
    category: 'accessories',
    image: '/api/placeholder/400/300',
    seller: {
      id: 'seller5',
      name: 'Lisa Leather',
      username: 'lisaleather'
    },
    rating: 4.8,
    reviewCount: 45,
    inStock: true,
    tags: ['leather', 'bag', 'crossbody', 'hand-stitched']
  },
  {
    id: '6',
    title: 'Macrame Wall Hanging',
    description: 'Beautiful macrame wall hanging in natural cotton. Features intricate knotting patterns and wooden dowel. Adds texture and bohemian style to any wall.',
    price: 75.00,
    category: 'home',
    image: '/api/placeholder/400/300',
    seller: {
      id: 'seller6',
      name: 'Grace Knotter',
      username: 'graceknotter'
    },
    rating: 4.9,
    reviewCount: 28,
    inStock: true,
    tags: ['macrame', 'wall hanging', 'cotton', 'bohemian']
  },
  {
    id: '7',
    title: 'Handmade Soap Set',
    description: 'Set of 6 handmade soaps in various scents. Made with natural ingredients including olive oil, coconut oil, and essential oils. Each bar is approximately 4oz.',
    price: 32.00,
    category: 'home',
    image: '/api/placeholder/400/300',
    seller: {
      id: 'seller7',
      name: 'Anna Soapmaker',
      username: 'annasoapmaker'
    },
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    tags: ['soap', 'handmade', 'natural', 'essential oils']
  },
  {
    id: '8',
    title: 'Copper Wire Earrings',
    description: 'Handcrafted copper wire earrings with freshwater pearls. Each pair is unique with hand-wrapped wire details. Hypoallergenic and lightweight.',
    price: 38.00,
    category: 'jewelry',
    image: '/api/placeholder/400/300',
    seller: {
      id: 'seller8',
      name: 'Jewelry by Jen',
      username: 'jewelrybyjen'
    },
    rating: 4.5,
    reviewCount: 56,
    inStock: true,
    tags: ['copper', 'earrings', 'pearls', 'wire-wrapped']
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'art', name: 'Art' },
  { id: 'textiles', name: 'Textiles' },
  { id: 'jewelry', name: 'Jewelry' },
  { id: 'home', name: 'Home & Garden' },
  { id: 'accessories', name: 'Accessories' }
]; 