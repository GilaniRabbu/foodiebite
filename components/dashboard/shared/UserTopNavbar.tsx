"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/authSlice";
import useLogout from "@/hooks/useLogout";

const UserTopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = useLogout();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useSelector(selectCurrentUser);

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "Guest";
  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() ||
    fullName.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header ref={menuRef} className="bg-white w-full fixed z-40 top-0 right-0 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1" />

        {/* Right side - Notifications */}
        <div className="flex items-center gap-4">
          {/* User Menu */}
          <div className="flex relative items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-gray-900">{fullName}</p>
              {user?.email && (
                <p className="text-xs text-gray-500">{user.email}</p>
              )}
            </div>
            <div onClick={toggleMenu} className="w-8 group cursor-pointer h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {initials}
              </span>
            </div>
            <div className={`absolute right-0 top-12  ${isOpen ? "block" : "hidden"} transition-all duration-200`}>
              <ul className="bg-white border border-gray-200 rounded-lg p-4 space-y-2 w-48">
                <li className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <Link href="/user/settings/profile">Profile</Link>
                </li>
                <li className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  <Link href="/user/settings/security">Security</Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default UserTopNavbar;
