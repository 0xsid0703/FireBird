"use client";
import React, { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Token } from "@/types/Token";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";
import { FaBoltLightning } from "react-icons/fa6";
import { BiFilter, BiSearch } from "react-icons/bi";
import { truncAddress } from "@/utils/address";
import TokenModal from "@/components/modal/TokenModal";
import { parse, isValid } from "date-fns";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSellsPublic } from "@/services/treasury";
import { Sell } from "@/types/sell";
import moment from "moment";
import { toast } from "react-toastify";
type TokenFilterProps = {
  sol_amount: [string, string];
  token_amount: [string, string];
  token_burnt: [string, string];
  percentage: [string, string];
};
const TokenPage = () => {
  const router = useRouter();
  const {
    data: sells,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sells-public"],
    queryFn: () => getSellsPublic(),
  });

  const defaultFilters: TokenFilterProps = {
    sol_amount: ["", ""],
    token_amount: ["", ""],
    token_burnt: ["", ""],
    percentage: ["", ""],
  };
  const [defaultData, setDefaultData] = useState<Sell[]>(sells);
  const [sortedData, setSortedData] = useState<Sell[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<TokenFilterProps>(defaultFilters);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [filterNumber, setFilterNumber] = useState(0);
  const [searchFilter, setSearchFilter] = useState("");
  const [sortKey, setSortKey] = useState<keyof Sell>("sol_amount");
  const [sortDirection, setSortDirection] = useState<{ [key: string]: string }>(
    {}
  );
  const openModal = (): void => setModalOpen(true); // Open modal
  const closeModal = (): void => setModalOpen(false); // Close modal
  const filterData = (data: Sell[], filter: TokenFilterProps): Sell[] => {
    return data
      ? data.filter((item) => {
          return Object.keys(filter).every((key: string) => {
            const [min, max] = filter[key as keyof TokenFilterProps];
            const value = item[key as keyof Sell]; // Get value from the data item

            // Check if the filter is for dates
            if (key === "sell_at") {
              // Replace "date_field_name" with your actual date field key
              const minDate = min ? parse(min, "dd-MM-yyyy", new Date()) : null;
              const maxDate = max ? parse(max, "dd-MM-yyyy", new Date()) : null;

              // If both min and max dates are provided, filter by the date range
              if (minDate && maxDate) {
                const itemDate = new Date(value);
                if (
                  isValid(itemDate) &&
                  (itemDate < minDate || itemDate > maxDate)
                ) {
                  return false;
                }
              } else if (minDate) {
                // Only min date is provided, filter for values greater than or equal to min
                const itemDate = new Date(value);
                if (isValid(itemDate) && itemDate < minDate) {
                  return false;
                }
              } else if (maxDate) {
                // Only max date is provided, filter for values less than or equal to max
                const itemDate = new Date(value);
                if (isValid(itemDate) && itemDate > maxDate) {
                  return false;
                }
              }
            } else {
              // Handle non-date filters like number or string (your existing logic)
              if (min && max) {
                // Both min and max are provided, filter by the range
                if (
                  parseFloat(value) < parseFloat(min) ||
                  parseFloat(value) > parseFloat(max)
                ) {
                  return false;
                }
              } else if (min) {
                // Only min value is provided, filter for values greater than or equal to min
                if (parseFloat(value) < parseFloat(min)) {
                  return false;
                }
              } else if (max) {
                // Only max value is provided, filter for values less than or equal to max
                if (parseFloat(value) > parseFloat(max)) {
                  return false;
                }
              }
            }

            // If no min/max is provided, keep the item (for empty string filters)
            return true;
          });
        })
      : [];
  };
  const sortData = (data: Sell[], column: keyof Sell) => {
    const sorted = data.sort((a: Sell, b: Sell) => {
      if (a[column] < b[column])
        return sortDirection[sortKey] === "asc" ? -1 : 1;
      if (a[column] > b[column])
        return sortDirection[sortKey] === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  };
  const getNumberOfFilters = (
    filters: Record<string, [string, string]>
  ): number => {
    return Object.values(filters).filter(([min, max]) => min || max).length;
  };
  const searchfilterData = (data: Sell[], filter: string) => {
    return data
      ? data.filter((item) => {
          return Object.keys(item).some((key) => {
            const value = item[key as keyof Sell];
            return value
              .toString()
              .toLowerCase()
              .includes(filter.toString().toLowerCase());
          });
        })
      : data;
  };
  useEffect(() => {
    setTimeout(() => {
      const filteredData = filterData(defaultData, filters);
      const searchFilteredData = searchfilterData(filteredData, searchFilter);
      const sortedData = sortData(searchFilteredData, sortKey);
      const numberFilter = getNumberOfFilters(filters);
      setFilterNumber(numberFilter);
      setSortedData(sortedData);
      setLoading(false);
    }, 1500);
  }, [defaultData, filters, sortDirection, searchFilter]);
  const updateInputValues = (values: TokenFilterProps): void => {
    setFilters(values);
    setLoading(true);
    closeModal(); // Close modal after updating
  };
  const handleSort = (column: keyof Sell) => {
    const newDirection = sortDirection[column] === "asc" ? "desc" : "asc";
    setSortDirection({ [column]: newDirection });
    setSortKey(column);
    setLoading(true);
  };
  const handleClickToken = (id: string) => {
    router.push(`/tokens/${id}`);
  };
  useEffect(() => {
    setDefaultData(sells);
    setSortedData(sells);
    setLoading(isLoading);
  }, [sells, isLoading]);
  return (
    <div className="py-8 flex flex-col  gap-2">
      <div className="border border-border rounded-md h-48 mx-3 flex items-center justify-center">
        <div className="flex flex-col gap-3 justify-center">
          <a href="/" className="text-xl hover:text-blue-500 underline">
            About Firebird Protocol
          </a>
          <a href="/" className="text-xl hover:text-blue-500 underline">
            Apply to use
          </a>
        </div>
      </div>
      <div className="mx-5 flex flex-col md:flex-row items-center md:justify-between">
        <div className="text-xl font-semibold">Tokens Practicing Firebird</div>
        <div className="flex md:justify-end md:flex-row flex-col md:gap-3 gap-1 md:w-fit w-full">
          <div className="relative">
            <button
              className="flex flex-row text-base items-center hover:text-primary text-gray-500 px-3 py-1 border border-gray-500 hover:border-primary rounded-md w-full md:w-fit justify-center"
              onClick={openModal}
            >
              <BiFilter />
              Filters
            </button>
            {filterNumber != 0 && (
              <div className="absolute rounded-full bg text-sm text-center top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-badgeColor w-5 h-5 text-black">
                {filterNumber}
              </div>
            )}
          </div>
          <div className="flex flex-row gap-1 border border-gray-500 rounded-md text-gray-500 px-3 py-1 items-center w-full md:w-fit">
            <BiSearch size={16} />
            <input
              name="search"
              className="min-w-52 text-base bg-transparent outline-none"
              onChange={(e) => {
                setLoading(true);
                setSearchFilter(e.target.value);
              }}
            ></input>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto max-w-full">
        <motion.table
          className="table text-center border-0 w-full border-collapse min-w-max"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr className="text-gray-500 text-base">
              <th
                rowSpan={2}
                className="border border-border sticky left-0 z-10 bg-background"
              >
                Token
              </th>
              <th
                rowSpan={2}
                className="border border-border sticky left-0 z-10 bg-background"
              >
                Token Address
              </th>
              <th colSpan={2} className="border border-border">
                Inside Firebird Protocol
              </th>
              <th colSpan={2} className="border border-border">
                Burnt
              </th>
              <th rowSpan={2} className="border border-border">
                Transactions
              </th>
              <th
                rowSpan={2}
                className="border border-border sticky right-0 z-10 bg-background"
              >
                Sell At
              </th>
            </tr>
            <tr className="text-gray-500 text-base">
              <th
                className="border border-border cursor-pointer hover:text-primary  group select-none"
                onClick={() => handleSort("sol_amount")}
              >
                <span className="flex flex-row items-center gap-1 justify-center">
                  {sortDirection["sol_amount"] === "asc" ? (
                    <FaArrowUp
                      size={14}
                      className="group-hover:opacity-100 opacity-0"
                    />
                  ) : (
                    <FaArrowDown
                      size={14}
                      className="group-hover:opacity-100 opacity-0"
                    />
                  )}
                  SOL
                </span>
              </th>
              <th
                className="border border-border cursor-pointer hover:text-primary  group select-none"
                onClick={() => handleSort("token_amount")}
              >
                <span className="flex flex-row items-center gap-1 justify-center">
                  {sortDirection["sol_amount"] === "asc" ? (
                    <FaArrowUp
                      size={14}
                      className="group-hover:opacity-100 opacity-0"
                    />
                  ) : (
                    <FaArrowDown
                      size={14}
                      className="group-hover:opacity-100 opacity-0"
                    />
                  )}
                  Token
                </span>
              </th>
              <th
                className="border border-border cursor-pointer hover:text-primary  group select-none"
                onClick={() => handleSort("token_burnt")}
              >
                <span className="flex flex-row items-center gap-1 justify-center">
                  {sortDirection["token_burnt"] === "asc" ? (
                    <FaArrowUp
                      size={14}
                      className="group-hover:opacity-100 opacity-0"
                    />
                  ) : (
                    <FaArrowDown
                      size={14}
                      className="group-hover:opacity-100 opacity-0"
                    />
                  )}
                  Token burnt
                </span>
              </th>
              <th
                className="border border-border cursor-pointer hover:text-primary  group select-none"
                onClick={() => handleSort("percentage")}
              >
                <span className="flex flex-row items-center gap-1 justify-center">
                  {sortDirection["percentage"] === "asc" ? (
                    <FaArrowUp
                      size={14}
                      className="group-hover:opacity-100 opacity-0"
                    />
                  ) : (
                    <FaArrowDown
                      size={14}
                      className="group-hover:opacity-100 opacity-0"
                    />
                  )}
                  Percentage
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array(20)
                .fill(null)
                .map((_, index) => (
                  <tr
                    key={index}
                    className={clsx("border-b-1 border-b-border")}
                  >
                    <td className="py-4">
                      <Skeleton height={16} />
                    </td>
                    <td className="py-4">
                      <Skeleton height={16} />
                    </td>
                    <td>
                      <Skeleton height={16} />
                    </td>
                    <td>
                      <Skeleton height={16} />
                    </td>
                    <td>
                      <Skeleton height={16} />
                    </td>
                    <td>
                      <Skeleton height={16} />
                    </td>
                    <td>
                      <Skeleton height={16} />
                    </td>
                    <td>
                      <Skeleton height={16} />
                    </td>
                  </tr>
                ))
            ) : sortedData.length != 0 ? (
              sortedData?.map((v: Sell, index) => {
                return (
                  <motion.tr
                    key={v.id}
                    className={clsx(
                      index % 2 === 0 ? "bg-evenColor" : "bg-oddColor",
                      "border-b-1 border-b-border cursor-pointer"
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    // onClick={() => handleClickToken(v.id)}
                  >
                    <td
                      className={clsx(
                        "border-b-1 border-b-border sticky left-0 z-10",
                        index % 2 === 0 ? "bg-evenColor" : "bg-oddColor"
                      )}
                    >
                      {"NASDOG"}
                    </td>
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
                    <td>{Number(v.sol_amount).toLocaleString()}</td>
                    <td>{Number(v.token_amount).toLocaleString()}</td>
                    <td>{Number(0).toLocaleString()}</td>
                    <td
                      className={clsx(
                        Number(0) > 60 ? "text-highColor" : "text-lowColor"
                      )}
                    >
                      {Number(0).toLocaleString()}
                    </td>
                    <td
                      className="cursor-pointer hover:underline"
                      onClick={() => {
                        window.open(
                          `https://explorer.solana.com/tx/${v.tx_id}?cluster=devnet`
                        );
                      }}
                    >
                      {truncAddress(v.tx_id)}
                    </td>
                    <td
                      className={clsx(
                        "border-b-1 border-b-border sticky right-0 z-10 flex justify-center",
                        index % 2 === 0 ? "bg-evenColor" : "bg-oddColor"
                      )}
                    >
                      {moment(v.sell_at, "YYYY-MM-DD").format("MMMM Do, YYYY")}
                    </td>
                  </motion.tr>
                );
              })
            ) : (
              <tr className="border-b-1 border-b-border bg-evenColor">
                <td colSpan={8} className="min-h-screen">
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>
      </div>
      {isModalOpen && (
        <TokenModal
          onClose={closeModal}
          onSubmit={updateInputValues}
          filters={filters}
        />
      )}
    </div>
  );
};

export default TokenPage;
