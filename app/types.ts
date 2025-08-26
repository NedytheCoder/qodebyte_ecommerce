// Common types for the ecommerce application
export interface Product {
  id: number; 
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  description: string;
  inStock: boolean;
  discount?: number;
  originalPrice?: number;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterOptions {
  category: string[];
  brand: string[];
  priceRange: [number, number];
  searchQuery: string;
}

export interface SortOption {
  label: string;
  value: string;
}
