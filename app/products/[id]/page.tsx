"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Product } from "../../types";
import Nav from "../../nav/Nav";
import { useAppContext } from "../../context/AppContext";
import Link from "next/link";
import Footer from "@/app/Footer";

const ProductDetailPage = () => {
  const params = useParams();
  const productId = parseInt(params.id as string);

  const {
    featuredCategories,
    cartCount,
    handleAddToCart,
    handleLogin,
    handleRegister,
    searchQuery,
    setSearchQuery,
    handleSearch,
    isCategoriesOpen,
    setIsCategoriesOpen,
    handleCategoryClick,
  } = useAppContext();

  // Mock products data (same as in products page)
  const mockProducts: Product[] = useMemo(
    () => [
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 89.99,
        originalPrice: 129.99,
        discount: 31,
        image: "/headphones.jpg",
        category: "Electronics",
        brand: "SoundMax",
        rating: 4.5,
        description:
          "High-quality wireless headphones with noise cancellation technology. Perfect for music lovers and professionals who demand crystal-clear audio quality.",
        inStock: true,
      },
      {
        id: 2,
        name: "Smart Fitness Watch",
        price: 199.99,
        image: "/smartwatch.jpg",
        category: "Electronics",
        brand: "FitTech",
        rating: 4.3,
        description:
          "Advanced fitness tracking with heart rate monitor, GPS, and waterproof design. Track your workouts and stay connected.",
        inStock: true,
      },
      {
        id: 3,
        name: "Wireless Charging Pad",
        price: 34.99,
        image: "/charger.jpg",
        category: "Electronics",
        brand: "PowerTech",
        rating: 4.2,
        description:
          "Fast wireless charging pad for smartphones with Qi technology. Compatible with all modern devices.",
        inStock: true,
      },
      {
        id: 4,
        name: "Bluetooth Speaker",
        price: 79.99,
        image: "/speaker.jpg",
        category: "Electronics",
        brand: "SoundMax",
        rating: 4.4,
        description:
          "Portable waterproof bluetooth speaker with 360-degree sound and 12-hour battery life.",
        inStock: true,
      },
      {
        id: 5,
        name: "Gaming Mouse",
        price: 59.99,
        image: "/mouse.jpg",
        category: "Electronics",
        brand: "PowerTech",
        rating: 4.6,
        description:
          "High-precision gaming mouse with RGB lighting and customizable buttons for competitive gaming.",
        inStock: true,
      },
      {
        id: 6,
        name: "Organic Cotton T-Shirt",
        price: 24.99,
        image: "/tshirt.jpg",
        category: "Clothing",
        brand: "EcoWear",
        rating: 4.7,
        description:
          "Comfortable organic cotton t-shirt made from sustainable materials. Soft, breathable, and eco-friendly.",
        inStock: true,
      },
      {
        id: 7,
        name: "Denim Jeans",
        price: 89.99,
        image: "/jeans.jpg",
        category: "Clothing",
        brand: "EcoWear",
        rating: 4.5,
        description:
          "Classic fit denim jeans made with premium cotton blend. Durable and stylish for everyday wear.",
        inStock: true,
      },
      {
        id: 8,
        name: "Winter Jacket",
        price: 149.99,
        image: "/jacket.jpg",
        category: "Clothing",
        brand: "EcoWear",
        rating: 4.8,
        description:
          "Warm and stylish winter jacket with water-resistant coating and thermal insulation.",
        inStock: true,
      },
      {
        id: 9,
        name: "Stainless Steel Water Bottle",
        price: 19.99,
        image: "/waterbottle.jpg",
        category: "Home & Garden",
        brand: "HydroLife",
        rating: 4.6,
        description:
          "Insulated water bottle keeps drinks cold for 24 hours and hot for 12 hours. BPA-free and leak-proof.",
        inStock: false,
      },
      {
        id: 10,
        name: "Garden Tool Set",
        price: 45.99,
        image: "/tools.jpg",
        category: "Home & Garden",
        brand: "HydroLife",
        rating: 4.3,
        description:
          "Complete set of essential garden tools including trowel, pruners, and watering can.",
        inStock: true,
      },
      {
        id: 11,
        name: "Indoor Plant Pot",
        price: 29.99,
        image: "/pot.jpg",
        category: "Home & Garden",
        brand: "HydroLife",
        rating: 4.1,
        description:
          "Beautiful ceramic plant pot for indoor plants with drainage holes and matching saucer.",
        inStock: true,
      },
      {
        id: 12,
        name: "Leather Wallet",
        price: 49.99,
        image: "/wallet.jpg",
        category: "Accessories",
        brand: "LeatherCraft",
        rating: 4.8,
        description:
          "Genuine leather wallet with RFID protection and multiple card slots. Handcrafted quality.",
        inStock: true,
      },
      {
        id: 13,
        name: "Sunglasses",
        price: 129.99,
        image: "/sunglasses.jpg",
        category: "Accessories",
        brand: "LeatherCraft",
        rating: 4.7,
        description:
          "Premium polarized sunglasses with UV400 protection and lightweight titanium frame.",
        inStock: true,
      },
      {
        id: 14,
        name: "Watch Band",
        price: 34.99,
        image: "/watchband.jpg",
        category: "Accessories",
        brand: "LeatherCraft",
        rating: 4.4,
        description:
          "Replaceable leather watch band compatible with most smartwatches. Premium Italian leather.",
        inStock: true,
      },
      {
        id: 15,
        name: "Smart Home Hub",
        price: 199.99,
        image: "/hub.jpg",
        category: "Electronics",
        brand: "FitTech",
        rating: 4.2,
        description:
          "Central hub for smart home automation with voice control and app integration.",
        inStock: true,
      },
      {
        id: 16,
        name: "USB-C Cable",
        price: 12.99,
        image: "/cable.jpg",
        category: "Electronics",
        brand: "PowerTech",
        rating: 4.0,
        description:
          "High-speed USB-C charging cable with fast data transfer and durable braided design.",
        inStock: true,
      },
      {
        id: 17,
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
        id: 18,
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
        id: 19,
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
        id: 20,
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
        id: 21,
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
        id: 22,
        name: "Winter Jacket",
        price: 149.99,
        image: "🧥",
        category: "Clothing",
        brand: "EcoWear",
        rating: 4.8,
        description: "Warm and stylish winter jacket",
        inStock: true,
      },
      {
        id: 23,
        name: "Denim Jeans",
        price: 89.99,
        image: "/jeans.jpg",
        category: "Clothing",
        brand: "EcoWear",
        rating: 4.5,
        description: "Classic fit denim jeans",
        inStock: true,
      },
      {
        id: 24,
        name: "Winter Jacket",
        price: 149.99,
        image: "/jacket.jpg",
        category: "Clothing",
        brand: "EcoWear",
        rating: 4.8,
        description: "Warm and stylish winter jacket",
        inStock: true,
      },

      // Home & Garden Category
      {
        id: 25,
        name: "Stainless Steel Water Bottle",
        price: 19.99,
        image: "/waterbottle.jpg",
        category: "Home & Garden",
        brand: "HydroLife",
        rating: 4.6,
        description: "Insulated water bottle keeps drinks cold for 24 hours",
        inStock: false,
      },
      {
        id: 26,
        name: "Garden Tool Set",
        price: 45.99,
        image: "/tools.jpg",
        category: "Home & Garden",
        brand: "HydroLife",
        rating: 4.3,
        description: "Complete set of essential garden tools",
        inStock: true,
      },
      {
        id: 27,
        name: "Indoor Plant Pot",
        price: 29.99,
        image: "/pot.jpg",
        category: "Home & Garden",
        brand: "HydroLife",
        rating: 4.1,
        description: "Beautiful ceramic plant pot for indoor plants",
        inStock: true,
      },

      // Accessories Category
      {
        id: 28,
        name: "Leather Wallet",
        price: 49.99,
        image: "/wallet.jpg",
        category: "Accessories",
        brand: "LeatherCraft",
        rating: 4.8,
        description: "Genuine leather wallet with RFID protection",
        inStock: true,
      },
      {
        id: 29,
        name: "Sunglasses",
        price: 129.99,
        image: "/sunglasses.jpg",
        category: "Accessories",
        brand: "LeatherCraft",
        rating: 4.7,
        description: "Premium polarized sunglasses",
        inStock: true,
      },
      {
        id: 30,
        name: "Watch Band",
        price: 34.99,
        image: "/watchband.jpg",
        category: "Accessories",
        brand: "LeatherCraft",
        rating: 4.4,
        description: "Replaceable leather watch band",
        inStock: true,
      },

      // Additional products to cover all brands
      {
        id: 31,
        name: "Smart Home Hub",
        price: 199.99,
        image: "/hub.jpg",
        category: "Electronics",
        brand: "FitTech",
        rating: 4.2,
        description: "Central hub for smart home automation",
        inStock: true,
      },
      {
        id: 32,
        name: "USB-C Cable",
        price: 12.99,
        image: "/cable.jpg",
        category: "Electronics",
        brand: "PowerTech",
        rating: 4.0,
        description: "High-speed USB-C charging cable",
        inStock: true,
      },
      {
        id: 33,
        name: "USB-C Cable",
        price: 12.99,
        image: "/cable.jpg",
        category: "Electronics",
        brand: "PowerTech",
        rating: 4.0,
        description: "High-speed USB-C charging cable",
        inStock: true,
      },
    ],
    []
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = mockProducts.find((p) => p.id === productId);

  // Generate multiple images for gallery (mock)
  const productImages = useMemo(() => {
    if (!product) return [];
    return [
      product.image,
      product.image, // In real app, these would be different angles
      product.image,
      product.image,
    ];
  }, [product]);

  // Get related products (same category, different product)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return mockProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, mockProducts]);

  const totalPrice = product ? product.price * quantity : 0;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCartClick = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        handleAddToCart(product);
      }
      // Reset quantity after adding to cart
      setQuantity(1);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  href="/products"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
                >
                  Products
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-6">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-blue-500 ${
                      index === selectedImageIndex
                        ? "ring-2 ring-blue-500"
                        : "ring-1 ring-gray-300"
                    }`}
                  >
                    <span className="sr-only">Image {index + 1}</span>
                    <div className="absolute inset-0 rounded-md overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">
                          Product Image {index + 1}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main image */}
            <div className="w-full aspect-square">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden">
                <span className="text-gray-500 text-lg">
                  Main Product Image
                </span>
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                    -{product.discount}% OFF
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-lg sm:text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center space-x-2">
                <p className="text-lg sm:text-3xl tracking-tight text-gray-900 font-bold">
                  ${totalPrice.toFixed(2)}
                </p>
                {product.originalPrice && (
                  <p className="text-lg sm:text-xl text-gray-500 line-through">
                    ${(product.originalPrice * quantity).toFixed(2)}
                  </p>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                ${product.price.toFixed(2)} each
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {product.rating} out of 5 stars
                </p>
              </div>
            </div>

            {/* Brand and Category */}
            <div className="mt-6">
              <div className="flex items-center space-x-4 text-sm">
                <span className="font-medium text-gray-900">Brand:</span>
                <span className="text-gray-600">{product.brand}</span>
                <span className="font-medium text-gray-900">Category:</span>
                <span className="text-gray-600">{product.category}</span>
              </div>
            </div>

            {/* Availability */}
            <div className="mt-6">
              <div className="flex items-center">
                <div
                  className={`h-3 w-3 rounded-full mr-2 ${
                    product.inStock ? "bg-green-400" : "bg-red-400"
                  }`}
                />
                <p
                  className={`text-sm font-medium ${
                    product.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-900">Description</h3>
              <div className="text-sm sm:text-base mt-2 prose prose-sm text-gray-600">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mt-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium text-gray-900 mr-3"
                  >
                    Quantity:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="p-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(parseInt(e.target.value) || 1)
                      }
                      className="w-16 px-2 py-2 text-center border-0 focus:ring-0 focus:outline-none"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-2 text-gray-600 hover:text-gray-800"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCartClick}
                disabled={!product.inStock}
                className={`mt-6 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                  product.inStock
                    ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    : "bg-gray-400 cursor-not-allowed"
                } transition-colors duration-200`}
              >
                {product.inStock ? `Add ${quantity} to Cart` : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  <div className="aspect-square bg-gray-200 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">
                        Product Image
                      </span>
                    </div>
                    {relatedProduct.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{relatedProduct.discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 mb-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      {relatedProduct.brand}
                    </p>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(relatedProduct.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-600">
                        ({relatedProduct.rating})
                      </span>
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                      {relatedProduct.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${relatedProduct.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      disabled={!product.inStock}
                      className={`w-full py-1 px-3 sm:py-3 rounded-md text-xs sm:text-base font-medium transition-colors duration-200 ${
                        product.inStock
                          ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
