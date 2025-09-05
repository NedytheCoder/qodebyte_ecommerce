"use client";

import React from "react";
import Link from "next/link";
import Footer from "../Footer";

const OrderConfirmation = () => {
  // Generate a random order number for demo purposes
  const orderNumber = `ORD-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;
  const estimatedDelivery = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-4xl">✅</div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed
            and is being processed.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Order Number
                </h3>
                <p className="text-gray-600 font-mono">{orderNumber}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Estimated Delivery
                </h3>
                <p className="text-gray-600">{estimatedDelivery}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Order Status
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Processing
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tracking</h3>
                <p className="text-gray-600">
                  You&apos;ll receive tracking info via email
                </p>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="text-left mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What happens next?
            </h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-medium">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order Processing</p>
                  <p className="text-gray-600 text-sm">
                    We&apos;re preparing your items for shipment
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gray-600 text-sm font-medium">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Shipping Confirmation
                  </p>
                  <p className="text-gray-600 text-sm">
                    You&apos;ll receive an email with tracking information
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gray-600 text-sm font-medium">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Delivery</p>
                  <p className="text-gray-600 text-sm">
                    Your order will be delivered to your address
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
            >
              Continue Shopping
            </Link>

            <Link
              href="/"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium text-center"
            >
              Back to Home
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Questions about your order? Contact us at{" "}
              <a
                href="mailto:support@qodebyte.com"
                className="text-blue-600 hover:text-blue-800"
              >
                support@qodebyte.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:+1-555-123-4567"
                className="text-blue-600 hover:text-blue-800"
              >
                +1 (555) 123-4567
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
