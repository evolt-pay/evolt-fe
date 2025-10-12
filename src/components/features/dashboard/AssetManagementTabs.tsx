"use client";
import React, { useState } from "react";
import { Database, ArrowUpRight, ArrowDownLeft } from "lucide-react";

type TabType = "assets" | "deposit" | "withdraw" | "NONE";

const AssetTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("NONE");

  const tabs = [
    { id: "assets" as TabType, label: "My Assets", icon: Database },
    { id: "deposit" as TabType, label: "Deposit", icon: ArrowDownLeft },
    { id: "withdraw" as TabType, label: "Withdraw", icon: ArrowUpRight },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <div className="bg-black rounded-full p-2 shadow-2xl border border-slate-800">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-3 px-1 py-1.5 lg:px-6 lg:py-3.5 rounded-full
                    font-medium text-xs lg:text-base transition-all duration-300 ease-in-out
                    flex-1 justify-center
                    ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/50 scale-105"
                        : "text-gray-500 hover:text-gray-300 hover:bg-slate-900/50"
                    }
                  `}
                >
                  <Icon
                    className={`lg:w-5 lg:h-5 w-3 h-3 transition-transform duration-300 ${
                      isActive ? "scale-110" : ""
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        {activeTab !== "NONE" && (
          <div className="mt-8">
            <div className="text-center">
              {activeTab === "assets" && (
                <div className="space-y-4">Add component for managing it</div>
              )}
              {activeTab === "deposit" && (
                <div className="space-y-4">Add for Deposit</div>
              )}
              {activeTab === "withdraw" && (
                <div className="space-y-4">Add for withdrawal</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetTabs;
