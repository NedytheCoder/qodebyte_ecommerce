"use client";

import { useEffect, useState } from "react";
import { Product, Category } from "../types";
import Link from "next/link";
import { BsCart3 } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

interface NavProps {
  featuredCategories: Category[];
  cartCount: number;
  onAddToCart: (product: Product) => void;
  onLogin: () => void;
  onRegister: () => void;
  searchQuery: string;
  setSearchQuery: (e: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isCategoriesOpen: boolean;
  setIsCategoriesOpen: (arg0: boolean) => void;
  handleCategoryClick: (arg0: Category) => void;
}

const Nav = ({
  featuredCategories,
  cartCount,
  searchQuery,
  setSearchQuery,
  handleSearch,
  isCategoriesOpen,
  setIsCategoriesOpen,
  handleCategoryClick,
}: NavProps) => {
  const [check, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.sessionStorage.getItem("token");
      const userId = window.sessionStorage.getItem("userId");
      const email = window.sessionStorage.getItem("email");
      const name = window.sessionStorage.getItem("name");
      setToken(token);
      setUserId(userId);
      setEmail(email);
      setName(name);
    }
  }, []);

  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  return (
    <header
      className="bg-white shadow-sm sticky top-0 z-50"
      onClick={() => (isCategoriesOpen ? setIsCategoriesOpen(false) : "")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-lg lg:text-2xl font-bold text-blue-600">
                QodeByte
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-5 md:hidden">
            <Link href="/cart" className="text-blue-600 relative">
              <BsCart3 size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href={userId === null ? "/registration/login" : `/user/${userId}`}
              className="text-blue-600 relative"
            >
              <FaRegUserCircle size={24} />
            </Link>
            <div className="md:hidden">
              <label>
                <div className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
                  <input
                    className="hidden peer"
                    type="checkbox"
                    checked={check}
                    onChange={() => setChecked(!check)}
                  />
                  <div className="w-[50%] h-[2px] bg-blue-600 rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]"></div>
                  <div className="w-[50%] h-[2px] bg-blue-600 rounded-md transition-all duration-300 origin-center peer-checked:hidden"></div>
                  <div className="w-[50%] h-[2px] bg-blue-600 rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]"></div>
                </div>
              </label>
            </div>
          </div>
          <div className="hidden md:flex justify-between gap">
            {/* Navigation */}
            <nav className="hidden sm:flex items-center space-x-6">
              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Categories
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {featuredCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            handleCategoryClick(category);
                            // setChecked(!check);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                        >
                          <div className="flex items-center">
                            <span className="text-xl mr-3">
                              {category.icon}
                            </span>
                            <div>
                              <div className="font-medium">{category.name}</div>
                              <div className="text-xs text-gray-500">
                                {category.description}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="#"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Deals
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Support
              </Link>
            </nav>
            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pr-25 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <FaSearch size={15} />
                </button>
              </form>
            </div>
            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-gray-700 hover:text-blue-600"
              >
                <BsCart3 size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Auth buttons */}
              {!userId ? (
                <>
                  <Link
                    href="/registration/login"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/registration/signup"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <Link
                  href={`/user/${userId}`}
                  className="text-blue-600 relative"
                >
                  <FaRegUserCircle size={24} />
                </Link>
              )}
            </div>
          </div>
          {/* NAV FOR MOBILE PHONES */}
          <div
            className={`${
              !check ? "-left-full" : "left-0"
            } absolute w-full h-screen top-32 flex flex-col gap-5 transition-all z-50 bg-[rgba(0,0,0,0.5)]`}
            onClick={() => setChecked(false)}
          >
            <div
              className={`absolute w-[80%] bg-white left-0 p-5 flex flex-col gap-5 transition-all z-55`}
            >
              <div className="flex flex-col gap-3">
                {!token && (
                  <>
                    <div className="flex gap-2">
                      <Link
                        href="/registration/login"
                        className="text-gray-700 hover:text-blue-600 px-3 py-1 text-sm font-light border border-blue-600 rounded-md"
                      >
                        Login
                      </Link>
                      <Link
                        href="/registration/signup"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-light transition-colors"
                      >
                        Register
                      </Link>
                    </div>
                    <hr className="border border-gray-200 my-2" />
                  </>
                )}

                <h3 className="text-md font-semibold">Our Categories</h3>
                {featuredCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      handleCategoryClick(category);
                      setChecked(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  >
                    <div className="font-medium">{category.name}</div>
                  </button>
                ))}
                <hr className="border border-gray-200 my-2" />

                <Link
                  href="#"
                  onClick={() => setChecked(false)}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium mb-2"
                >
                  Deals
                </Link>
                <Link
                  href="#"
                  onClick={() => setChecked(false)}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-16 md:hidden">
        <form
          onSubmit={handleSearch}
          className="relative w-full flex items-center justify-center"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-[92%] px-4 py-2 pr-40 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            style={{ fontSize: "16px" }}
          />
          <button
            type="submit"
            className="absolute right-5 top-1/2 transform -translate-y-1/2 hover:bg-blue-700 text-blue-600 px-3 py-1.5 rounded-full text-sm font-light transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FaSearch size={15} />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Nav;
