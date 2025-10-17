"use client";

import React from "react";
import { useParams } from "next/navigation";
import { BackButton } from "@evolt/components/common/BackButton";
import { Button } from "@evolt/components/ui/button";
import { InvoiceCard } from "@evolt/components/features/dashboard/InvoiceDetailCard";
import { InvestmentDrawer } from "@evolt/components/features/dashboard/InvestmentDrawer";
import { fetchPoolDetails, PoolItem } from "@evolt/app/api/pools";

function formatDateTime(iso?: string | null) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function hashscanTxUrl(hcsTxId?: string | null, network = process.env.NEXT_PUBLIC_HASHSCAN_NETWORK ?? "testnet") {
  return hcsTxId ? `https://hashscan.io/${network}/transaction/${encodeURIComponent(hcsTxId)}` : undefined;
}

export default function Page() {
  const params = useParams<{ poolId: string }>();
  const poolId = params?.poolId;

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<PoolItem | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      if (!poolId) return;
      try {
        setLoading(true);
        const d = await fetchPoolDetails(poolId);
        if (mounted) setData(d);
      } catch (e: any) {
        if (mounted) setError(e?.message || "Failed to load pool");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [poolId]);

  return (
    <div className="mt-10 w-full max-w-2xl m-auto space-y-5">
      <div>
        <BackButton />
      </div>

      {loading && (
        <div className="space-y-3">
          <div className="h-40 rounded-2xl bg-muted animate-pulse" />
          <div className="h-12 rounded-2xl bg-muted animate-pulse" />
        </div>
      )}

      {!loading && error && <div className="text-sm text-red-400">{error}</div>}

      {!loading && !error && data && (
        <>
          <InvoiceCard
            invoiceNumber={`#${data.invoiceNumber}`}
            fromCompany={data.businessName}
            toCompany={data.corporateName}
            logoUrl={data.corporateLogo ?? undefined}
            smeVendorDescription={data.businessDescription || "—"}
            corporatePayerDescription={data.corporateDescription || "—"}
            numberOfStakers={data.stakerCountOnChain ?? 0}
            expectedAPY={(data.apy ?? 0) * 100}
            amountFunded={data.fundedAmount ?? 0}
            currency="USDT"
            duration={data.durationInDays ?? 0}
            durationUnit="days"
            verifiedBy={data.verifier ?? "—"}
            verifierTitle="Finance Manager, TotalEnergies"
            verificationDate={formatDateTime(data.verifiedAt)}
            blockchainExplorerUrl={hashscanTxUrl(data.hcsTxId)!}

          />

          <Button
            onClick={() => setDrawerOpen(true)}
            size="lg"
            className="shadow-[1px_6px_14px_0_rgba(85,92,228,0.21),3px_24px_25px_0_rgba(85,92,228,0.18)] w-full rounded-full transition-all duration-200 hover:scale-[1.02]"
          >
            Join Capital Pool
          </Button>

          {/* If your InvestmentDrawer accepts extra props, wire them in here */}
          <InvestmentDrawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            // @ts-expect-error add these props to InvestmentDrawer if you want to enforce limits there
            tokenId={data.tokenId ?? undefined}
            minPurchase={data.minInvestment ?? 0}
            maxPurchase={data.maxInvestment ?? 0}
            totalTarget={data.totalTarget ?? 0}
          />
        </>
      )}
    </div>
  );
}