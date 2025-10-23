"use client";

import React, { useState } from "react";
import { BackButton } from "@evolt/components/common/BackButton";
import { InvestmentCard } from "@evolt/components/features/dashboard/InvestmentCard";
import CategoryCard from "@evolt/components/features/dashboard/CategoryCard";
import { PoolItem } from "@evolt/types/pool";
import { useAssetsByType, usePrefetchPoolDetails, AssetType } from "./api";
import { Search } from "lucide-react";
import { Input } from "@evolt/components/ui/input";
import { PoolStatus } from "@evolt/types/pool";
import { formatCurrency } from "@evolt/lib/formatCurrency";

const categories = [
  {
    title: "Real Estate",
    image: "/img/real-estate.jpg",
    colorClass: "bg-[hsl(var(--real-estate))]",
  },
  {
    title: "Agriculture",
    image: "/img/agriculture.jpg",
    colorClass: "bg-[hsl(var(--agriculture))]",
  },
  {
    title: "Private Credit",
    image: "/img/private-credit.jpg",
    colorClass: "bg-[hsl(var(--private-credit))]",
  },
  {
    title: "Art & Collectibles",
    image: "/img/art-collectibles.jpg",
    colorClass: "bg-[hsl(var(--art-collectibles))]",
  },
  {
    title: "Infrastructure",
    image: "/img/infrastructure.jpg",
    colorClass: "bg-[hsl(var(--infrastructure))]",
  },
];

function getDaysLeft(expiryDate: string | null): number {
  if (!expiryDate) return 0;
  try {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - now.getTime();
    if (diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch {
    return 0;
  }
}

function toCardStatus(
  item: PoolItem,
  daysLeft: number,
  percentage: number
): "Open" | "Closed" | "Pending" {
  if (item.status === "funding") return "Open";
  if (item.status === "fully_funded" || item.status === "tokenized")
    return "Closed";
  if (item.status === "pending") return "Pending";

  if (percentage >= 100) return "Closed";
  if (daysLeft <= 0) return "Closed";
  return "Open";
}

export default function PoolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PoolStatus>("all");

  const [assetType, setAssetType] = useState<AssetType>("all");

  const { data, isLoading, isError, error } = useAssetsByType({
    type: assetType,
    page: 1,
    limit: 20,
  });
  const prefetch = usePrefetchPoolDetails();

  const items = data ?? [];

  return (
    <div className="mt-10 w-full max-w-6xl m-auto space-y-8">
      <div className="flex items-center">
        <BackButton />
      </div>

      <div className="mb-8 overflow-x-auto bg-black p-4 rounded-xl ">
        <div className="flex gap-4 justify-between">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              image={category.image}
              colorClass={category.colorClass}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search markets by name or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border h-12 text-base"
          />
        </div>
      </div>

      <div className="mt-12">
        {isLoading && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-40 rounded-2xl bg-muted animate-pulse" />
            <div className="h-40 rounded-2xl bg-muted animate-pulse" />
            <div className="h-40 rounded-2xl bg-muted animate-pulse" />
          </div>
        )}

        {isError && (
          <div className="text-sm text-red-400">
            {(error as Error)?.message ?? "Failed to load pools"}
          </div>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No investment pools found matching your criteria.</p>
          </div>
        )}

        {!isLoading && !isError && items.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => {
              const fundedAmount = it.amount ?? 0;
              const totalTarget = it.totalTarget ?? 0;
              const daysLeft = getDaysLeft(it.expiryDate);

              const pct =
                totalTarget > 0
                  ? Math.max(
                    0,
                    Math.min(
                      100,
                      Math.round((fundedAmount / totalTarget) * 100)
                    )
                  )
                  : 100;

              const status = toCardStatus(it, daysLeft, pct);
              const leftText =
                status === "Open"
                  ? `${daysLeft} Days Left`
                  : pct >= 100
                    ? "Fully Subscribed"
                    : "Closed";

              return (
                <div key={it._id} onMouseEnter={() => prefetch(it._id)}>
                  <InvestmentCard
                    id={it._id}
                    name={it.tokenName ?? "Unnamed Pool"}
                    subtitle={
                      it.assetType ? `Asset Type: ${it.assetType}` : "N/A"
                    }
                    logo={undefined}
                    apy={`${(it.yieldRate * 100).toFixed(1)}%`}
                    totalTarget={formatCurrency(it.totalTarget)}
                    fundingStatus={status}
                    fundingPercentage={pct}
                    progressLeftText={leftText}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
