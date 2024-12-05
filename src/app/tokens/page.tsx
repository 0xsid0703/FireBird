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

type TokenFilterProps = {
  sol_amount: [string, string];
  token_amount: [string, string];
  token_burnt: [string, string];
  percentage: [string, string];
};
const TokenPage = () => {
  const test_tokens: Token[] = [
    {
      token_id: "dG9rZW4tMQ==", // token-1
      token: "TokenA",
      sol_amount: "3500",
      token_amount: "150000",
      token_burnt: "5000",
      percentage: "3.33",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tMg==", // token-2
      token: "TokenB",
      sol_amount: "7000",
      token_amount: "450000",
      token_burnt: "8000",
      percentage: "1.78",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tMw==", // token-3
      token: "TokenC",
      sol_amount: "5000",
      token_amount: "300000",
      token_burnt: "6000",
      percentage: "2.00",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tNA==", // token-4
      token: "TokenD",
      sol_amount: "9000",
      token_amount: "800000",
      token_burnt: "7000",
      percentage: "0.88",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tNQ==", // token-5
      token: "TokenE",
      sol_amount: "6500",
      token_amount: "600000",
      token_burnt: "9000",
      percentage: "1.50",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tNg==", // token-6
      token: "TokenF",
      sol_amount: "3000",
      token_amount: "120000",
      token_burnt: "2000",
      percentage: "1.67",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tNw==", // token-7
      token: "TokenG",
      sol_amount: "8000",
      token_amount: "950000",
      token_burnt: "10000",
      percentage: "1.05",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tOA==", // token-8
      token: "TokenH",
      sol_amount: "4500",
      token_amount: "500000",
      token_burnt: "4000",
      percentage: "0.80",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tOQ==", // token-9
      token: "TokenI",
      sol_amount: "2000",
      token_amount: "100000",
      token_burnt: "3000",
      percentage: "3.00",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tMTA=", // token-10
      token: "TokenJ",
      sol_amount: "10000",
      token_amount: "700000",
      token_burnt: "6000",
      percentage: "0.86",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tMTE=", // token-11
      token: "TokenK",
      sol_amount: "7200",
      token_amount: "870000",
      token_burnt: "5000",
      percentage: "0.57",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tMTI=", // token-12
      token: "TokenL",
      sol_amount: "4900",
      token_amount: "330000",
      token_burnt: "7000",
      percentage: "2.12",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tMTM=", // token-13
      token: "TokenM",
      sol_amount: "3600",
      token_amount: "270000",
      token_burnt: "3000",
      percentage: "1.11",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tMTQ=", // token-14
      token: "TokenN",
      sol_amount: "6700",
      token_amount: "920000",
      token_burnt: "8000",
      percentage: "0.87",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tMTU=", // token-15
      token: "TokenO",
      sol_amount: "8200",
      token_amount: "750000",
      token_burnt: "6000",
      percentage: "0.80",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tMTY=", // token-16
      token: "TokenP",
      sol_amount: "4000",
      token_amount: "200000",
      token_burnt: "2000",
      percentage: "1.00",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tMTc=", // token-17
      token: "TokenQ",
      sol_amount: "6000",
      token_amount: "650000",
      token_burnt: "7000",
      percentage: "1.08",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tMTg=", // token-18
      token: "TokenR",
      sol_amount: "7100",
      token_amount: "850000",
      token_burnt: "5000",
      percentage: "0.71",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tMTk=", // token-19
      token: "TokenS",
      sol_amount: "9100",
      token_amount: "980000",
      token_burnt: "8000",
      percentage: "0.82",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
    {
      token_id: "dG9rZW4tMjA=", // token-20
      token: "TokenT",
      sol_amount: "2400",
      token_amount: "150000",
      token_burnt: "4000",
      percentage: "2.67",
      transactions:
        "0xcd55cc4d42fe4736e59ce21a8d1c8a62fc2b7bf7d6dcc71f50636bd8e6a367a4",
    },
  ];
  const defaultFilters: TokenFilterProps = {
    sol_amount: ["", ""],
    token_amount: ["", ""],
    token_burnt: ["", ""],
    percentage: ["", ""],
  };

  const [sortedData, setSortedData] = useState<Token[]>(test_tokens);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<TokenFilterProps>(defaultFilters);
  const [buyToken, setBuyToken] = useState<number>(0.1);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [filterNumber, setFilterNumber] = useState(0);
  const [searchFilter, setSearchFilter] = useState("");
  const [sortKey, setSortKey] = useState<keyof Token>("sol_amount");
  const [sortDirection, setSortDirection] = useState<{ [key: string]: string }>(
    {}
  );
  const openModal = (): void => setModalOpen(true); // Open modal
  const closeModal = (): void => setModalOpen(false); // Close modal
  const filterData = (data: Token[], filter: TokenFilterProps): Token[] => {
    return data.filter((item) => {
      return Object.keys(filter).every((key: string) => {
        const [min, max] = filter[key as keyof TokenFilterProps];
        const value = item[key as keyof Token]; // Get value from the data item

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
    });
  };
  const sortData = (data: Token[], column: keyof Token) => {
    console.log({ data }, { column });
    const sorted = data.sort((a: Token, b: Token) => {
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
  const searchfilterData = (data: Token[], filter: string) => {
    return data.filter((item) => {
      return Object.keys(item).some((key) => {
        const value = item[key as keyof Token];
        return value
          .toString()
          .toLowerCase()
          .includes(filter.toString().toLowerCase());
      });
    });
  };
  useEffect(() => {
    setTimeout(() => {
      const filteredData = filterData(test_tokens, filters);
      const searchFilteredData = searchfilterData(filteredData, searchFilter);
      const sortedData = sortData(searchFilteredData, sortKey);
      const numberFilter = getNumberOfFilters(filters);
      setFilterNumber(numberFilter);
      setSortedData(sortedData);
      setLoading(false);
    }, 1500);
  }, [filters, sortDirection, searchFilter]);
  const updateInputValues = (values: TokenFilterProps): void => {
    setFilters(values);
    setLoading(true);
    closeModal(); // Close modal after updating
  };
  const handleSort = (column: keyof Token) => {
    const newDirection = sortDirection[column] === "asc" ? "desc" : "asc";
    setSortDirection({ [column]: newDirection });
    setSortKey(column);
    setLoading(true);
  };
  return (
    <div className="py-8">
      <div className="mx-5 flex flex-row justify-between">
        <div className="text-xl font-semibold">Tokens Practicing Firebird</div>
        <div className="flex justify-end flex-row gap-3">
          <div className="relative">
            <button
              className="flex flex-row text-base items-center hover:text-primary text-gray-500 px-3 py-1 border border-gray-500 hover:border-primary rounded-md"
              onClick={openModal}
            >
              <BiFilter />
              filters
            </button>
            {filterNumber != 0 && (
              <div className="absolute rounded-full bg text-sm text-center top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-badgeColor w-5 h-5 text-black">
                {filterNumber}
              </div>
            )}
          </div>
          <div className="flex flex-row gap-1 border border-gray-500 rounded-md text-gray-500 px-3 py-1 items-center">
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
          <div className="flex flex-row items-center border border-gray-500 rounded-md text-gray-500 w-40">
            <div className="bg-greyColor w-2/5 text-white flex flex-row gap-1 items-center justify-center h-full rounded-l-md border border-greyColor select-none">
              <FaBoltLightning fill="#f0c048" />
              BUY
            </div>
            <input
              className="w-3/5 outline-none bg-transparent text-base px-2"
              name="buy"
              value={buyToken.toString()}
              onChange={(e) => setBuyToken(Number(e.target.value))}
              type="number"
            ></input>
          </div>
        </div>
      </div>
      <motion.table
        className="table text-center border-0 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <thead>
          <tr className="text-gray-500 text-base">
            <th rowSpan={2} className="border border-border">
              Token
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
            <th rowSpan={2} className="border border-border">
              Quick buy
            </th>
          </tr>
          <tr className="text-gray-500 text-base">
            <th
              className="border border-border cursor-pointer hover:text-primary py-5 group select-none"
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
              className="border border-border cursor-pointer hover:text-primary py-5 group select-none"
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
              className="border border-border cursor-pointer hover:text-primary py-5 group select-none"
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
              className="border border-border cursor-pointer hover:text-primary py-5 group select-none"
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
                <tr key={index} className={clsx("border-b-1 border-b-border")}>
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
            sortedData?.map((v: Token, index) => {
              return (
                <motion.tr
                  key={v.token_id}
                  className={clsx(
                    index % 2 === 0 ? "bg-evenColor" : "bg-oddColor",
                    "hover:bg-hoverColor border-b-1 border-b-border"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td>{v.token}</td>
                  <td>{Number(v.sol_amount).toLocaleString()}</td>
                  <td>{Number(v.token_amount).toLocaleString()}</td>
                  <td>{Number(v.token_burnt).toLocaleString()}</td>
                  <td>{Number(v.percentage).toLocaleString()}</td>
                  <td
                    className="cursor-pointer hover:underline"
                    onClick={() => {
                      window.open(
                        `https://explorer.solana.com/tx/${v.transactions}?cluster=devnet`
                      );
                    }}
                  >
                    {truncAddress(v.transactions)}
                  </td>
                  <td className="flex justify-center items-center">
                    <button className="flex flex-row gap-1 items-center bg-greyColor py-1 px-4 rounded-md">
                      <FaBoltLightning fill="#f0c048" /> {buyToken}
                    </button>
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
