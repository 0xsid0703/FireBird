"use client";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import InputField from "@/components/ui/InputField";
import { Select } from "@/components/ui/Select";
import { POOLS } from "@/constants/pools";
import * as sendTransaction from "@/services/sendTransaction";
import { createTreasury } from "@/services/treasury";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [tokenName, setTokenName] = useState(""); //
  const [decimals, setDecimals] = useState("9");
  const [depositNumber, setDepositNumber] = useState(""); // Default to 10% of max supply
  const [depositDuration, setDepositDuration] = useState(""); // Default to 100 days
  const [selectedPool, setSelectedPool] = useState(POOLS[0].value); // Token pool select
  const [tokenAddress, setTokenAddress] = useState("");

  const [isDepositing, setIsDepositing] = useState(false);
  const { publicKey: userPublicKey } = useWallet();

  const isFormValid = useMemo(() => {
    if (!tokenName || tokenName === "") return false;
    if (!decimals || decimals === "" || decimals === "0") return false;
    if (!depositNumber || depositNumber === "" || depositNumber === "0")
      return false;
    if (!depositDuration || depositDuration === "" || depositDuration === "0")
      return false;
    if (!tokenAddress || tokenAddress === "") return false;
    return true;
  }, [tokenName, decimals, depositNumber, depositDuration, tokenAddress]);

  const handleCreateTreasury = async () => {
    try {
      const treasuryData = await createTreasury({
        token_name: tokenName,
        decimals: parseInt(decimals, 10),
        deposit_count: parseInt(depositNumber, 10),
        duration: parseInt(depositDuration, 10),
        token_address: tokenAddress,
        dex_pool: selectedPool,
      });

      toast.success("Created Treasury!");
      console.log("treasuryData", treasuryData);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const handleDeposit = useCallback(async () => {
    if (!isFormValid) {
      toast.error("Form is not valid");
      return;
    }

    if (!userPublicKey) return;

    setIsDepositing(true);
    try {
      const amount =
        parseInt(depositNumber, 10) * Math.pow(10, parseInt(decimals, 10));
      const tx_signature = await sendTransaction.deposit(
        userPublicKey.toString(),
        tokenAddress,
        amount
      );
      if (!tx_signature) {
        throw Error("Depost tx failed");
      }
      await handleCreateTreasury();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDepositing(false);
    }
  }, [isFormValid, handleCreateTreasury]);

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Deposit Tokens</CardTitle>
          <CardDescription>
            Enter your token details to make a deposit
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <InputField
            fullWidth
            label="Token Name"
            placeholder="Enter token name"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            name="tokenName"
            required
            disabled={isDepositing}
          />
          <InputField
            fullWidth
            label="Token Address"
            placeholder="Enter token address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            name="tokenAddress"
            required
            disabled={isDepositing}
          />
          <InputField
            fullWidth
            label="Token Decimals"
            placeholder="9"
            min={0}
            value={decimals}
            onChange={(e) => setDecimals(e.target.value)}
            type="number"
            name="decimals"
            required
            disabled={isDepositing}
          />
          <InputField
            fullWidth
            label="The Deposit Number (minimum 10%)"
            placeholder="10000"
            min={0}
            value={depositNumber}
            onChange={(e) => setDepositNumber(e.target.value)}
            type="number"
            name="depositNumber"
            required
            disabled={isDepositing}
          />
          <InputField
            fullWidth
            label="Deposit Duration (Days)"
            placeholder="100"
            min={0}
            value={depositDuration}
            onChange={(e) => setDepositDuration(e.target.value)}
            type="number"
            name="depositDuration"
            required
            disabled={isDepositing}
          />
          <Select
            fullWidth
            label="Your Token Pool"
            value={selectedPool}
            onValueChange={(v) => setSelectedPool(v)}
            options={POOLS}
            name="tokenPool"
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => handleDeposit()}
            variant="default"
            disabled={!userPublicKey}
            loading={isDepositing}
            fullWidth
          >
            Deposit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;
