"use client";
import { getTreasuries } from "@/services/treasury";
import { Treasury } from "@/types/treasury";
import { truncAddress } from "@/utils/address";
import { useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaLink } from "react-icons/fa";
import { toast } from "react-toastify";

const Treasuries = () => {
  const router = useRouter();

  const { connected } = useWallet();

  // useEffect(() => {
  // if (!connected) {
  //   router.push("/");
  // }
  // }, [connected]);

  const {
    data: treasuries,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["treasuries"],
    queryFn: () => getTreasuries(),
  });
  useEffect(() => {
    console.log({ treasuries });
  }, [treasuries]);
  if (isLoading) return <div className="p-8"> Loading ... </div>;
  if (isError)
    return <div className="p-8"> Error fetching treasuries ... </div>;

  return (
    <div className="p-8 overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="text-primary">
            <th>ID</th>
            <th>Token Name</th>
            <th>Token Addres</th>
            <th>Deposit count</th>
            <th>Duration</th>
            <th>Created at</th>
            <th>Is Completed</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {treasuries?.map((v: Treasury) => {
            return (
              <tr key={v.id}>
                <th>{truncAddress(v.id)}</th>
                <td>{v.token_name}</td>
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
                <td>{v.deposit_count}</td>
                <td>{v.duration}</td>
                <td>
                  {moment
                    .utc(v.created_at)
                    .local()
                    .format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <td>{v.completed}</td>
                <td
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`/treasuries/${v.token_address}`);
                  }}
                >
                  <FaLink />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Treasuries;
