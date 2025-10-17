import apiClient from "@evolt/lib/apiClient";

export type PoolStatus = "funding" | "funded" | "fully_funded" | "all";

// export interface PoolItem {
//     _id: string;
//     businessName?: string;
//     corporateName?: string;
//     corporateLogo?: string;
//     apy?: number;
//     minInvestment?: number;
//     maxInvestment?: number;
//     totalTarget?: number;
//     fundedAmount?: number;
//     fundingProgress?: number;
//     daysLeft?: number;
//     expiryDate?: string;
//     blobUrl?: string;

// }



export type PoolItem = {
    _id: string;
    tokenId: string | null;
    escrowContractId: string | null;

    invoiceNumber: string;
    businessName: string;
    businessDescription: string;
    corporateName: string;
    corporateLogo?: string | null;
    corporateDescription: string;
    daysLeft?: number;
    fundedAmount: number;
    fundingProgress?: number;
    totalInvestors: number;
    stakerCountOnChain: number;
    status?: "funding" | "funded" | "fully_funded";

    apy: number;
    durationInDays: number;
    minInvestment: number;
    maxInvestment: number;
    totalTarget: number;
    expiryDate?: string | null;

    verifier?: string | null;
    verifiedAt?: string | null;
    hcsTxId?: string | null;
    blobUrl?: string | null;
};

export async function fetchPoolDetails(poolId: string): Promise<PoolItem> {
    const res = await apiClient.get(`/pool/${poolId}`);
    if (!res?.data?.success) {
        throw new Error(res?.data?.error || "Failed to fetch pool details");
    }
    return res.data.data as PoolItem;
}

export interface PoolsResponse {
    page: number;
    limit: number;
    total: number;
    items: PoolItem[];
}

export async function fetchPools(params?: {
    page?: number;
    limit?: number;
    status?: PoolStatus;
    search?: string;
}): Promise<PoolsResponse> {
    const { page = 1, limit = 20, status = "all", search } = params || {};
    const { data } = await apiClient.get<{
        success: boolean;
        message: string;
        data: PoolsResponse;
    }>("/pool/", {
        params: { page, limit, status, ...(search ? { search } : {}) },
    });

    return data.data;
}