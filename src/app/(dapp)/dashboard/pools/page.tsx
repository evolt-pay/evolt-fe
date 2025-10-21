"use client";

import React, { useState } from "react";
import { BackButton } from "@evolt/components/common/BackButton";
import { InvestmentCard } from "@evolt/components/features/dashboard/InvestmentCard";
import CategoryCard from "@evolt/components/features/dashboard/CategoryCard";
import { PoolItem } from "@evolt/types/pool";
import { useAssetsByType, usePrefetchPoolDetails, AssetType } from "./api"; // Changed import
import { Search, TrendingUp, DollarSign, Clock } from "lucide-react";
import { Button } from "@evolt/components/ui/button";
import { Input } from "@evolt/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@evolt/components/ui/select";
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

function toCardStatus(item: PoolItem): "Open" | "Closed" | "Pending" {
  const pct =
    typeof item.fundingProgress === "number" ? item.fundingProgress : 0;
  if (pct >= 100) return "Closed";
  if ((item.daysLeft ?? 0) <= 0) return "Closed";
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

  const items = data?.items ?? [];

  return (
    <div className="mt-10 w-full max-w-6xl m-auto space-y-8">
      <div className="flex items-center">
        <BackButton />
      </div>

      {/* Categories Section */}
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

      {/* Search and Filters Section */}
      <div className="space-y-4">
        {/* Search Bar */}
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

        {/* Filter Buttons & Selects */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
          >
            Newest
          </Button>
          <Button variant="ghost" className="hover:bg-accent rounded-full">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending
          </Button>
          <Button variant="ghost" className="hover:bg-accent rounded-full">
            <DollarSign className="h-4 w-4 mr-2" />
            Volume
          </Button>
          <Button variant="ghost" className="hover:bg-accent rounded-full">
            <Clock className="h-4 w-4 mr-2" />
            Ending
          </Button>

          <div className="flex gap-3 ml-auto">
            <Select
              defaultValue={statusFilter}
              onValueChange={(value) => setStatusFilter(value as PoolStatus)}
            >
              <SelectTrigger className="w-32 bg-card border-border rounded-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="funding">Open</SelectItem>
                <SelectItem value="fully_funded">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-card border-border rounded-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tokens</SelectItem>
                <SelectItem value="usdc">USDC</SelectItem>
                <SelectItem value="vusd">VUSD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Markets Grid */}
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
              const pct =
                typeof it.fundingProgress === "number"
                  ? Math.max(0, Math.min(100, Math.round(it.fundingProgress)))
                  : it.totalTarget && it.fundedAmount
                  ? Math.max(
                      0,
                      Math.min(
                        100,
                        Math.round((it.fundedAmount / it.totalTarget) * 100)
                      )
                    )
                  : 0;

              const status = toCardStatus(it);
              const leftText =
                status === "Open"
                  ? `${Math.max(0, it.daysLeft ?? 0)} Days Left`
                  : pct >= 100
                  ? "Fully Subscribed"
                  : "Closed";

              return (
                <div key={it._id} onMouseEnter={() => prefetch(it._id)}>
                  <InvestmentCard
                    id={it._id}
                    name={it.corporateName ?? it.businessName ?? "Unnamed Pool"}
                    subtitle={
                      it.businessName && it.corporateName
                        ? it.businessName
                        : undefined
                    }
                    logo={it.corporateLogo ?? undefined}
                    apy={`${it.yieldRate}%`}
                    totalTarget={`${formatCurrency(it.totalTarget)}`}
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
