import React from "react";
import { User, Shield } from "lucide-react";
import Link from "next/link";

const SettingsSidebar = () => {
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="w-52">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <nav className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                href={`/user/settings/${tab.id}`}
                key={tab.id}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default SettingsSidebar;
