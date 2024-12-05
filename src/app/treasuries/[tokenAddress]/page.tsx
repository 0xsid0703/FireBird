"use client";
import { getSells } from "@/services/treasury";
import { Sell } from "@/types/sell";
import { truncAddress } from "@/utils/address";
import { formatCurrency } from "@/utils/currency";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

const Sells = () => {
  const params = useParams();

  const tokenAddress = params.tokenAddress as string;

  const {
    data: sells,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sells", tokenAddress],
    queryFn: () => getSells(tokenAddress),
  });

  if (isLoading) return <div className="p-8"> Loading ... </div>;
  if (isError) return <div className="p-8"> Error fetching sell records ... </div>;

  return (
    <div className="p-8">
      <table className="table ">
        <thead>
          <tr className="text-primary">
            <th>ID</th>
            <th>Sold at</th>
            <th>Token Amount</th>
            <th>Sol Amount</th>
            <th>Token Address</th>
            <th>Price (SOL)</th>
            <th>TX</th>
            <th>Buyback</th>
          </tr>
        </thead>
        <tbody>
          {sells?.map((v: Sell) => {
            return (
              <tr key={v.id}>
                <th>{v.id}</th>
                <td>{moment.utc(v.sell_at).local().format("YYYY-MM-DD HH:mm:ss")}</td>
                <td>{formatCurrency(v.token_amount, 9)}</td>
                <td>{formatCurrency(v.sol_amount, 9)}</td>
                <td
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(v.token_address)
                      .then(() => {
                        toast.success("Copied.");
                      })
                      .catch((err) => {
                        console.error("Failed to copy: ", err);
                      });
                  }}
                >
                  {truncAddress(v.token_address)}
                </td>
                <td>{parseFloat(v.price).toFixed(10)}</td>
                <td
                  className="cursor-pointer underline"
                  onClick={() => {
                    window.open(`https://explorer.solana.com/tx/${v.tx_id}?cluster=devnet`);
                  }}
                >
                  {truncAddress(v.tx_id)}
                </td>
                <td
                  className="cursor-pointer underline"
                  onClick={() => {
                    if (v.buyback_tx) window.open(`https://explorer.solana.com/tx/${v.buyback_tx}?cluster=devnet`);
                  }}
                >
                  {truncAddress(v.buyback_tx || "")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Sells;
