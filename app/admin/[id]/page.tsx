"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Dialog } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { Flex } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  status: "active" | "inactive";
  image: string;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: number;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  status: string;
}

const AdminPanel = () => {
  const params = useParams();
  const adminId = params.id as string;

  const [activeSection, setActiveSection] = useState<
    "dashboard" | "products" | "orders" | "customers" | "reports"
  >("dashboard");

  // Mock data - initialize as empty to prevent hydration issues
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    status: "active",
    brand: "QodeByte",
    image: "",
  });
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Load data after component mounts to prevent hydration issues
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 89.99,
        category: "Electronics",
        brand: "SoundMax",
        stock: 45,
        status: "active",
        image: "/headphones.jpg",
      },
      {
        id: 2,
        name: "Smart Fitness Watch",
        price: 199.99,
        category: "Electronics",
        brand: "FitTech",
        stock: 23,
        status: "active",
        image: "/smartwatch.jpg",
      },
      {
        id: 3,
        name: "Organic Cotton T-Shirt",
        price: 24.99,
        category: "Clothing",
        brand: "EcoWear",
        stock: 0,
        status: "inactive",
        image: "/tshirt.jpg",
      },
      {
        id: 4,
        name: "Bluetooth Speaker",
        price: 79.99,
        category: "Electronics",
        brand: "SoundMax",
        stock: 67,
        status: "active",
        image: "/speaker.jpg",
      },
      {
        id: 5,
        name: "Leather Wallet",
        price: 49.99,
        category: "Accessories",
        brand: "LeatherCraft",
        stock: 34,
        status: "active",
        image: "/wallet.jpg",
      },
    ]);

    setOrders([
      {
        id: "ORD-2024-001",
        customer: "John Doe",
        email: "john@example.com",
        date: "2024-01-15",
        status: "delivered",
        total: 299.97,
        items: 3,
      },
      {
        id: "ORD-2024-002",
        customer: "Jane Smith",
        email: "jane@example.com",
        date: "2024-01-14",
        status: "shipped",
        total: 149.98,
        items: 2,
      },
      {
        id: "ORD-2024-003",
        customer: "Mike Johnson",
        email: "mike@example.com",
        date: "2024-01-13",
        status: "processing",
        total: 79.99,
        items: 1,
      },
      {
        id: "ORD-2024-004",
        customer: "Sarah Wilson",
        email: "sarah@example.com",
        date: "2024-01-12",
        status: "pending",
        total: 199.99,
        items: 1,
      },
      {
        id: "ORD-2024-005",
        customer: "David Brown",
        email: "david@example.com",
        date: "2024-01-11",
        status: "cancelled",
        total: 89.99,
        items: 1,
      },
    ]);

    setCustomers([
      {
        id: "CUST-001",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 (555) 123-4567",
        orders: 5,
        totalSpent: 899.95,
        status: "active",
      },
      {
        id: "CUST-002",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1 (555) 234-5678",
        orders: 3,
        totalSpent: 449.97,
        status: "active",
      },
      {
        id: "CUST-003",
        name: "Mike Johnson",
        email: "mike@example.com",
        phone: "+1 (555) 345-6789",
        orders: 2,
        totalSpent: 179.98,
        status: "active",
      },
      {
        id: "CUST-004",
        name: "Sarah Wilson",
        email: "sarah@example.com",
        phone: "+1 (555) 456-7890",
        orders: 1,
        totalSpent: 199.99,
        status: "inactive",
      },
      {
        id: "CUST-005",
        name: "David Brown",
        email: "david@example.com",
        phone: "+1 (555) 567-8901",
        orders: 4,
        totalSpent: 679.96,
        status: "active",
      },
    ]);

    setIsLoaded(true);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = (
    type: "order" | "product" | "customer",
    id: string | number,
    newStatus: string
  ) => {
    if (type === "order") {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? { ...order, status: newStatus as Order["status"] }
            : order
        )
      );
    } else if (type === "product") {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id
            ? { ...product, status: newStatus as Product["status"] }
            : product
        )
      );
    } else if (type === "customer") {
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === id
            ? { ...customer, status: newStatus as Customer["status"] }
            : customer
        )
      );
    }
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      status: product.status,
      brand: product.brand,
      image: product.image,
    });
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !newProduct.name ||
      newProduct.price <= 0 ||
      newProduct.stock < 0 ||
      !newProduct.category ||
      !newProduct.image
    ) {
      alert("Please fill in all required fields with valid values");
      return;
    }

    if (editingProduct) {
      // Update existing product
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...newProduct,
                id: editingProduct.id,
                status: newProduct.status as "active" | "inactive",
              }
            : p
        )
      );
      setEditingProduct(null);
    } else {
      // Add new product
      setProducts((prev) => [
        ...prev,
        {
          id: prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
          name: newProduct.name,
          price: newProduct.price,
          category: newProduct.category,
          brand: newProduct.brand,
          stock: newProduct.stock,
          status: "active",
          image: "/wallet.jpg",
        },
      ]);
    }

    // Reset the form and close the modal
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      category: "",
      status: "active",
      brand: "QodeByte",
      image: "",
    });

    setShowAddModal(false);

    // Show success message
    alert("Product added successfully!");
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const renderSidebar = () => (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white p-2 rounded-md shadow-md hover:bg-gray-50"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-30 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Admin Panel
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">ID: {adminId}</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <svg
                className="h-5 w-5"
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
          </div>
        </div>

        <nav className="mt-4 sm:mt-6">
          <div className="px-3 space-y-1">
            <button
              onClick={() => {
                setActiveSection("dashboard");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === "dashboard"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <svg
                className="mr-3 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z"
                />
              </svg>
              Dashboard
            </button>

            <button
              onClick={() => {
                setActiveSection("products");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors mt-1 ${
                activeSection === "products"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <svg
                className="mr-3 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              Products
            </button>

            <button
              onClick={() => {
                setActiveSection("orders");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors mt-1 ${
                activeSection === "orders"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <svg
                className="mr-3 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Orders
            </button>

            <button
              onClick={() => {
                setActiveSection("customers");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors mt-1 ${
                activeSection === "customers"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <svg
                className="mr-3 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              Customers
            </button>

            <button
              onClick={() => {
                setActiveSection("reports");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors mt-1 ${
                activeSection === "reports"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <svg
                className="mr-3 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Reports
            </button>
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <Link
            href="/"
            className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Store
          </Link>
        </div>
      </div>
    </>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Products
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {products.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Customers
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {customers.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                $
                {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Orders
          </h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Low Stock Products
          </h3>
          <div className="space-y-3">
            {products
              .filter((p) => p.stock < 30)
              .map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        product.stock === 0 ? "text-red-600" : "text-yellow-600"
                      }`}
                    >
                      {product.stock} in stock
                    </p>
                    <p className="text-sm text-gray-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Add loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {renderSidebar()}

      <div className="flex-1 lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8">
          {activeSection === "dashboard" && renderDashboard()}
          {activeSection === "products" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Product Management
                </h2>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  Add Product
                </button>
              </div>

              {/* Mobile Card View */}
              <div className="block sm:hidden space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-gray-500 text-xs">IMG</span>
                        </div>
                        <div>
                          <Link
                            href={`/admin/product/${product.id}`}
                            className="text-sm font-medium text-blue-600 hover:text-blue-900"
                          >
                            {product.name}
                          </Link>
                          <div className="text-xs text-gray-500">
                            {product.brand}
                          </div>
                        </div>
                      </div>
                      <select
                        value={product.status}
                        onChange={(e) =>
                          handleStatusChange(
                            "product",
                            product.id,
                            e.target.value
                          )
                        }
                        className={`text-xs font-medium rounded-full px-2 py-1 ${getStatusColor(
                          product.status
                        )} border-none`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Category:</span>
                        <div className="font-medium">{product.category}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Price:</span>
                        <div className="font-medium">
                          ${product.price.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Stock:</span>
                        <div
                          className={`font-medium ${
                            product.stock === 0
                              ? "text-red-600"
                              : product.stock < 30
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {product.stock}
                        </div>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-600 hover:text-blue-900 text-sm"
                        >
                          Edit
                        </button>
                        <Dialog.Root>
                          <Dialog.Trigger>
                            <Text color="red" className="cursor-pointer">
                              Delete
                            </Text>
                          </Dialog.Trigger>

                          <Dialog.Content maxWidth="450px">
                            <Dialog.Title>Delete Product</Dialog.Title>
                            <Dialog.Description size="2" mb="4">
                              Are you sure you want to delete {product.name}?
                            </Dialog.Description>

                            <Flex gap="3" mt="4" justify="end">
                              <Dialog.Close>
                                <Button variant="soft" color="gray">
                                  Cancel
                                </Button>
                              </Dialog.Close>
                              <Dialog.Close>
                                <Button
                                  color="red"
                                  className="cursor-pointer"
                                  onClick={() =>
                                    handleDeleteProduct(product.id)
                                  }
                                >
                                  Yes, Delete
                                </Button>
                              </Dialog.Close>
                            </Flex>
                          </Dialog.Content>
                        </Dialog.Root>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500 text-xs">
                                  IMG
                                </span>
                              </div>
                              <div className="ml-4">
                                <Link
                                  href={`/admin/product/${product.id}`}
                                  className="text-sm font-medium text-blue-600 hover:text-blue-900"
                                >
                                  {product.name}
                                </Link>
                                <div className="text-sm text-gray-500">
                                  {product.brand}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`text-sm font-medium ${
                                product.stock === 0
                                  ? "text-red-600"
                                  : product.stock < 30
                                  ? "text-yellow-600"
                                  : "text-green-600"
                              }`}
                            >
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={product.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  "product",
                                  product.id,
                                  e.target.value
                                )
                              }
                              className={`text-xs font-medium rounded-full px-2 py-1 ${getStatusColor(
                                product.status
                              )} border-none`}
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                            <Dialog.Root>
                              <Dialog.Trigger>
                                <Text color="red" className="cursor-pointer">
                                  Delete
                                </Text>
                              </Dialog.Trigger>

                              <Dialog.Content maxWidth="450px">
                                <Dialog.Title>Delete Product</Dialog.Title>
                                <Dialog.Description size="2" mb="4">
                                  Are you sure you want to delete {product.name}
                                  ?
                                </Dialog.Description>

                                <Flex gap="3" mt="4" justify="end">
                                  <Dialog.Close>
                                    <Button variant="soft" color="gray">
                                      Cancel
                                    </Button>
                                  </Dialog.Close>
                                  <Dialog.Close>
                                    <Button
                                      color="red"
                                      className="cursor-pointer"
                                      onClick={() =>
                                        handleDeleteProduct(product.id)
                                      }
                                    >
                                      Yes, Delete
                                    </Button>
                                  </Dialog.Close>
                                </Flex>
                              </Dialog.Content>
                            </Dialog.Root>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {activeSection === "orders" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Order Management
                </h2>
                <div className="flex items-center space-x-2">
                  <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto">
                    <option>All Orders</option>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="block sm:hidden space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.id}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.customer}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.email}
                        </div>
                      </div>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange("order", order.id, e.target.value)
                        }
                        className={`text-xs font-medium rounded-full px-2 py-1 ${getStatusColor(
                          order.status
                        )} border-none`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Date:</span>
                        <div className="font-medium">
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Items:</span>
                        <div className="font-medium">{order.items}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Total:</span>
                        <div className="font-medium">
                          ${order.total.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          // onClick={() => openModal("edit", order)}
                          className="text-blue-600 hover:text-blue-900 text-sm"
                        >
                          View
                        </button>
                        <button className="text-green-600 hover:text-green-900 text-sm">
                          Print
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {order.customer}
                              </div>
                              <div className="text-sm text-gray-500">
                                {order.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.items}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  "order",
                                  order.id,
                                  e.target.value
                                )
                              }
                              className={`text-xs font-medium rounded-full px-2 py-1 ${getStatusColor(
                                order.status
                              )} border-none`}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              // onClick={() => openModal("edit", order)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              Print
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {activeSection === "customers" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Customer Management
                </h2>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="text"
                    placeholder="Search customers..."
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto"
                  />
                  <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto">
                    <option>All Customers</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="block sm:hidden space-y-4">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-medium text-sm">
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {customer.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {customer.email}
                          </div>
                          <div className="text-xs text-gray-500">
                            {customer.phone}
                          </div>
                        </div>
                      </div>
                      <select
                        value={customer.status}
                        onChange={(e) =>
                          handleStatusChange(
                            "customer",
                            customer.id,
                            e.target.value
                          )
                        }
                        className={`text-xs font-medium rounded-full px-2 py-1 ${getStatusColor(
                          customer.status
                        )} border-none`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Orders:</span>
                        <div className="font-medium">{customer.orders}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Total Spent:</span>
                        <div className="font-medium">
                          ${customer.totalSpent.toFixed(2)}
                        </div>
                      </div>
                      <div className="col-span-2 flex space-x-2">
                        <button
                          // onClick={() => openModal("edit", customer)}
                          className="text-blue-600 hover:text-blue-900 text-sm"
                        >
                          View
                        </button>
                        <button className="text-green-600 hover:text-green-900 text-sm">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Orders
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Spent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {customers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-medium text-sm">
                                  {customer.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {customer.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {customer.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {customer.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {customer.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {customer.orders}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${customer.totalSpent.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={customer.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  "customer",
                                  customer.id,
                                  e.target.value
                                )
                              }
                              className={`text-xs font-medium rounded-full px-2 py-1 ${getStatusColor(
                                customer.status
                              )} border-none`}
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              // onClick={() => openModal("edit", customer)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              Contact
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {activeSection === "reports" && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Reports & Analytics
              </h2>

              {/* Sales Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Sales Overview
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="text-2xl font-bold text-green-600">
                        $24,567
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Target: $32,000</span>
                      <span>75% Complete</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Top Products
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: "iPhone 15 Pro", sales: 45, revenue: "$44,955" },
                      { name: "MacBook Air M2", sales: 32, revenue: "$38,368" },
                      { name: "AirPods Pro", sales: 28, revenue: "$6,972" },
                      { name: "iPad Pro", sales: 19, revenue: "$18,981" },
                    ].map((product, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {product.sales} units sold
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {product.revenue}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    Monthly Revenue
                  </h3>
                  <div className="h-48 sm:h-64 flex items-end justify-between space-x-1 sm:space-x-2">
                    {[
                      { month: "Jan", value: 65 },
                      { month: "Feb", value: 78 },
                      { month: "Mar", value: 52 },
                      { month: "Apr", value: 88 },
                      { month: "May", value: 95 },
                      { month: "Jun", value: 75 },
                    ].map((data, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className="bg-blue-500 w-full rounded-t"
                          style={{ height: `${data.value}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-2">
                          {data.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    Order Status Distribution
                  </h3>
                  <div className="flex items-center justify-center h-48 sm:h-64">
                    <div className="relative w-48 h-48">
                      {/* Dummy Pie Chart */}
                      <div
                        className="absolute inset-0 rounded-full border-8 border-green-500"
                        style={{
                          clipPath:
                            "polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)",
                        }}
                      ></div>
                      <div
                        className="absolute inset-0 rounded-full border-8 border-blue-500"
                        style={{
                          clipPath:
                            "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
                        }}
                      ></div>
                      <div
                        className="absolute inset-0 rounded-full border-8 border-yellow-500"
                        style={{
                          clipPath:
                            "polygon(50% 50%, 50% 100%, 0% 100%, 0% 75%)",
                        }}
                      ></div>
                      <div
                        className="absolute inset-0 rounded-full border-8 border-red-500"
                        style={{
                          clipPath: "polygon(50% 50%, 0% 75%, 0% 0%, 50% 0%)",
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            156
                          </div>
                          <div className="text-sm text-gray-500">
                            Total Orders
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">
                        Delivered (45%)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">
                        Shipped (30%)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">
                        Processing (15%)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">
                        Cancelled (10%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      98.5%
                    </div>
                    <div className="text-sm text-gray-500">
                      Customer Satisfaction
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      2.3 days
                    </div>
                    <div className="text-sm text-gray-500">
                      Avg. Delivery Time
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      15.2%
                    </div>
                    <div className="text-sm text-gray-500">Return Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">
                      $127
                    </div>
                    <div className="text-sm text-gray-500">
                      Avg. Order Value
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`addproductModal fixed left-0 right-0 bottom-0 z-50 w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center ${
          showAddModal ? "top-0" : "-top-full"
        } transition-all`}
      >
        <div className="modal-content bg-white p-6 rounded-lg shadow-lg relative w-[90%] md:w-[80%] lg:w-[60%] max-h-[90vh] overflow-y-auto">
          <span
            className="close cursor-pointer absolute top-2 right-3 text-5xl"
            onClick={() => {
              setShowAddModal(false);
              setEditingProduct(null);
              setNewProduct({
                name: "",
                price: 0,
                stock: 0,
                category: "",
                status: "active",
                brand: "QodeByte",
                image: "",
              });
            }}
          >
            &times;
          </span>
          <h2 className="text-2xl font-bold mb-4">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleAddProduct}>
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <div className="mt-1 flex items-center">
                <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                  {newProduct.image ? (
                    <Image
                      src={newProduct.image}
                      alt="Product preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <svg
                      className="h-12 w-12 text-gray-300"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <div className="ml-4">
                  <label
                    htmlFor="image-upload"
                    className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                  >
                    {newProduct.image ? "Change" : "Upload"}
                    <input
                      id="image-upload"
                      name="image"
                      type="file"
                      className="sr-only"
                      required
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setNewProduct((prev) => ({
                              ...prev,
                              image: reader.result as string,
                            }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      accept="image/*"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-3">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>
            </div>

            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded p-2"
              required
            />
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price || ""}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="border border-gray-300 rounded p-2"
              required
            />
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={newProduct.stock || ""}
              onChange={handleInputChange}
              min="0"
              className="border border-gray-300 rounded p-2"
              required
            />
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              className="border border-gray-300 rounded p-2 bg-white"
              value={newProduct.category}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled className="text-gray-400">
                Select a category
              </option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
