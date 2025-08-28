"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Product, FilterOptions, SortOption, CartItem } from "../types";
import Nav from "../nav/Nav";
import { useAppContext } from "../context/AppContext";
import { AiFillCloseCircle } from "react-icons/ai";

const ProductsContent = () => {
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
  // Mock data for demonstration
  const mockProducts: Product[] = useMemo(
    () => [
      // Electronics Category
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
        description: "High-quality wireless headphones with noise cancellation",
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
        description: "Advanced fitness tracking with heart rate monitor",
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
        description: "Fast wireless charging pad for smartphones",
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
        description: "Portable waterproof bluetooth speaker",
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
        description: "High-precision gaming mouse with RGB lighting",
        inStock: true,
      },

      // Clothing Category
      {
        id: 6,
        name: "Organic Cotton T-Shirt",
        price: 24.99,
        image: "/tshirt.jpg",
        category: "Clothing",
        brand: "EcoWear",
        rating: 4.7,
        description: "Comfortable organic cotton t-shirt",
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
        description: "Classic fit denim jeans",
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
        description: "Warm and stylish winter jacket",
        inStock: true,
      },

      // Home & Garden Category
      {
        id: 9,
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
        id: 10,
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
        id: 11,
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
        id: 12,
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
        id: 13,
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
        id: 14,
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
        id: 15,
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
        id: 16,
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

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Accessories",
  ];

  const brands = [
    "SoundMax",
    "FitTech",
    "EcoWear",
    "HydroLife",
    "PowerTech",
    "LeatherCraft",
  ];

  const sortOptions: SortOption[] = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Rating: High to Low", value: "rating-desc" },
  ];

  // const [products, setProducts] = useState<Product[]>(mockProducts);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(mockProducts);

  const [cart, setCart] = useState<CartItem[]>([]);

  const [filters, setFilters] = useState<FilterOptions>({
    category: [],
    brand: [],
    priceRange: [0, 2500],
    searchQuery: "",
  });

  const [pendingFilters, setPendingFilters] = useState<FilterOptions>({
    category: [],
    brand: [],
    priceRange: [0, 2500],
    searchQuery: "",
  });

  const [sortBy, setSortBy] = useState<string>("newest");
  const [isClient, setIsClient] = useState(false);

  const searchParams = useSearchParams();

  // Ensure hydration safety
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Only run on client side

    const categoryParam = searchParams.get("category");
    const brandParam = searchParams.get("brand");
    const priceMinParam = searchParams.get("priceMin");
    const priceMaxParam = searchParams.get("priceMax");
    const searchQueryParam = searchParams.get("search");

    if (categoryParam) {
      const newFilters = {
        ...filters,
        category: [categoryParam],
      };
      setFilters(newFilters);
      setPendingFilters(newFilters);
    }
    if (brandParam) {
      const newFilters = {
        ...filters,
        brand: [brandParam],
      };
      setFilters(newFilters);
      setPendingFilters(newFilters);
    }
    if (priceMinParam) {
      const newFilters = {
        ...filters,
        priceRange: [parseInt(priceMinParam) || 0, filters.priceRange[1]] as [
          number,
          number
        ],
      };
      setFilters(newFilters);
      setPendingFilters(newFilters);
    }
    if (priceMaxParam) {
      const newFilters = {
        ...filters,
        priceRange: [
          filters.priceRange[0],
          parseInt(priceMaxParam) || 2500,
        ] as [number, number],
      };
      setFilters(newFilters);
      setPendingFilters(newFilters);
    }
    if (searchQueryParam) {
      const newFilters = {
        ...filters,
        searchQuery: searchQueryParam,
      };
      setFilters(newFilters);
      setPendingFilters(newFilters);
    }
  }, [searchParams, isClient, filters]);

  // Filter and sort products
  const applyFiltersAndSort = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      // Category filter - if no categories selected, show all
      if (filters.category.length > 0) {
        if (!filters.category.includes(product.category)) return false;
      }

      // Brand filter - if no brands selected, show all
      if (filters.brand.length > 0) {
        if (!filters.brand.includes(product.brand)) return false;
      }
      // Price range filter
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Search query filter
      if (
        filters.searchQuery &&
        !(
          product.name
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase()) ||
          product.brand
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase()) ||
          product.category
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase())
        )
      ) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [mockProducts, filters, sortBy]);

  useEffect(() => {
    setFilteredProducts(applyFiltersAndSort);
  }, [applyFiltersAndSort]);

  // Add to cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  // Get cart total count
  // const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Handle pending filter changes
  const handlePendingFilterChange = (
    filterType: keyof FilterOptions,
    value: string | string[] | number[]
  ) => {
    setPendingFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Apply pending filters
  const applyFilters = () => {
    setFilters(pendingFilters);
  };

  // Check if there are pending changes
  const hasPendingChanges =
    JSON.stringify(filters) !== JSON.stringify(pendingFilters);

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      category: [],
      brand: [],
      priceRange: [0, 2500] as [number, number],
      searchQuery: "",
    };
    setFilters(clearedFilters);
    setPendingFilters(clearedFilters);
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      <div
        className="fixed bg-blue-500 top-18 right-0 z-50 p-1 pl-2 text-white text-sm rounded-bl-full rounded-tl-full lg:hidden"
        onClick={() => setShowFilters(!showFilters)}
      >
        Show Filters
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 relative lg:block">
            <div className="relative">
              <div
                className={`fixed bg-white rounded-lg shadow-sm p-6 w-full z-1  ${
                  showFilters ? "left-0 " : "-left-[110%]"
                } transition-all top-0 h-screen lg:h-auto flex flex-col justify-center lg:block z-51 lg:static lg:w-full lg:left-auto lg:top-auto`}
              >
                {/* className={`absolute bg-white rounded-lg shadow-sm p-6 w-full z-1 top-9  ${
                  showFilters ? "left-0" : "-left-[110%]"
                } transition-all lg:fixed lg:w-[18%] lg:left-[0%]`} */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filters
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-sm text-blue-600 lg:hidden hover:text-blue-800"
                  >
                    <AiFillCloseCircle size={26} />
                  </button>
                </div>
                {/* <p className="text-xs text-gray-500 mb-4">
                  Select categories and brands to filter products. No selection
                  shows all products.
                </p> */}

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3 mt-9">
                    Category
                  </h4>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const productCount = mockProducts.filter(
                        (p) => p.category === category
                      ).length;

                      return (
                        <label
                          key={category}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={pendingFilters.category.includes(
                                category
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handlePendingFilterChange("category", [
                                    ...pendingFilters.category,
                                    category,
                                  ]);
                                } else {
                                  handlePendingFilterChange(
                                    "category",
                                    pendingFilters.category.filter(
                                      (c) => c !== category
                                    )
                                  );
                                }
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {category}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {productCount}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Brand
                  </h4>
                  <div className="space-y-2">
                    {brands.map((brand) => {
                      const productCount = mockProducts.filter(
                        (p) => p.brand === brand
                      ).length;

                      return (
                        <label
                          key={brand}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={pendingFilters.brand.includes(brand)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handlePendingFilterChange("brand", [
                                    ...pendingFilters.brand,
                                    brand,
                                  ]);
                                } else {
                                  handlePendingFilterChange(
                                    "brand",
                                    pendingFilters.brand.filter(
                                      (b) => b !== brand
                                    )
                                  );
                                }
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {brand}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {productCount}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={pendingFilters.priceRange[0]}
                        onChange={(e) =>
                          handlePendingFilterChange("priceRange", [
                            parseInt(e.target.value) || 0,
                            pendingFilters.priceRange[1],
                          ] as [number, number])
                        }
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={pendingFilters.priceRange[1]}
                        onChange={(e) =>
                          handlePendingFilterChange("priceRange", [
                            pendingFilters.priceRange[0],
                            parseInt(e.target.value) || 2500,
                          ] as [number, number])
                        }
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Apply Filters Button */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between gap-3">
                  <button
                    onClick={clearFilters}
                    className="w-full border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => {
                      applyFilters();
                      setShowFilters(false);
                    }}
                    disabled={!hasPendingChanges}
                    className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                      hasPendingChanges
                        ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Apply Filters
                    {hasPendingChanges && (
                      <span className="ml-2 inline-flex items-center justify-center w-4 h-4 text-xs bg-blue-500 text-white rounded-full">
                        !
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex items-center justify-between mb-6 flex-col gap-5 lg:flex-row">
              <div className="flex items-center space-x-4 flex-col lg:flex-row w-full">
                <p className="text-sm text-gray-700 mb-2 font-bold">
                  {filters.searchQuery
                    ? `Search results for "${filters.searchQuery}" - ${filteredProducts.length} of ${mockProducts.length} products`
                    : `Showing ${filteredProducts.length} of ${mockProducts.length} products`}
                </p>
                {/* Show active filters */}
                {(filters.category.length > 0 ||
                  filters.brand.length > 0 ||
                  filters.searchQuery) && (
                  <div className="flex items-center space-x-2 flex-wrap gap-2">
                    <span className="text-sm text-gray-500">
                      Active filters:
                    </span>
                    {filters.category.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {cat}
                      </span>
                    ))}
                    {filters.brand.map((brand) => (
                      <span
                        key={brand}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {brand}
                      </span>
                    ))}
                    {filters.searchQuery && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        &quot;{filters.searchQuery}&quot;
                        <button
                          onClick={() =>
                            handlePendingFilterChange("searchQuery", "")
                          }
                          className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 w-full">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
                  onClick={() => {
                    window.location.href = `/products/${product.id}`;
                  }}
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-200 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">
                        Product Image
                      </span>
                    </div>
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{product.discount}%
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="mb-2">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-3 w-3 ${
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
                      <span className="ml-1 text-xs text-gray-600">
                        ({product.rating})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      disabled={!product.inStock}
                      className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                        product.inStock
                          ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.343A7.962 7.962 0 0112 9c-2.34 0-4.29-1.009-5.824-2.562M15 6.343A7.962 7.962 0 0112 9c-2.34 0-4.29-1.009-5.824-2.562"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No products found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your filters or search terms.
                </p>
                <div className="mt-6">
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
};

export default page;
