import { authenticateUser, refreshToken, validateToken } from "@/services/auth";
import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-wallets";
import { PublicKey } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
interface IUseWalletConnect {
  isAuthenticating: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  connected: boolean;
  publicKey: PublicKey | null;
}

export const useWalletConnect = (): IUseWalletConnect => {
  const { wallet, connect, disconnect, select, connected, publicKey, signMessage } = useWallet();
  const [isAuthenticating, setIsAuthenticating] = useState(false); // State to track authentication progress

  useEffect(() => {
    select(PhantomWalletName);
  }, [select]);

  useEffect(() => {
    const autoConnect = localStorage.getItem("autoConnect");
    if (autoConnect === "true") connectWallet();
  }, []);

  const authenticate = useCallback(async () => {
    if (!signMessage || !publicKey) {
      await disconnectWallet();
      return;
    }

    setIsAuthenticating(true); // Set to true when starting authentication

    try {
      const token = sessionStorage.getItem("authToken") || "";
      const isTokenValid = token ? await validateToken(token) : false;

      if (isTokenValid) {
        const newToken = await refreshToken(token);
        sessionStorage.setItem("authToken", newToken);
      } else {
        const encodedMessage = new TextEncoder().encode(process.env.NEXT_PUBLIC_SIGN_MESSAGE);
        const signature = await signMessage(encodedMessage);
        const resp = await authenticateUser({ walletAddress: publicKey?.toString(), signature: signature });

        sessionStorage.setItem("authToken", resp.token);
      }
      localStorage.setItem("autoConnect", "true");
      toast.success("Connected!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      await disconnectWallet();
    } finally {
      setIsAuthenticating(false);
    }
  }, [signMessage, publicKey]);

  useEffect(() => {
    if (connected && signMessage && publicKey) {
      authenticate();
    }
  }, [connected, signMessage, publicKey, authenticate]);

  const connectWallet = async () => {
    if (!wallet) {
      toast.error("Please install a Solana wallet");
      return;
    }

    try {
      await connect();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await localStorage.removeItem("autoConnect");
      await sessionStorage.removeItem("authToken");
      await disconnect();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return { isAuthenticating, connectWallet, disconnectWallet, connected, publicKey };
};
