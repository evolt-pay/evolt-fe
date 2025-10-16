"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Header from "@evolt/components/common/Header";
import PageLoader from "./PageLoader";
import { HashinalsWalletConnectSDK } from "@hashgraphonline/hashinal-wc";
import { LedgerId } from "@hashgraph/sdk";

const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL as string;
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

interface HWBridgeContextType {
  sdk: HashinalsWalletConnectSDK | null;
  accountId: string | null;
  publicKey: string | null;
  connect: () => Promise<{
    accountId: string | null;
    publicKey: string | null;
  }>;
  disconnect: () => Promise<void>;
}

const HWBridgeContext = createContext<HWBridgeContextType | undefined>(
  undefined
);

export function HWBridgeClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sdk, setSdk] = useState<HashinalsWalletConnectSDK | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // --- Initialize SDK on mount ---
  useEffect(() => {
    async function initSDK() {
      try {
        const metadata = {
          name: "My awesome dApp",
          description: "Created using Hashgraph React Wallets",
          icons: [logoUrl],
          url: typeof window !== "undefined" ? window.location.href : "",
        };

        const instance = HashinalsWalletConnectSDK.getInstance();
        await instance.init(projectId, metadata, LedgerId.TESTNET);
        setSdk(instance);

        // Restore from localStorage if available
        const storedAccountId = localStorage.getItem("connectedAccountId");
        const storedPublicKey = localStorage.getItem("connectedPublicKey");

        if (storedAccountId) setAccountId(storedAccountId);
        if (storedPublicKey) setPublicKey(storedPublicKey);
      } catch (err) {
        console.error("❌ Failed to initialize Hashinals SDK:", err);
      } finally {
        setLoading(false);
      }
    }

    initSDK();
  }, []);

  // --- Extract accountId from session object ---
  function extractAccountId(session: any): string | null {
    const accounts = session?.namespaces?.hedera?.accounts;
    if (!accounts?.length) return null;
    return accounts[0].split(":").pop() || null;
  }

  // --- Connect to wallet ---
  const connect = useCallback(async () => {
    if (!sdk) return { accountId: null, publicKey: null };

    try {
      const connectedAccount = await sdk.connect();

      const id = extractAccountId(connectedAccount);
      const pubKey = connectedAccount?.sessionProperties?.publicKey || null;

      if (id) {
        localStorage.setItem("connectedAccountId", id);
        setAccountId(id);
      }

      if (pubKey) {
        localStorage.setItem("connectedPublicKey", pubKey);
        setPublicKey(pubKey);
      }

      return { accountId: id, publicKey: pubKey };
    } catch (err) {
      console.error("❌ Connection failed:", err);
      return { accountId: null, publicKey: null };
    }
  }, [sdk]);

  // --- Disconnect from wallet ---
  const disconnect = useCallback(async () => {
    if (!sdk) return;
    try {
      await sdk.disconnect();
    } catch (err) {
      console.error("⚠️ SDK disconnect failed:", err);
    } finally {
      localStorage.removeItem("connectedAccountId");
      localStorage.removeItem("connectedPublicKey");
      setAccountId(null);
      setPublicKey(null);
    }
  }, [sdk]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <HWBridgeContext.Provider
      value={{
        sdk,
        accountId,
        publicKey,
        connect,
        disconnect,
      }}
    >
      <Header />
      {children}
    </HWBridgeContext.Provider>
  );
}

// --- Hook to use anywhere in your app ---
export function useHWBridge() {
  const context = useContext(HWBridgeContext);
  if (!context) {
    throw new Error("useHWBridge must be used within HWBridgeClientProvider");
  }
  return context;
}
