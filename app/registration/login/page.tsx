"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { showToast } from "@/app/components/Toast";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

const Login = () => {
  const router = useRouter();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [resend, setResend] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify-otp`,
        {
          email,
          otp: otpCode,
          purpose: "login",
        }
      );

      if (response.status === 200) {
        showToast({
          message: "Login successful!",
          type: "success",
        });
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data.user.id);
        sessionStorage.setItem("email", response.data.user.email);
        sessionStorage.setItem("name", response.data.user.name);
        setShowOtpModal(false);
        router.push("/");
      }
    } catch (error: unknown) {
      const firstInput = document.getElementById("otp-0");
      const apiError = error as AxiosError<{ message: string }>;

      if (apiError.response) {
        showToast({
          message: apiError.response.data?.message || "Something went wrong",
          type: "error",
        });
      } else if (apiError.request) {
        setVerificationError("No response from server");
      } else {
        setVerificationError(
          apiError.message || "An unexpected error occurred"
        );
      }
      if (firstInput) firstInput.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    setEmail(formData.email); // Save email for OTP verification

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    // Simulate API call
    try {
      await axios
        .post(
          process.env.NEXT_PUBLIC_API_BASE_URL + "/api/auth/login",
          formData
        )
        .then(() => {
          showToast({
            message:
              "Your login OTP has been sent to your email and expires in 10 minutes",
            type: "warning",
          });
          setShowOtpModal(true);
          setEmail(formData.email);
        });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      if (error.response) {
        // This is where the backend sends its custom error message
        setLoginError(error.response.data?.message || "Something went wrong");
        showToast({
          message: error.response.data?.message || "Something went wrong",
          type: "error",
        });
      } else if (error.request) {
        // Request was made but no response
        setLoginError("No response from server. Please try again.");
      } else {
        // Something else (like a config error)
        setLoginError(error.message || "An unexpected error occurred");
        console.error("Login error:", error);
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
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href="/registration/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                create a new account
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
                {loginError && (
                  <p className="mt-2 text-sm text-red-600 text-center">
                    {loginError}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
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
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
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
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <span className="text-lg text-blue-600">
                    <FaGoogle />
                  </span>
                  <span className="ml-2">Google</span>
                </button>

                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Facebook</span>
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
          <h2 className="text-md mb-5 sm:mb-8">
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
            <div
              className="text-sm mb-4 text-blue-600 cursor-pointer"
              onClick={
                !resend
                  ? async () => {
                      setResend(true);
                      await axios
                        .post(
                          process.env.NEXT_PUBLIC_API_BASE_URL +
                            "/api/auth/resend-otp",
                          {
                            email,
                            purpose: "login",
                          }
                        )
                        .then((res) => {
                          showToast({
                            message: res.data.message,
                            type: "success",
                          });
                        })
                        .catch((err) => {
                          showToast({
                            message: err.response.data.message,
                            type: "error",
                          });
                          setResend(false);
                        });
                    }
                  : () => {}
              }
            >
              Resend OTP
            </div>
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

export default Login;
