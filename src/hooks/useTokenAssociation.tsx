import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useHWBridge } from "@evolt/components/common/HWBridgeClientProvider";

interface UseTokenAssociationResult {
  isTokenAssociated: boolean | null;
  loading: boolean;
  error: string | null;
  handleAssociate: () => Promise<void>;
}

/**
 * Hook: Check if a Hedera account is associated with a token,
 * and provide a mutation to associate it if not.
 */
export function useTokenAssociation(
  tokenId?: string
): UseTokenAssociationResult {
  const { sdk, accountId } = useHWBridge();
  const queryClient = useQueryClient();

  // --- Query: Check if token is associated ---
  const {
    data: isTokenAssociated,
    isLoading,
    error,
  } = useQuery<boolean | null>({
    queryKey: ["token-association", accountId, tokenId],
    queryFn: async () => {
      if (!sdk || !accountId || !tokenId) return null;

      const accountInfo = await sdk.requestAccount(accountId);
      const tokens = accountInfo?.balance?.tokens ?? [];

      return tokens.some((t: { token_id: string }) => t.token_id === tokenId);
    },
    enabled: !!sdk && !!accountId && !!tokenId, // only run when all are available
    staleTime: Infinity, // don’t re-fetch unless manually invalidated
  });

  // --- Mutation: Associate token ---
  const mutation = useMutation({
    mutationFn: async () => {
      if (!sdk || !accountId || !tokenId)
        throw new Error("SDK, AccountId, or TokenId missing");

      await sdk.associateTokenToAccount(accountId, tokenId);
    },
    onSuccess: async () => {
      // Re-fetch the query to update association state
      await queryClient.invalidateQueries({
        queryKey: ["token-association", accountId, tokenId],
      });
    },
    onError: (err: any) => {
      console.error("Error associating token:", err);
    },
  });

  // --- Public handler for triggering the mutation ---
  const handleAssociate = async () => {
    await mutation.mutateAsync();
  };

  return {
    isTokenAssociated: isTokenAssociated ?? null,
    loading: isLoading || mutation.isPending,
    error: (error as Error)?.message ?? null,
    handleAssociate,
  };
}
