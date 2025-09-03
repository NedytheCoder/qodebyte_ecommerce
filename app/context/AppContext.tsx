"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Product, Category, CartItem } from "../types";

interface AppContextType {
  // Cart state
  cartCount: number;
  setCartCount: (count: number | ((prev: number) => number)) => void;
  cartItems: CartItem[];
  setCartItems: (items: CartItem[] | ((prev: CartItem[]) => CartItem[])) => void;

  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Categories state
  isCategoriesOpen: boolean;
  setIsCategoriesOpen: (open: boolean) => void;

  // Featured categories
  featuredCategories: Category[];

  // Handlers
  handleSearch: (e: React.FormEvent) => void;
  handleAddToCart: (product: Product) => void;
  handleUpdateQuantity: (productId: number, quantity: number) => void;
  handleRemoveFromCart: (productId: number) => void;
  handleLogin: () => void;
  handleRegister: () => void;
  handleCategoryClick: (category: Category) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const router = useRouter();

  // Featured categories data
  const featuredCategories: Category[] = [
    {
      id: 1,
      name: "Electronics",
      icon: "💻",
      description: "High-performance laptops, phones, and tech accessories",
    },
    {
      id: 2,
      name: "Clothing",
      icon: "👕",
      description: "Comfortable and stylish clothing for all seasons",
    },
    {
      id: 3,
      name: "Home & Garden",
      icon: "🏡",
      description: "Everything you need for your home and garden",
    },
    {
      id: 4,
      name: "Accessories",
      icon: "🎧",
      description: "Essential accessories to complement your lifestyle",
    },
  ];

  const handleCategoryClick = (category: Category) => {
    router.push(`/products?category=${encodeURIComponent(category.name)}`);
    setIsCategoriesOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // For a new product, update the count based on the new items array length
        const newItems = [...prev, { product, quantity: 1 }];
        setCartCount(newItems.length);
        return newItems;
      }
    });
    console.log("Added to cart:", product.name);
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    
    setCartItems((prev) => {
      const itemExists = prev.some(item => item.product.id === productId);
      const newItems = prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      
      // If this is a new product being added (quantity changed from 0 to 1)
      if (quantity === 1 && !itemExists) {
        setCartCount(prev => prev + 1);
      }
      
      return newItems;
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((prev) => {
      const itemToRemove = prev.find(item => item.product.id === productId);
      if (itemToRemove && itemToRemove.quantity > 1) {
        // If quantity > 1, just decrease quantity
        return prev.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        // If quantity is 1, remove the item and update cart count
        if (itemToRemove) {
          setCartCount(prev => Math.max(0, prev - 1));
        }
        return prev.filter(item => item.product.id !== productId);
      }
    });
  };

  const handleLogin = () => {
    console.log("Login clicked");
    // router.push("/login");
  };

  const handleRegister = () => {
    console.log("Register clicked");
    // router.push("/register");
  };

  const value: AppContextType = {
    cartCount,
    setCartCount,
    cartItems,
    setCartItems,
    searchQuery,
    setSearchQuery,
    isCategoriesOpen,
    setIsCategoriesOpen,
    featuredCategories,
    handleSearch,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveFromCart,
    handleLogin,
    handleRegister,
    handleCategoryClick,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
