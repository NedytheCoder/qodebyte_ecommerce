"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "./nav/Nav";
import Hero from "./Hero";
import { Product, Category } from "./types";
import Footer from "./Footer";

// Mock data
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

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    image: "🎧",
    category: "Electronics",
    brand: "SoundMax",
    rating: 4.5,
    description: "High-quality wireless headphones with noise cancellation",
    inStock: true,
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    image: "👕",
    category: "Clothing",
    brand: "EcoWear",
    rating: 4.7,
    description: "Comfortable organic cotton t-shirt",
    inStock: true,
  },
  {
    id: 3,
    name: "Garden Tool Set",
    price: 45.99,
    image: "🏡",
    category: "Home & Garden",
    brand: "HydroLife",
    rating: 4.3,
    description: "Complete set of essential garden tools",
    inStock: true,
  },
  {
    id: 4,
    name: "Leather Wallet",
    price: 49.99,
    image: "💼",
    category: "Accessories",
    brand: "LeatherCraft",
    rating: 4.8,
    description: "Genuine leather wallet with RFID protection",
    inStock: true,
  },
  {
    id: 5,
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "⌚",
    category: "Electronics",
    brand: "FitTech",
    rating: 4.3,
    description: "Advanced fitness tracking with heart rate monitor",
    inStock: true,
  },
  {
    id: 6,
    name: "Winter Jacket",
    price: 149.99,
    image: "🧥",
    category: "Clothing",
    brand: "EcoWear",
    rating: 4.8,
    description: "Warm and stylish winter jacket",
    inStock: true,
  },
];

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  // Handlers
  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Navigate to search results page
      console.log("Searching for:", query);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    console.log("Added to cart:", product.name);
    // Add to cart logic here
  };

  const handleLogin = () => {
    console.log("Login clicked");
    router.push("/login");
  };

  const handleRegister = () => {
    console.log("Register clicked");
    router.push("/register");
  };

  return (
    <main className="min-h-screen">
      <Nav
        featuredCategories={featuredCategories}
        cartCount={cartCount}
        onAddToCart={handleAddToCart}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      <Hero
        featuredCategories={featuredCategories}
        featuredProducts={featuredProducts}
        onAddToCart={handleAddToCart}
      />
      <Footer />
    </main>
  );
}
