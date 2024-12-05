import React from "react";
import { TokenSummary } from "@/types/Token";
import Token from "@/components/Token";
const BuildersPage = () => {
  const tokens: TokenSummary[] = [
    {
      id: "YjY5OGI3ZjZkZGM2NzJlNzMwYzFhMGRjODU3ZDZkNmY=", // Random Base64 string for Bitcoin
      icon: "/tokens/bitcoin.png",
      name: "Bitcoin",
      price: "$40,000",
      symbol: "BTC",
    },
    {
      id: "ZjNmNzdlZTJlNzk5OGM0MzMwNzdiNzE4NzYwZmNkNzE=", // Random Base64 string for BNB
      icon: "/tokens/bnb.png",
      name: "BNB",
      price: "$350",
      symbol: "BNB",
    },
    {
      id: "YWIzOTg3YjM2NzNjMzFkMzc5MzA3Mjg1YzYzYzE0MjU=", // Random Base64 string for Dogecoin
      icon: "/tokens/doge.png",
      name: "Dogecoin",
      price: "$0.05",
      symbol: "DOGE",
    },
    {
      id: "Z2JlODU5ZDg1Y2EzM2VkZTkwMjQ1NTQ4ZDM3M2FkNjE=", // Random Base64 string for Ethereum
      icon: "/tokens/eth.png",
      name: "Ethereum",
      price: "$2,500",
      symbol: "ETH",
    },
    {
      id: "N2NkZmFhY2EzZjYzNTczNzI2ZmMyMmRkYjFiZDFkYzM=", // Random Base64 string for Flare
      icon: "/tokens/flr.png",
      name: "Flare",
      price: "$0.50",
      symbol: "FLR",
    },
    {
      id: "OTQwZjUzNzdlMjFiZGZkNzNiOGYzNzIxYTgzZTkwZGY=", // Random Base64 string for Pepe Coin
      icon: "/tokens/pepe.png",
      name: "Pepe Coin",
      price: "$0.01",
      symbol: "PEPE",
    },
    {
      id: "ZDk0NjA0ZmE3ZjY3ZTczNzU5ZGQ4ZGI0NjJmMjFhNWE=", // Random Base64 string for Shiba Inu
      icon: "/tokens/shib.png",
      name: "Shiba Inu",
      price: "$0.00001",
      symbol: "SHIB",
    },
    {
      id: "YTcwZjRhZGQ2YjFiMjAyMzAxNmQwMTUzMjUyZjYzNzg=", // Random Base64 string for Solana
      icon: "/tokens/sol.png",
      name: "Solana",
      price: "$150",
      symbol: "SOL",
    },
  ];

  const waitlist: TokenSummary[] = [
    {
      id: "YWQwYTQwNTdmZDQ2ZTdlYjAxZjA4NzQ5M2FkYzE3NzY=", // Random Base64 string for Tao
      icon: "/tokens/tao.png",
      name: "Bittensor",
      price: "$3.00",
      symbol: "TAO",
    },
    {
      id: "N2E4NzM5Y2FiYzU2N2Q4ZTExOGY0ZDgyN2MwMjUyNzA=", // Random Base64 string for XRP
      icon: "/tokens/xrp.png",
      name: "XRP",
      price: "$0.70",
      symbol: "XRP",
    },
    {
      id: "YjY5OGI3ZjZkZGM2NzJlNzMwYzFhMGRjODU3ZDZkNmY=", // Bitcoin
      icon: "/tokens/bitcoin.png",
      name: "Bitcoin",
      price: "$40,000",
      symbol: "BTC",
    },
    {
      id: "ZjNmNzdlZTJlNzk5OGM0MzMwNzdiNzE4NzYwZmNkNzE=", // BNB
      icon: "/tokens/bnb.png",
      name: "BNB",
      price: "$350",
      symbol: "BNB",
    },
    {
      id: "YWIzOTg3YjM2NzNjMzFkMzc5MzA3Mjg1YzYzYzE0MjU=", // Dogecoin
      icon: "/tokens/doge.png",
      name: "Dogecoin",
      price: "$0.05",
      symbol: "Doge",
    },
    {
      id: "Z2JlODU5ZDg1Y2EzM2VkZTkwMjQ1NTQ4ZDM3M2FkNjE=", // Ethereum
      icon: "/tokens/eth.png",
      name: "Ethereum",
      price: "$2,500",
      symbol: "ETH",
    },
    {
      id: "N2NkZmFhY2EzZjYzNTczNzI2ZmMyMmRkYjFiZDFkYzM=", // Flare
      icon: "/tokens/flr.png",
      name: "Flare",
      price: "$0.50",
      symbol: "FLR",
    },
  ];
  const firebird_friends: TokenSummary[] = [
    {
      id: "OTQwZjUzNzdlMjFiZGZkNzNiOGYzNzIxYTgzZTkwZGY=", // Pepe Coin
      icon: "/tokens/pepe.png",
      name: "Pepe Coin",
      price: "$0.01",
      symbol: "PEPE",
    },
    {
      id: "ZDk0NjA0ZmE3ZjY3ZTczNzU5ZGQ4ZGI0NjJmMjFhNWE=", // Shiba Inu
      icon: "/tokens/shib.png",
      name: "Shiba Inu",
      price: "$0.00001",
      symbol: "Shib",
    },
    {
      id: "YTcwZjRhZGQ2YjFiMjAyMzAxNmQwMTUzMjUyZjYzNzg=", // Solana
      icon: "/tokens/sol.png",
      name: "Solana",
      price: "$150",
      symbol: "SOL",
    },
    {
      id: "YWQwYTQwNTdmZDQ2ZTdlYjAxZjA4NzQ5M2FkYzE3NzY=", // Tao
      icon: "/tokens/tao.png",
      name: "Bittensor",
      price: "$3.00",
      symbol: "TAO",
    },
    {
      id: "N2E4NzM5Y2FiYzU2N2Q4ZTExOGY0ZDgyN2MwMjUyNzA=", // XRP
      icon: "/tokens/xrp.png",
      name: "XRP",
      price: "$0.70",
      symbol: "XRP",
    },
    {
      id: "ZGFhMzg0NjJmZTRkZjMxN2I5YzY3ZDEzNmJkN2U3ZTQ=", // ARB (Arbitrum)
      icon: "/tokens/arb.png",
      name: "Arbitrum",
      price: "$1.20",
      symbol: "ARB",
    },
    {
      id: "OTdkZGZkYmFkMTFlY2M0Z2ZkMTY5Yjc0YTg5MzUyZTg=", // CRO (Crypto.com Coin)
      icon: "/tokens/cro.png",
      name: "Cronos",
      price: "$0.60",
      symbol: "CRO",
    },
    {
      id: "ZjRlZGExNzRiZGQ1YWRhZjZkZmFkZGZ0ZGM2YjQzZDA=", // FIL (Filecoin)
      icon: "/tokens/fil.png",
      name: "Filecoin",
      price: "$40",
      symbol: "FIL",
    },
    {
      id: "OTQzYzY0ZDZlYWEzNmI0NDRjYjgyZmZmZGZkYzMwZDU=", // USDE (US Dollar Ethereum)
      icon: "/tokens/usde.png",
      name: "US Dollar Ethereum",
      price: "$1.00",
      symbol: "USDE",
    },
    {
      id: "YjE5NzRmMjMyZmNlN2JkZjdhZ2FlZGZmZmE3NTMwZDI=", // Render Token
      icon: "/tokens/render.png",
      name: "Render Token",
      price: "$7.50",
      symbol: "RENDER",
    },
    {
      id: "YzU1YTRmNmYwYjRlZDFhYjgwZTdkMzkzY2M2N2I3YWE=", // DAI
      icon: "/tokens/dai.png",
      name: "DAI",
      price: "$1.00",
      symbol: "DAI",
    },
    {
      id: "NzliNmU2ZmI2ZTczYWEzYjA2YjZjM2EyNjNlY2RhZjQ=", // ETC (Ethereum Classic)
      icon: "/tokens/etc.png",
      name: "Ethereum Classic",
      price: "$55",
      symbol: "ETC",
    },
    {
      id: "YTM5MmZmMzcwODJlY2Q4NzgwNjg2NjEzNTQ3YjZmMjg=", // ADA (Cardano)
      icon: "/tokens/ada.png",
      name: "Cardano",
      price: "$1.50",
      symbol: "ADA",
    },
    {
      id: "ZmFhNmI2ZjMwM2FlNjc2YjU2ZGRjOTNhZTZkZmMzNDE=", // USDC
      icon: "/tokens/usdc.png",
      name: "USD Coin",
      price: "$1.00",
      symbol: "USDC",
    },
    {
      id: "ODhlNzMwZGFmYzdlYjY2ZDFhM2U4NzFhOGY3ZjY2MjM=", // TRX (TRON)
      icon: "/tokens/trx.png",
      name: "TRON",
      price: "$0.10",
      symbol: "TRX",
    },
  ];
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-10 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="text-xl">The tokens with Firebird</div>
          <div className="grid grid-cols-4 gap-3">
            {tokens.map((token: TokenSummary, index: number) => (
              <Token {...token} key={index} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl">The tokens on the waitlist</div>
          <div className="grid grid-cols-4 gap-3">
            {waitlist.map((token: TokenSummary, index: number) => (
              <Token {...token} key={index} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl">Firebird Friends</div>
          <div className="grid grid-cols-4 gap-3">
            {firebird_friends.map((token: TokenSummary, index: number) => (
              <Token {...token} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildersPage;
