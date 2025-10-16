import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useHWBridge } from "@evolt/components/common/HWBridgeClientProvider";
import { useCallback, useMemo } from "react";

const tokenId = process.env.NEXT_PUBLIC_HEDERA_VUSD_TOKEN_ID!;

interface TokenBalanceResult {
  balance: number | null;
  isLoading: boolean;
  isError: boolean;
  refetchBalance: () => void;
}

/**
 * Fetch the user's VUSD token balance via Hedera SDK.
 * Automatically integrates with React Query for caching and refetching.
 */
export function useGetVUSDBalance(): TokenBalanceResult {
  const { sdk, accountId } = useHWBridge();
  const queryClient = useQueryClient();

  const fetchBalance = useCallback(async () => {
    if (!sdk || !accountId) throw new Error("SDK or accountId not available");

    const accountInfo = await sdk.requestAccount(accountId);
    const token = accountInfo?.balance?.tokens?.find(
      (t: { token_id: string }) => t.token_id === tokenId
    );

    // Return the token balance or 0 if not found
    return token ? Number(token.balance) : 0;
  }, [sdk, accountId]);

  const {
    data: balance,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["vusdBalance", accountId],
    queryFn: fetchBalance,
    enabled: !!sdk && !!accountId,
    staleTime: 30_000, // 30 seconds — adjust as needed
    refetchOnWindowFocus: false,
  });

  const refetchBalance = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["vusdBalance", accountId] });
  }, [queryClient, accountId]);

  return useMemo(
    () => ({
      balance: balance ?? null,
      isLoading,
      isError,
      refetchBalance,
    }),
    [balance, isLoading, isError, refetchBalance]
  );
}
