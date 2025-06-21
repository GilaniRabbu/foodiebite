"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ContainerWrapper from "../common/ContainerWrapper";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Meals", href: "/meals" },
  { name: "Booking", href: "/booking" },
  { name: "About us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
];

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContainerWrapper className="py-5 block lg:hidden relative z-50">
      <div className="flex items-center justify-between">
        <Logo />
        <button
          onClick={() => setIsOpen(true)}
          className=" cursor-pointer text-gray-700"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-orange-300 border-b">
          <Logo />
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-700 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4 space-y-3">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block font-medium text-gray-700 hover:text-orange-500"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col space-y-2 ">
            <Link
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded text-black border border-gray-300 text-center"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded text-white bg-orange-400 hover:bg-orange-500 text-center"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default MobileHeader;
