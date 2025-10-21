"use client";
import React from "react";
import { Database, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import AssetTabs, {
  TabConfig,
} from "@evolt/components/features/dashboard/AssetManagementTabs";
import AssetContent from "@evolt/components/features/dashboard/AssetContent";
import { useSearchParams } from "next/navigation";
import { BackButton } from "@evolt/components/common/BackButton";
import Deposit from "@evolt/components/features/dashboard/Deposit";
import Withdraw from "@evolt/components/features/dashboard/Withdraw";

const Tabs: TabConfig[] = [
  {
    id: "assets",
    label: "My Assets",
    icon: Database,
    type: "tab" as const,
    content: <AssetContent />,
  },
  {
    id: "deposit",
    label: "Deposit",
    icon: ArrowDownLeft,
    type: "tab" as const,
    content: <Deposit />,
  },
  {
    id: "withdraw",
    label: "Withdraw",
    icon: ArrowUpRight,
    type: "tab" as const,
    content: <Withdraw />,
  },
];

function Page() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <div className="mt-10 w-full max-w-2xl m-auto space-y-5">
      <BackButton />
      <AssetTabs tabs={Tabs} defaultTabId={tab || "assets"} />
    </div>
  );
}

export default Page;
