"use client";

import { useState } from "react";
import Nav from "./nav/Nav";
import Hero from "./Hero";
import { Product, Category } from "./types";
import Footer from "./Footer";

// Mock data
const featuredCategories: Category[] = [
  {
    id: 1,
    name: "Laptops",
    icon: "💻",
    description: "High-performance laptops for work and gaming",
  },
  {
    id: 2,
    name: "Phones",
    icon: "📱",
    description: "Latest smartphones with cutting-edge features",
  },
  {
    id: 3,
    name: "Accessories",
    icon: "🎧",
    description: "Essential accessories for your devices",
  },
];

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    price: 2499,
    image: "💻",
    category: "Laptops",
    rating: 4.8,
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 999,
    image: "📱",
    category: "Phones",
    rating: 4.9,
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 249,
    image: "🎧",
    category: "Accessories",
    rating: 3.7,
  },
  {
    id: 4,
    name: "Dell XPS 13",
    price: 1199,
    image: "💻",
    category: "Laptops",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Samsung Galaxy S24",
    price: 799,
    image: "📱",
    category: "Phones",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Wireless Charger",
    price: 49,
    image: "🔌",
    category: "Accessories",
    rating: 4.4,
  },
];

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  // Handlers
  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Navigate to search results page
      console.log("Searching for:", query);
      // router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleCategoryClick = (category: Category) => {
    console.log("Navigating to category:", category.name);
    // router.push(`/category/${category.id}`);
  };

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    console.log("Added to cart:", product.name);
    // Add to cart logic here
  };

  const handleLogin = () => {
    console.log("Login clicked");
    // router.push('/login');
  };

  const handleRegister = () => {
    console.log("Register clicked");
    // router.push('/register');
  };

  return (
    <main className="min-h-screen">
      <Nav
        featuredCategories={featuredCategories}
        cartCount={cartCount}
        onSearch={handleSearch}
        onCategoryClick={handleCategoryClick}
        onAddToCart={handleAddToCart}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      <Hero
        featuredCategories={featuredCategories}
        featuredProducts={featuredProducts}
        onCategoryClick={handleCategoryClick}
        onAddToCart={handleAddToCart}
      />
      <Footer />
    </main>
  );
}
