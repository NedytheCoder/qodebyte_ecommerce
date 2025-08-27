"use client";

import Nav from "./nav/Nav";
import Hero from "./Hero";
import { Product } from "./types";
import Footer from "./Footer";
import { useAppContext } from "./context/AppContext";

export default function Home() {
  const {
    cartCount,
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
  } = useAppContext();

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

  return (
    <main className="min-h-screen">
      <Nav
        featuredCategories={featuredCategories}
        cartCount={cartCount}
        onAddToCart={handleAddToCart}
        onLogin={handleLogin}
        onRegister={handleRegister}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isCategoriesOpen={isCategoriesOpen}
        setIsCategoriesOpen={setIsCategoriesOpen}
        handleCategoryClick={handleCategoryClick}
      />
      <Hero
        featuredCategories={featuredCategories}
        featuredProducts={featuredProducts}
        onAddToCart={handleAddToCart}
        handleCategoryClick={handleCategoryClick}
      />
      <Footer />
    </main>
  );
}
