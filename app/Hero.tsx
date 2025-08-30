"use client";

import { Product, Category } from "./types";
import Link from "next/link";

interface HeroProps {
  featuredCategories: Category[];
  featuredProducts: Product[];
  onAddToCart: (product: Product) => void;
  handleCategoryClick: (arg0: Category) => void;
}

const Hero = ({
  featuredCategories,
  featuredProducts,
  onAddToCart,
  handleCategoryClick,
}: HeroProps) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Welcome to the Future of Shopping
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100 max-w-3xl mx-auto px-4">
              Discover amazing deals on the latest tech products
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                href="/products"
                className="bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                Shop Now
              </Link>
              <Link
                href="#"
                className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="group cursor-pointer bg-gray-50 rounded-xl p-6 sm:p-8 text-center hover:bg-blue-50 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-4 sm:p-6 text-center">
                  <div className="text-6xl sm:text-7xl lg:text-8xl mb-3 sm:mb-4">
                    {product.image}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
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
                      <span className="ml-2 text-xs sm:text-sm text-gray-600">
                        ({product.rating})
                      </span>
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    ${product.price}
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
