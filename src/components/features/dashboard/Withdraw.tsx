"use client";

import React, { useEffect, useState } from "react";
import { useTokenAssociation } from "@evolt/hooks/useTokenAssociation";
import { AssociateTokenDialog } from "@evolt/components/common/AssociateTokenModal";
import { useHWBridge } from "@evolt/components/common/HWBridgeClientProvider";
import { TokenWithdraw } from "./swap/Withdraw";
import { DepositSkeleton } from "./DepositLoader";

const usdcTokenId = process.env.NEXT_PUBLIC_HEDERA_USDC_TOKEN_ID!;

export default function Withdraw() {
  const { accountId } = useHWBridge();
  const { isTokenAssociated, loading, error, handleAssociate } =
    useTokenAssociation(usdcTokenId);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isTokenAssociated === false && accountId) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isTokenAssociated, accountId]);

  return (
    <div className="space-y-3">
      {loading && <DepositSkeleton />}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {isTokenAssociated === null && !loading && (
        <p>Unable to determine token association.</p>
      )}

      {/* Render the new TokenWithdraw component */}
      {isTokenAssociated === true && <TokenWithdraw />}

      {/* Association Dialog for USDC */}
      {accountId && (
        <AssociateTokenDialog
          tokenId={usdcTokenId}
          accountId={accountId}
          open={open}
          loading={loading}
          onOpenChange={setOpen}
          onAssociate={handleAssociate}
        />
      )}
    </div>
  );
}
