import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="px-6 sm:px-8 lg:px-16 py-8 lg:py-12">
      <div className="container mx-auto">
        <div className="pb-5 border-b border-gray-200">
          <p className="text-gray-600 text-sm">Contact with us</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-8 mb-10">
          {/* Logo and Contact Info */}
          <div className="lg:col-span-1 lg:w-4/5">
            <h2 className="text-xl font-semibold mb-4">Foodie</h2>
            <p className="text-sm text-gray-600">
              When you walk into Foodie, you can&apos;t help but sense the
              familiar charm of dinners at grandma&apos;s.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Review
                </Link>
              </li>
            </ul>
          </div>

          {/* Utility */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Utility</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  License
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Reservation Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  2357 Gordon Street, CA
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  0123 456 789
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  foodie@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-5 border-t border-gray-200">
          <p className="text-gray-600 text-sm text-center">
            © 2025 GilaniRabbu. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
