"use client";

import type React from "react";

import { useState } from "react";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <section className="min-h-screen container mx-auto px-5 py-10 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Dark Background with Image */}
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 lg:p-12 flex flex-col justify-between">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-lg transform rotate-12"></div>
            <div className="absolute bottom-40 right-16 w-24 h-24 border border-white/20 rounded-lg transform -rotate-12"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-lg transform rotate-45"></div>
          </div>

          {/* Logo/Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-white font-bold text-xl">
                RestaurantFlow
              </span>
            </div>
          </div>

          {/* Central Visual Element */}
          <div className="relative z-10 flex-1 flex items-center justify-center">
            <div className="relative">
              {/* 3D Cube Effect */}
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-800 rounded-2xl transform rotate-12 shadow-2xl"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-red-400 via-red-500 to-red-700 rounded-xl transform -rotate-6 shadow-xl"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-red-300 via-red-400 to-red-600 rounded-lg shadow-lg flex items-center justify-center">
                  <div className="text-white text-4xl font-bold">🍽️</div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-green-500/20 rounded-full blur-xl"></div>
              <div className="absolute -top-4 -right-6 w-12 h-12 bg-orange-500/20 rounded-full blur-lg"></div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              &quot;Dining at RestaurantFlow has been an absolute pleasure from
              start to finish. Their team&apos;s expertise in culinary arts
              allowed them to bring our vision to life with precision and
              creativity. They don&apos;t just serve food; they craft an
              immersive dining experience that perfectly reflects our refined
              identity.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">MJ</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">
                  Maria Johnson
                </div>
                <div className="text-white/70 text-xs">
                  Food Critic at Culinary Excellence
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Have a reservation idea? Let&apos;s discuss it together.
              </h2>
              <p className="text-gray-600 leading-relaxed">
                I&apos;m always open to new opportunities. Feel free to drop me
                a line if you have any questions or projects.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="reservation">Reservation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Any additional information..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>123 Food Street, City</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>hello@restaurant.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Sun 9AM-11PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
