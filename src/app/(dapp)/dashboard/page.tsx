"use client";
import AssetTabs from "@evolt/components/features/dashboard/AssetManagementTabs";
import { BalanceCard } from "@evolt/components/features/dashboard/BalanceCard";
import StartInvestings from "@evolt/components/features/dashboard/StartInvesting";
import React from "react";

function Page() {
  return (
    <div className="mt-10 w-full max-w-2xl m-auto space-y-5">
      <BalanceCard balance={0.0} currency="vUSD" />
      <AssetTabs />
      <StartInvestings />
    </div>
  );
}

export default Page;
