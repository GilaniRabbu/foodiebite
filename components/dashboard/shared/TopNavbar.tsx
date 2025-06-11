import React from "react";

const TopNavbar = () => {
  return (
    <header className="bg-white w-full fixed z-40 top-0 right-0 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1" />

        {/* Right side - Notifications */}
        <div className="flex items-center gap-4">
          

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
