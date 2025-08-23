// Common types for the ecommerce application
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
}
