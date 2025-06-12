"use client";
import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import ContainerWrapper from "../common/ContainerWrapper";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Meals", href: "/meals" },
  { name: "Booking", href: "/booking" },
  { name: "About us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
];

const DesktopHeader = () => {
  return (
    <ContainerWrapper className="pt-5 hidden lg:block">
      <div className="flex items-center justify-between">
        <Logo />
        <nav className="flex items-center space-x-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-medium text-gray-500 hover:text-orange-500"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/signup" className="px-4 py-2 rounded text-black">
            Sign Up
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded text-white bg-orange-400 hover:bg-orange-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default DesktopHeader;
