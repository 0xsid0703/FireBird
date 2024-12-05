"use client";
import { getSellsPublic } from "@/services/treasury";
import { Sell } from "@/types/sell";
import { truncAddress } from "@/utils/address";
import { formatCurrency } from "@/utils/currency";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { toast } from "react-toastify";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaFilter } from "react-icons/fa";

import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { BiFilter, BiSearch } from "react-icons/bi";
import FilterModal from "@/components/FilterModal";
import { motion } from "framer-motion";
import { parse, isValid } from "date-fns";

type TestSell = {
  pool_id: string;
  token_address: string;
  token_amount: string;
  sol_amount: string;
  price: string;
  tx_id: string;
  id: string;
  sell_at: string;
  buyback_tx: string;
};

type FilterProps = {
  sell_at: [string, string];
  token_amount: [string, string];
  sol_amount: [string, string];
  token_address: [string, string];
  price: [string, string];
};

const PublicSells = () => {
  const {
    data: sells,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sells-public"],
    queryFn: () => getSellsPublic(),
  });
  const defaultFilters: FilterProps = {
    sell_at: ["", ""],
    token_amount: ["", ""],
    sol_amount: ["", ""],
    token_address: ["", ""],
    price: ["", ""],
  };
  const test_sells: TestSell[] = [
    {
      pool_id: "pool1",
      token_address: "address1",
      token_amount: "100",
      sol_amount: "50",
      price: "300",
      tx_id: "tx1",
      id: "1",
      sell_at: "2024-05-03T10:30:45",
      buyback_tx: "ring1",
    },
    {
      pool_id: "pool2",
      token_address: "address2",
      token_amount: "200",
      sol_amount: "100",
      price: "600",
      tx_id: "tx2",
      id: "2",
      sell_at: "2024-05-04T14:25:30",
      buyback_tx: "ring2",
    },
    {
      pool_id: "pool3",
      token_address: "address3",
      token_amount: "300",
      sol_amount: "150",
      price: "900",
      tx_id: "tx3",
      id: "3",
      sell_at: "2024-05-05T08:15:20",
      buyback_tx: "ring3",
    },
    {
      pool_id: "pool4",
      token_address: "address4",
      token_amount: "400",
      sol_amount: "200",
      price: "1200",
      tx_id: "tx4",
      id: "4",
      sell_at: "2024-05-06T16:40:10",
      buyback_tx: "ring4",
    },
    {
      pool_id: "pool5",
      token_address: "address5",
      token_amount: "500",
      sol_amount: "250",
      price: "1500",
      tx_id: "tx5",
      id: "5",
      sell_at: "2024-05-07T19:05:55",
      buyback_tx: "ring5",
    },
    {
      pool_id: "pool6",
      token_address: "address6",
      token_amount: "600",
      sol_amount: "300",
      price: "1800",
      tx_id: "tx6",
      id: "6",
      sell_at: "2024-05-08T12:30:45",
      buyback_tx: "ring6",
    },
    {
      pool_id: "pool7",
      token_address: "address7",
      token_amount: "700",
      sol_amount: "350",
      price: "2100",
      tx_id: "tx7",
      id: "7",
      sell_at: "2024-05-09T09:50:30",
      buyback_tx: "ring7",
    },
    {
      pool_id: "pool8",
      token_address: "address8",
      token_amount: "800",
      sol_amount: "400",
      price: "2400",
      tx_id: "tx8",
      id: "8",
      sell_at: "2024-05-10T11:15:00",
      buyback_tx: "ring8",
    },
    {
      pool_id: "pool9",
      token_address: "address9",
      token_amount: "900",
      sol_amount: "450",
      price: "2700",
      tx_id: "tx9",
      id: "9",
      sell_at: "2024-05-11T18:45:10",
      buyback_tx: "ring9",
    },
    {
      pool_id: "pool10",
      token_address: "address10",
      token_amount: "1000",
      sol_amount: "500",
      price: "3000",
      tx_id: "tx10",
      id: "10",
      sell_at: "2024-05-12T14:20:35",
      buyback_tx: "ring10",
    },
    {
      pool_id: "pool11",
      token_address: "address11",
      token_amount: "1100",
      sol_amount: "550",
      price: "3300",
      tx_id: "tx11",
      id: "11",
      sell_at: "2024-05-13T20:00:05",
      buyback_tx: "ring11",
    },
    {
      pool_id: "pool12",
      token_address: "address12",
      token_amount: "1200",
      sol_amount: "600",
      price: "3600",
      tx_id: "tx12",
      id: "12",
      sell_at: "2024-05-14T07:30:50",
      buyback_tx: "ring12",
    },
    {
      pool_id: "pool13",
      token_address: "address13",
      token_amount: "1300",
      sol_amount: "650",
      price: "3900",
      tx_id: "tx13",
      id: "13",
      sell_at: "2024-05-15T12:40:25",
      buyback_tx: "ring13",
    },
    {
      pool_id: "pool14",
      token_address: "address14",
      token_amount: "1400",
      sol_amount: "700",
      price: "4200",
      tx_id: "tx14",
      id: "14",
      sell_at: "2024-05-16T23:15:40",
      buyback_tx: "ring14",
    },
    {
      pool_id: "pool15",
      token_address: "address15",
      token_amount: "1500",
      sol_amount: "750",
      price: "4500",
      tx_id: "tx15",
      id: "15",
      sell_at: "2024-05-17T16:25:35",
      buyback_tx: "ring15",
    },
    {
      pool_id: "pool16",
      token_address: "address16",
      token_amount: "1600",
      sol_amount: "800",
      price: "4800",
      tx_id: "tx16",
      id: "16",
      sell_at: "2024-05-18T10:30:20",
      buyback_tx: "ring16",
    },
    {
      pool_id: "pool17",
      token_address: "address17",
      token_amount: "1700",
      sol_amount: "850",
      price: "5100",
      tx_id: "tx17",
      id: "17",
      sell_at: "2024-05-19T21:45:15",
      buyback_tx: "ring17",
    },
    {
      pool_id: "pool18",
      token_address: "address18",
      token_amount: "1800",
      sol_amount: "900",
      price: "5400",
      tx_id: "tx18",
      id: "18",
      sell_at: "2024-05-20T11:35:00",
      buyback_tx: "ring18",
    },
    {
      pool_id: "pool19",
      token_address: "address19",
      token_amount: "1900",
      sol_amount: "950",
      price: "5700",
      tx_id: "tx19",
      id: "19",
      sell_at: "2024-05-21T19:20:55",
      buyback_tx: "ring19",
    },
    {
      pool_id: "pool20",
      token_address: "address20",
      token_amount: "2000",
      sol_amount: "1000",
      price: "6000",
      tx_id: "tx20",
      id: "20",
      sell_at: "2024-05-22T14:10:45",
      buyback_tx: "ring20",
    },
  ];
  const [sortedData, setSortedData] = useState<TestSell[]>(test_sells);
  const [sortKey, setSortKey] = useState<keyof TestSell>("sell_at");
  const [sortDirection, setSortDirection] = useState<{ [key: string]: string }>(
    {}
  );
  const [filters, setFilters] = useState<FilterProps>(defaultFilters);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [filterNumber, setFilterNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const openModal = (): void => setModalOpen(true); // Open modal
  const closeModal = (): void => setModalOpen(false); // Close modal
  const filterData = (data: TestSell[], filter: FilterProps): TestSell[] => {
    return data.filter((item) => {
      return Object.keys(filter).every((key: string) => {
        const [min, max] = filter[key as keyof FilterProps];
        const value = item[key as keyof TestSell]; // Get value from the data item

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
  const sortData = (data: TestSell[], column: keyof TestSell) => {
    console.log({ data }, { column });
    const sorted = data.sort((a: TestSell, b: TestSell) => {
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
  const searchfilterData = (data: TestSell[], filter: string) => {
    return data.filter((item) => {
      return Object.keys(item).some((key) => {
        const value = item[key as keyof TestSell];
        return value
          .toString()
          .toLowerCase()
          .includes(filter.toString().toLowerCase());
      });
    });
  };
  useEffect(() => {
    setTimeout(() => {
      const filteredData = filterData(test_sells, filters);
      const searchFilteredData = searchfilterData(filteredData, searchFilter);
      const sortedData = sortData(searchFilteredData, sortKey);
      const numberFilter = getNumberOfFilters(filters);
      setFilterNumber(numberFilter);
      setSortedData(sortedData);
      setLoading(false);
    }, 1500);
  }, [filters, sortDirection, searchFilter]);
  const updateInputValues = (values: FilterProps): void => {
    setFilters(values);
    setLoading(true);
    closeModal(); // Close modal after updating
  };
  // if (isLoading) return <div className="p-8"> Loading ... </div>;
  // if (isError) return <div className="p-8"> Error fetching sell records ... </div>;
  const handleSort = (column: keyof TestSell) => {
    const newDirection = sortDirection[column] === "asc" ? "desc" : "asc";
    setSortDirection({ [column]: newDirection });
    setSortKey(column);
    setLoading(true);
  };
  return (
    <div className="py-8">
      <div className="flex justify-end flex-row gap-3 pr-8">
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
      </div>
      <motion.table
        className="table text-center border-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <thead>
          <tr className="text-gray-500 border-b-1 border-b-border text-base">
            <th
              className="cursor-pointer hover:text-primary py-5 group select-none"
              onClick={() => handleSort("id")}
            >
              <span className="flex flex-row items-center gap-1 justify-center">
                {sortDirection["id"] === "asc" ? (
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
                ID
              </span>
            </th>
            <th
              className="cursor-pointer hover:text-primary py-5 group select-none"
              onClick={() => handleSort("sell_at")}
            >
              <span className="flex flex-row items-center gap-1 justify-center">
                {sortDirection["sell_at"] === "asc" ? (
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
                Sold at
              </span>
            </th>
            <th
              className="cursor-pointer hover:text-primary py-5 group select-none"
              onClick={() => handleSort("token_amount")}
            >
              <span className="flex flex-row items-center gap-1 justify-center">
                {sortDirection["token_amount"] === "asc" ? (
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
                Token Amount
              </span>
            </th>
            <th
              className="cursor-pointer hover:text-primary py-5 group select-none"
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
                Sol Amount
              </span>
            </th>
            <th
              className="cursor-pointer hover:text-primary py-5 group select-none"
              onClick={() => handleSort("token_address")}
            >
              <span className="flex flex-row items-center gap-1 justify-center">
                {sortDirection["token_address"] === "asc" ? (
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
                Token Address
              </span>
            </th>
            <th
              className="cursor-pointer hover:text-primary py-5 group select-none"
              onClick={() => handleSort("price")}
            >
              <span className="flex flex-row items-center gap-1 justify-center">
                {sortDirection["price"] === "asc" ? (
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
                Price (SOL)
              </span>
            </th>
            <th className="select-none">TX</th>
            <th className="select-none">Buyback</th>
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
                  <td>
                    <Skeleton height={16} />
                  </td>
                </tr>
              ))
          ) : sortedData.length != 0 ? (
            sortedData?.map((v: TestSell, index) => {
              return (
                <motion.tr
                  key={v.id}
                  className={clsx(
                    index % 2 === 0 ? "bg-evenColor" : "bg-oddColor",
                    "hover:bg-hoverColor border-b-1 border-b-border"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <th className="text-gray-500 py-4 select-none relative">
                    {v.id}
                  </th>
                  <td>
                    {moment
                      .utc(v.sell_at)
                      .local()
                      .format("YYYY-MM-DD HH:mm:ss")}
                  </td>
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
                      window.open(
                        `https://explorer.solana.com/tx/${v.tx_id}?cluster=devnet`
                      );
                    }}
                  >
                    {truncAddress(v.tx_id)}
                  </td>
                  <td
                    className="cursor-pointer underline"
                    onClick={() => {
                      if (v.buyback_tx)
                        window.open(
                          `https://explorer.solana.com/tx/${v.buyback_tx}?cluster=devnet`
                        );
                    }}
                  >
                    {truncAddress(v.buyback_tx || "")}
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
        <FilterModal
          onClose={closeModal}
          onSubmit={updateInputValues}
          filters={filters}
        />
      )}
    </div>
  );
};

export default PublicSells;
