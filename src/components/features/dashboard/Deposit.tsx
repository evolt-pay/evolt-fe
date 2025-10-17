"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@evolt/components/ui/button";
import { useTokenAssociation } from "@evolt/hooks/useTokenAssociation";
import { AssociateTokenDialog } from "@evolt/components/common/AssociateTokenModal";
import { useHWBridge } from "@evolt/components/common/HWBridgeClientProvider";

const tokenId = process.env.NEXT_PUBLIC_HEDERA_VUSD_TOKEN_ID!;

export default function Deposit() {
  const { accountId } = useHWBridge();
  const { isTokenAssociated, loading, error } = useTokenAssociation(tokenId);
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
      <div className="text-lg font-medium">Deposit</div>

      {loading && <p>Checking token association...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {isTokenAssociated === null && !loading && (
        <p>Unable to determine token association.</p>
      )}

      {isTokenAssociated === true && (
        <p className="text-green-600">Token already associated ✅</p>
      )}

      {isTokenAssociated === false && (
        <Button onClick={() => setOpen(true)}>Associate Token</Button>
      )}

      {accountId && (
        <AssociateTokenDialog
          tokenId={tokenId}
          accountId={accountId}
          open={open}
          loading={loading}
          onOpenChange={setOpen}
        />
      )}
    </div>
  );
}
