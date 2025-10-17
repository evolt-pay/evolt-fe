"use client";

import React from "react";
import { BackButton } from "@evolt/components/common/BackButton";
import { InvestmentCard } from "@evolt/components/features/dashboard/InvestmentCard";
import { PoolItem } from "@evolt/types/pool";
import { usePools, usePrefetchPoolDetails } from "./api";

function formatUSD(n?: number) {
  if (typeof n !== "number") return "—";
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function toCardStatus(item: PoolItem): "Open" | "Closed" | "Pending" {
  const pct = typeof item.fundingProgress === "number" ? item.fundingProgress : 0;
  if (pct >= 100) return "Closed";
  if ((item.daysLeft ?? 0) <= 0) return "Closed";
  return "Open";
}

export default function PoolsPage() {
  const { data, isLoading, isError, error } = usePools({ page: 1, limit: 20, status: "all" });
  const prefetch = usePrefetchPoolDetails();

  const items = data?.items ?? [];

  return (
    <div className="mt-10 w-full max-w-2xl m-auto space-y-5">
      <div className="flex items-center justify-between">
        <BackButton />
        <h1>Investment Pools</h1>
      </div>

      {isLoading && (
        <div className="space-y-3">
          <div className="h-24 rounded-2xl bg-muted animate-pulse" />
          <div className="h-24 rounded-2xl bg-muted animate-pulse" />
          <div className="h-24 rounded-2xl bg-muted animate-pulse" />
        </div>
      )}

      {isError && <div className="text-sm text-red-400">{(error as Error)?.message ?? "Failed to load pools"}</div>}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-1 space-y-5">
          {items.map((it) => {
            const pct =
              typeof it.fundingProgress === "number"
                ? Math.max(0, Math.min(100, Math.round(it.fundingProgress)))
                : it.totalTarget && it.fundedAmount
                  ? Math.max(0, Math.min(100, Math.round((it.fundedAmount / it.totalTarget) * 100)))
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
                  subtitle={it.businessName && it.corporateName ? it.businessName : undefined}
                  logo={it.corporateLogo ?? undefined}
                  apy={`${((it.apy ?? 0) * 100).toFixed(1)}% APY`}
                  minAmount={`${formatUSD(it.minInvestment)} USDT`}
                  maxAmount={`${formatUSD(it.maxInvestment)} USDT`}
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
  );
}