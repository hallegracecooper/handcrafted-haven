import { products } from './products';

export interface Seller {
  id: string;
  username: string;
  name: string;
  bio: string;
  shopDescription: string;
  location: string;
  specialties: string[];
  yearsExperience: number;
  totalProducts: number;
  averageRating: number;
  totalReviews: number;
  joinDate: string;
  socialLinks?: {
    instagram?: string;
    website?: string;
    etsy?: string;
  };
}

export const sellers: Seller[] = [
  {
    id: 'seller1',
    username: 'sarahweaver',
    name: 'Sarah Weaver',
    bio: 'I\'m a passionate textile artist with over 15 years of experience in handweaving. My journey began in the mountains of North Carolina, where I learned traditional weaving techniques from local artisans. I specialize in creating warm, durable throws and blankets that bring comfort and beauty to any home.',
    shopDescription: 'Sarah\'s Weaving Studio offers handcrafted textiles made with love and attention to detail. Each piece is unique, featuring traditional patterns with modern touches. I use only the finest natural fibers and sustainable practices in my work.',
    location: 'Asheville, North Carolina',
    specialties: ['handweaving', 'textiles', 'natural fibers', 'traditional patterns'],
    yearsExperience: 15,
    totalProducts: 1,
    averageRating: 4.8,
    totalReviews: 23,
    joinDate: '2022-03-15',
    socialLinks: {
      instagram: '@sarahweaverstudio',
      website: 'https://sarahweaverstudio.com'
    }
  },
  {
    id: 'seller2',
    username: 'mikepotter',
    name: 'Mike Potter',
    bio: 'Ceramic artist and potter with a love for functional art. I believe that everyday objects should be beautiful as well as useful. My work is inspired by nature and the organic forms found in the forest around my studio.',
    shopDescription: 'Mike\'s Pottery creates handcrafted ceramic pieces that combine functionality with artistic beauty. Each piece is thrown by hand and glazed with food-safe materials, making them perfect for daily use while adding elegance to your home.',
    location: 'Portland, Oregon',
    specialties: ['ceramics', 'pottery', 'functional art', 'food-safe glazes'],
    yearsExperience: 8,
    totalProducts: 1,
    averageRating: 4.9,
    totalReviews: 67,
    joinDate: '2021-08-22',
    socialLinks: {
      instagram: '@mikepotterceramics',
      etsy: 'mikepotterceramics'
    }
  },
  {
    id: 'seller3',
    username: 'emmagoldsmith',
    name: 'Emma Goldsmith',
    bio: 'Jewelry designer and metalsmith with a passion for creating pieces that tell stories. I work primarily with sterling silver and incorporate natural elements into my designs. Each piece is handcrafted with precision and care.',
    shopDescription: 'Emma Goldsmith Jewelry offers handcrafted sterling silver pieces that celebrate natural beauty. From delicate necklaces to statement earrings, each piece is designed to be worn and loved for years to come.',
    location: 'Austin, Texas',
    specialties: ['sterling silver', 'jewelry design', 'metalsmithing', 'natural elements'],
    yearsExperience: 12,
    totalProducts: 1,
    averageRating: 4.7,
    totalReviews: 34,
    joinDate: '2020-11-10',
    socialLinks: {
      instagram: '@emmagoldsmithjewelry',
      website: 'https://emmagoldsmith.com'
    }
  },
  {
    id: 'seller4',
    username: 'davidartist',
    name: 'David Artist',
    bio: 'Watercolor artist specializing in landscape painting. I capture the beauty of natural scenes through the delicate medium of watercolor, creating pieces that bring the outdoors into your home.',
    shopDescription: 'David Artist Studio creates original watercolor paintings that celebrate the natural world. Each piece is painted on high-quality watercolor paper using professional-grade paints, ensuring lasting beauty.',
    location: 'Boulder, Colorado',
    specialties: ['watercolor', 'landscape painting', 'original art', 'nature scenes'],
    yearsExperience: 20,
    totalProducts: 1,
    averageRating: 4.6,
    totalReviews: 12,
    joinDate: '2023-01-05',
    socialLinks: {
      instagram: '@davidartiststudio',
      website: 'https://davidartist.com'
    }
  },
  {
    id: 'seller5',
    username: 'lisaleather',
    name: 'Lisa Leather',
    bio: 'Leather artisan with a focus on creating durable, beautiful bags and accessories. I use traditional leatherworking techniques combined with modern design to create pieces that last a lifetime.',
    shopDescription: 'Lisa Leather Crafts creates hand-stitched leather goods that combine traditional craftsmanship with contemporary design. Each piece is made from premium leather and built to last.',
    location: 'Nashville, Tennessee',
    specialties: ['leatherwork', 'bags', 'accessories', 'hand-stitching'],
    yearsExperience: 10,
    totalProducts: 1,
    averageRating: 4.8,
    totalReviews: 45,
    joinDate: '2021-05-18',
    socialLinks: {
      instagram: '@lisaleathercrafts',
      etsy: 'lisaleathercrafts'
    }
  },
  {
    id: 'seller6',
    username: 'graceknotter',
    name: 'Grace Knotter',
    bio: 'Macrame artist creating beautiful wall hangings and home decor. I love working with natural cotton and creating intricate patterns that add texture and warmth to any space.',
    shopDescription: 'Grace\'s Macrame offers handcrafted wall hangings and home decor pieces. Each piece is carefully knotted by hand using natural cotton, creating unique textures and patterns.',
    location: 'San Diego, California',
    specialties: ['macrame', 'wall hangings', 'home decor', 'natural cotton'],
    yearsExperience: 6,
    totalProducts: 1,
    averageRating: 4.9,
    totalReviews: 28,
    joinDate: '2022-09-12',
    socialLinks: {
      instagram: '@gracemacrame',
      website: 'https://gracemacrame.com'
    }
  },
  {
    id: 'seller7',
    username: 'annasoapmaker',
    name: 'Anna Soapmaker',
    bio: 'Artisan soap maker with a passion for natural, skin-loving products. I create handmade soaps using traditional cold-process methods and only the finest natural ingredients.',
    shopDescription: 'Anna\'s Natural Soaps offers handcrafted soaps made with love and natural ingredients. Each bar is carefully formulated to nourish your skin while providing a luxurious bathing experience.',
    location: 'Seattle, Washington',
    specialties: ['soap making', 'natural ingredients', 'cold process', 'skin care'],
    yearsExperience: 7,
    totalProducts: 1,
    averageRating: 4.7,
    totalReviews: 89,
    joinDate: '2020-06-30',
    socialLinks: {
      instagram: '@annasnaturalsoaps',
      etsy: 'annasnaturalsoaps'
    }
  },
  {
    id: 'seller8',
    username: 'jewelrybyjen',
    name: 'Jewelry by Jen',
    bio: 'Wire-wrapping artist creating unique jewelry pieces with freshwater pearls and copper wire. I love the organic feel of wire-wrapped designs and the way they complement natural stones.',
    shopDescription: 'Jewelry by Jen creates handcrafted wire-wrapped jewelry featuring freshwater pearls and natural stones. Each piece is unique and designed to be both beautiful and comfortable to wear.',
    location: 'Denver, Colorado',
    specialties: ['wire wrapping', 'jewelry', 'freshwater pearls', 'copper'],
    yearsExperience: 5,
    totalProducts: 1,
    averageRating: 4.5,
    totalReviews: 56,
    joinDate: '2022-12-03',
    socialLinks: {
      instagram: '@jewelrybyjen',
      etsy: 'jewelrybyjen'
    }
  }
];

// Helper function to get seller's products
export const getSellerProducts = (sellerId: string) => {
  return products.filter(product => product.seller.id === sellerId);
};

// Helper function to get seller by username
export const getSellerByUsername = (username: string) => {
  return sellers.find(seller => seller.username === username);
}; 