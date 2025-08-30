"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
  const { cartItems, handleUpdateQuantity, handleRemoveFromCart } =
    useAppContext();
  const router = useRouter();

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product.discount
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 0) {
      handleUpdateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout page (to be implemented)
    router.push("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-2 sm:px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Shopping Cart
          </h1>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">Add some items to get started!</p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Table Header */}
              <div className="hidden sm:block bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-b">
                <div className="grid grid-cols-12 gap-2 sm:gap-4 text-xs sm:text-sm font-medium text-gray-700">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => {
                  const itemPrice = item.product.discount
                    ? item.product.price * (1 - item.product.discount / 100)
                    : item.product.price;
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <div key={item.product.id} className="p-4 sm:p-6">
                      {/* Mobile Layout */}
                      <div className="flex flex-col sm:hidden space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 text-base">
                              {item.product.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {item.product.brand}
                            </p>
                            {item.product.discount && (
                              <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full mt-1">
                                {item.product.discount}% OFF
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm mt-2">
                          <span className="font-medium text-gray-900">
                            ${itemPrice.toFixed(2)}
                          </span>
                          {item.product.discount && (
                            <span className="text-xs text-gray-500 line-through ml-2">
                              ${item.product.price.toFixed(2)}
                            </span>
                          )}
                          <div className="flex items-center space-x-2 ml-auto">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-medium text-gray-900">
                            Total: ${itemTotal.toFixed(2)}
                          </span>
                          <button
                            onClick={() =>
                              handleRemoveFromCart(item.product.id)
                            }
                            className="text-red-600 hover:text-red-800 text-xs ml-4 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      {/* Desktop Layout */}
                      <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                        {/* Product Info */}
                        <div className="col-span-6 flex items-center space-x-4">
                          <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {item.product.brand}
                            </p>
                            {item.product.discount && (
                              <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1">
                                {item.product.discount}% OFF
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-medium text-gray-900">
                              ${itemPrice.toFixed(2)}
                            </span>
                            {item.product.discount && (
                              <span className="text-sm text-gray-500 line-through">
                                ${item.product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="col-span-2 text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-medium text-gray-900">
                              ${itemTotal.toFixed(2)}
                            </span>
                            <button
                              onClick={() =>
                                handleRemoveFromCart(item.product.id)
                              }
                              className="text-red-600 hover:text-red-800 text-sm mt-1 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-4 sm:mt-6">
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>
                    Subtotal (
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items)
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-3 sm:pt-4">
                  <div className="flex justify-between text-base sm:text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-4 sm:mt-6"
              >
                Proceed to Checkout
              </button>

              <div className="mt-3 sm:mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-500">
                  <span>🔒</span>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
