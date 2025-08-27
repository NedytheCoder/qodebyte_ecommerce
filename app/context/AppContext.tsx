"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Product, Category } from "../types";

interface AppContextType {
  // Cart state
  cartCount: number;
  setCartCount: (count: number | ((prev: number) => number)) => void;

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
    setCartCount((prev) => prev + 1);
    console.log("Added to cart:", product.name);
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
    searchQuery,
    setSearchQuery,
    isCategoriesOpen,
    setIsCategoriesOpen,
    featuredCategories,
    handleSearch,
    handleAddToCart,
    handleLogin,
    handleRegister,
    handleCategoryClick,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
