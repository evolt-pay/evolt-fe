"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@evolt/components/ui/button";
import { useTokenAssociation } from "@evolt/hooks/useTokenAssociation";
import { AssociateTokenDialog } from "@evolt/components/common/AssociateTokenModal";
import { useHWBridge } from "@evolt/components/common/HWBridgeClientProvider";
import { TokenSwap } from "./swap";
import { DepositSkeleton } from "./DepositLoader";

const tokenId = process.env.NEXT_PUBLIC_HEDERA_VUSD_TOKEN_ID!;

export default function Deposit() {
  const { accountId } = useHWBridge();
  const { isTokenAssociated, loading, error, handleAssociate } =
    useTokenAssociation(tokenId);
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

      {isTokenAssociated === true && <TokenSwap />}

      {accountId && (
        <AssociateTokenDialog
          tokenId={tokenId}
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
