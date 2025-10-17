"use client";

import React from "react";
import { BackButton } from "@evolt/components/common/BackButton";
import { InvestmentCard } from "@evolt/components/features/dashboard/InvestmentCard";
import { fetchPools, PoolItem } from "@evolt/app/api/pools";

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
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [items, setItems] = React.useState<PoolItem[]>([]);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetchPools({ page: 1, limit: 20, status: "all" });
        if (mounted) setItems(res.items || []);
      } catch (e: any) {
        if (mounted) setError(e?.message || "Failed to load pools");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mt-10 w-full max-w-2xl m-auto space-y-5">
      <div className="flex items-center justify-between">
        <BackButton />
        <h1>Investment Pools</h1>
      </div>

      {loading && (
        <div className="space-y-3">
          <div className="h-24 rounded-2xl bg-muted animate-pulse" />
          <div className="h-24 rounded-2xl bg-muted animate-pulse" />
          <div className="h-24 rounded-2xl bg-muted animate-pulse" />
        </div>
      )}

      {error && (
        <div className="text-sm text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && (
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
              <InvestmentCard
                key={it._id}
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
            );
          })}
        </div>
      )}
    </div>
  );
}