"use client";
import { Button } from "@/components/ui/Button";
import { useWalletConnect } from "@/hooks/useWalletConnect";
import { Dropdown } from "../ui/Dropdown";

export function WalletConnectButton() {
  const { connectWallet, disconnectWallet, connected, publicKey, isAuthenticating } = useWalletConnect();

  if (!connected) return <Button onClick={connectWallet}>Connect Wallet</Button>;

  if (isAuthenticating) return <Button loading>Connecting</Button>;

  return (
    <Dropdown
      hoverToOpen
      triggerElTitle={`${publicKey?.toBase58().slice(0, 6)}...${publicKey?.toBase58().slice(-4)}`}
      items={[
        {
          title: "Profile",
          action: () => {},
        },
        {
          title: "Disconnect",
          action: () => {
            disconnectWallet();
          },
        },
      ]}
    />
  );
}
