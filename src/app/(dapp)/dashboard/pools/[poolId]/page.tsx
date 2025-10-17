"use client";

import React from "react";
import { useParams } from "next/navigation";
import { BackButton } from "@evolt/components/common/BackButton";
import { Button } from "@evolt/components/ui/button";
import { InvoiceCard } from "@evolt/components/features/dashboard/InvoiceDetailCard";
import { InvestmentDrawer } from "@evolt/components/features/dashboard/InvestmentDrawer";
import { usePoolDetails } from "../api";

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
  const { data, isLoading, isError, error } = usePoolDetails(poolId);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <div className="mt-10 w-full max-w-2xl m-auto space-y-5">
      <div>
        <BackButton />
      </div>

      {isLoading && (
        <div className="space-y-3">
          <div className="h-40 rounded-2xl bg-muted animate-pulse" />
          <div className="h-12 rounded-2xl bg-muted animate-pulse" />
        </div>
      )}

      {isError && <div className="text-sm text-red-400">{(error as Error)?.message ?? "Failed to load pool"}</div>}

      {!isLoading && !isError && data && (
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
            verifierTitle="Finance Manager"
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

          <InvestmentDrawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            // @ts-expect-error: add these props to InvestmentDrawer if desired
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