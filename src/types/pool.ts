export type PoolStatus = "funding" | "funded" | "fully_funded" | "all";

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
  yieldRate: number;
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

export interface PoolsResponse {
  page: number;
  limit: number;
  total: number;
  items: PoolItem[];
}

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PoolListParams {
  page?: number;
  limit?: number;
  status?: PoolStatus;
  search?: string;
}
