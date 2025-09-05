"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { showToast } from "@/app/components/Toast";

const Signup = () => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  const handleOtpChange = (index: number, value: string) => {
    if (value === "" || /^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const otpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerificationError("");

    try {
      const otpCode = otp.join("");
      if (otpCode.length !== 6) {
        setVerificationError("Please enter a 6-digit OTP");
        return;
      }

      // Replace with your actual OTP verification API call
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/api/auth/verify-otp",
        {
          email,
          otp: otpCode,
          purpose: "register",
        }
      );

      if (response.status !== 200) {
        throw new Error("OTP verification failed");
      }

      const data = await response.data;
      // Handle successful verification (e.g., redirect to dashboard)
      showToast({
        message: data.message,
        type: "success",
      });
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userId", data.user.id);
      sessionStorage.setItem("email", data.user.email);
      sessionStorage.setItem("name", data.user.name);
      router.push("/");
    } catch (error: unknown) {
      // Focus first input
      const firstInput = document.getElementById("otp-0");
      const apiError = error as AxiosError<{ message: string }>;

      if (apiError.response) {
        showToast({
          message: apiError.response.data?.message || "Something went wrong",
          type: "error",
        });
      } else if (apiError.request) {
        setRegistrationError("No response from server");
      } else {
        setRegistrationError(
          apiError.message || "An unexpected error occurred"
        );
      }
      if (firstInput) firstInput.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const [registrationError, setRegistrationError] = useState("");

  const router = useRouter();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationError("");
    setIsLoading(true);

    try {
      // First validate the form
      const newErrors: Record<string, string> = {};

      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        // If no validation errors, proceed with registration
        await axios.post(
          process.env.NEXT_PUBLIC_API_BASE_URL + "/api/auth/register",
          formData
        );
        showToast({
          message:
            "Your verification OTP has been sent to your email and expires in 10 minutes",
          type: "warning",
        });
        setShowOtpModal(true);
        setEmail(formData.email);
      }
    } catch (error: unknown) {
      const apiError = error as AxiosError<{ message: string }>;
      if (apiError.response) {
        showToast({
          message:
            apiError.response.data?.message + ". Log In!" ||
            "Something went wrong",
          type: "error",
        });
        router.push("/registration/login");
      } else if (apiError.request) {
        setRegistrationError("No response from server");
      } else {
        setRegistrationError(
          apiError.message || "An unexpected error occurred"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href="/registration/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                sign in to your existing account
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
                {registrationError && (
                  <p className="mt-2 text-sm text-red-600 text-center">
                    {registrationError}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label
                htmlFor="agree-terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  "Create account"
                )}
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign up with Google</span>
                  <span className="text-lg text-blue-600">
                    <FaGoogle />
                  </span>
                  <span className="ml-2">Google</span>
                </button>

                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign up with Facebook</span>
                  <span className="text-lg text-blue-600">
                    <FaFacebook />
                  </span>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
            </div>
          </form>

          <div className="text-center">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`modal fixed z-10 top-0 ${
          showOtpModal ? "right-0" : "right-full"
        } w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center transition-all`}
      >
        <div className="modal-content bg-white p-4 w-[90%] sm:w-[45%] rounded relative">
          <span
            className="absolute right-1 top-1 text-blue-600"
            onClick={() => setShowOtpModal(false)}
          >
            <AiFillCloseCircle size={25} />
          </span>
          <h2 className="text-md sm:text-xl mb-5 sm:mb-8">
            Input the OTP verification code sent to your email{" "}
            {email && <span className="font-bold">{email}</span>}
          </h2>
          <form onSubmit={otpSubmit} className="w-full">
            <div className="flex justify-between mb-4 sm:mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder=""
                  autoComplete="one-time-code"
                  disabled={isVerifying}
                />
              ))}
            </div>
            {verificationError && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {verificationError}
              </p>
            )}
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <>
                  <span className="inline-block animate-spin mr-2">↻</span>
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
