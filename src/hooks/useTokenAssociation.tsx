import { useCallback, useEffect, useState } from "react";
import { useHWBridge } from "@evolt/components/common/HWBridgeClientProvider";

interface UseTokenAssociationResult {
  isTokenAssociated: boolean | null;
  loading: boolean;
  error: string | null;
  handleAssociate: () => Promise<void>;
}

/**
 * Custom hook to check if a Hedera account is associated with a given token,
 * and provide a helper to perform the association.
 */
export function useTokenAssociation(
  tokenId?: string
): UseTokenAssociationResult {
  const { sdk, accountId } = useHWBridge();

  const [isTokenAssociated, setIsTokenAssociated] = useState<boolean | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch account info and determine if token is associated
   */
  const checkAssociation = useCallback(async () => {
    if (!sdk || !accountId || !tokenId) return;

    setLoading(true);
    setError(null);

    try {
      const accountInfo = await sdk.requestAccount(accountId);
      const tokens = accountInfo?.balance?.tokens ?? [];

      const associated = tokens.some(
        (t: { token_id: string }) => t.token_id === tokenId
      );

      setIsTokenAssociated(associated);
    } catch (err: any) {
      console.error("Error checking token association:", err);
      setError(err.message || "Failed to check token association");
      setIsTokenAssociated(null);
    } finally {
      setLoading(false);
    }
  }, [sdk, accountId, tokenId]);

  /**
   * Associate the token with the account
   */
  const handleAssociate = useCallback(async () => {
    if (!sdk || !accountId || !tokenId) {
      console.warn("SDK, AccountId, or TokenId missing");
      return;
    }

    try {
      setLoading(true);
      const done = await sdk.associateTokenToAccount(accountId, tokenId);

      // Recheck association after operation
      await checkAssociation();
    } catch (err: any) {
      console.error("Error associating token:", err);
      setError(err.message || "Failed to associate token");
    } finally {
      setLoading(false);
    }
  }, [sdk, accountId, tokenId, checkAssociation]);

  /**
   * Automatically check on mount or when dependencies change
   */
  useEffect(() => {
    checkAssociation();
  }, [checkAssociation]);

  return { isTokenAssociated, loading, error, handleAssociate };
}
