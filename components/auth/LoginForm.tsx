/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { toast } from "sonner";

export default function LoginForm() {
  // Default credentials for roles
  const defaultCredentials = {
    user: {
      email: "inez@mailinator.com",
      password: "1234567",
    },
    admin: {
      email: "admin@example.com",
      password: "admin1234",
    },
  };

  const [userLogin, { isLoading }] = useLoginUserMutation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: defaultCredentials.user.email,
    password: defaultCredentials.user.password,
    role: "user",
  });

  // Update email/password automatically when role changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email: defaultCredentials[prev.role as "user" | "admin"].email,
      password: defaultCredentials[prev.role as "user" | "admin"].password,
    }));
  }, [formData.role]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For role change, update email and password accordingly (handled in useEffect)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted:", formData);

    try {
      const { role, ...rest } = formData;
      const res = await userLogin(rest).unwrap();
      console.log("Login success:", res);

      if (res.success) {
        if (res?.data?.user?.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else if (res?.data?.user?.role === "USER") {
          router.push("/user/dashboard");
        }
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="w-full max-w-xl bg-white p-8 rounded-sm">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            />
            <p
              onClick={() => router.push("/forgot-password")}
              className="mt-2 text-sm cursor-pointer text-orange-600 hover:underline"
            >
              Forgot password?
            </p>
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </legend>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                />
                User
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                />
                Admin
              </label>
            </div>
          </fieldset>

          <button
            onClick={handleSubmit}
            className={`w-full cursor-pointer bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-lg transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-orange-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
