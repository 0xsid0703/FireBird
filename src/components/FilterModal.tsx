"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, isValid } from "date-fns";

type FilterProps = {
  sell_at: [string, string];
  token_amount: [string, string];
  sol_amount: [string, string];
  token_address: [string, string];
  price: [string, string];
};

interface FilterModalProps {
  onClose: () => void;
  onSubmit: (values: FilterProps) => void;
  filters: FilterProps;
}

const FilterModal = ({ onClose, onSubmit, filters }: FilterModalProps) => {
  const [sell_at, setSellAt] = useState<[string, string]>(filters["sell_at"]);
  const [token_amount, setTokenAmount] = useState<[string, string]>(
    filters["token_amount"]
  );
  const [sol_amount, setSolAmount] = useState<[string, string]>(
    filters["sol_amount"]
  );
  const [token_address, setTokenAddress] = useState<[string, string]>(
    filters["token_address"]
  );
  const [price, setPrice] = useState<[string, string]>(filters["price"]);

  const handleSellAt = (index: number, value: string) => {
    setSellAt((prevState) => {
      const updatedSellAt = [...prevState];
      updatedSellAt[index] = value;
      return updatedSellAt as [string, string];
    });
  };

  const handleTokenAmount = (index: number, value: string) => {
    setTokenAmount((prevState) => {
      const updatedTokenAmount = [...prevState];
      updatedTokenAmount[index] = value;
      return updatedTokenAmount as [string, string];
    });
  };

  const handleSolAmount = (index: number, value: string) => {
    setSolAmount((prevState) => {
      const updatedSolAmount = [...prevState];
      updatedSolAmount[index] = value;
      return updatedSolAmount as [string, string];
    });
  };

  const handleTokenAddress = (index: number, value: string) => {
    setTokenAddress((prevState) => {
      const updatedTokenAddress = [...prevState];
      updatedTokenAddress[index] = value;
      return updatedTokenAddress as [string, string];
    });
  };

  const handlePrice = (index: number, value: string) => {
    setPrice((prevState) => {
      const updatedPrice = [...prevState];
      updatedPrice[index] = value;
      return updatedPrice as [string, string];
    });
  };

  const handleSubmit = () => {
    const filter = {
      sell_at: sell_at,
      token_amount: token_amount,
      sol_amount: sol_amount,
      token_address: token_address,
      price: price,
    };
    onSubmit(filter);
    console.log("Clicked: submit");
  };

  const handleReset = () => {
    setSellAt(["", ""]);
    setTokenAmount(["", ""]);
    setSolAmount(["", ""]);
    setTokenAddress(["", ""]);
    setPrice(["", ""]);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-background rounded-lg p-6 w-1/3 shadow-lg border border-border">
        <h2 className="text-lg font-semibold mb-4 select-none">Filter Modal</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="select-none">Sold at</div>
            <div className="flex flex-row justify-between w-full gap-5">
              <DatePicker
                className="w-full bg-oddColor rounded-md py-2 px-3"
                dateFormat="dd-MM-yyyy"
                placeholderText={new Date()
                  .toLocaleDateString("en-GB")
                  .replaceAll("/", "-")}
                selected={
                  sell_at[0] &&
                  isValid(parse(sell_at[0], "dd-MM-yyyy", new Date()))
                    ? parse(sell_at[0], "dd-MM-yyyy", new Date())
                    : null
                }
                calendarClassName="filter-calendar"
                onChange={(date) =>
                  handleSellAt(
                    0,
                    date
                      ? date.toLocaleDateString("en-GB").replaceAll("/", "-")
                      : ""
                  )
                }
              />
              <DatePicker
                className="w-full bg-oddColor rounded-md py-2 px-3"
                dateFormat="dd-MM-yyyy"
                placeholderText={new Date()
                  .toLocaleDateString("en-GB")
                  .replaceAll("/", "-")}
                selected={
                  sell_at[1] &&
                  isValid(parse(sell_at[1], "dd-MM-yyyy", new Date()))
                    ? parse(sell_at[1], "dd-MM-yyyy", new Date())
                    : null
                }
                calendarClassName="filter-calendar"
                onChange={(date) =>
                  handleSellAt(
                    1,
                    date
                      ? date.toLocaleDateString("en-GB").replaceAll("/", "-")
                      : ""
                  )
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="select-none">Token Amount</div>
            <div className="flex flex-row justify-between w-full gap-5">
              <input
                value={token_amount[0]}
                className="w-1/2 bg-oddColor rounded-md py-2 px-3"
                placeholder="Min"
                onChange={(e) => handleTokenAmount(0, e.target.value)}
              ></input>
              <input
                value={token_amount[1]}
                className="w-1/2 bg-oddColor rounded-md py-2 px-3"
                placeholder="Max"
                onChange={(e) => handleTokenAmount(1, e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="select-none">Sol Amount</div>
            <div className="flex flex-row justify-between w-full gap-5">
              <input
                value={sol_amount[0]}
                className="w-1/2 bg-oddColor rounded-md py-2 px-3"
                placeholder="Min"
                onChange={(e) => handleSolAmount(0, e.target.value)}
              ></input>
              <input
                value={sol_amount[1]}
                className="w-1/2 bg-oddColor rounded-md py-2 px-3"
                placeholder="Max"
                onChange={(e) => handleSolAmount(1, e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="select-none">Token Address</div>
            <div className="flex flex-row justify-between w-full gap-5">
              <input
                value={token_address[0]}
                className="w-1/2 bg-oddColor rounded-md py-2 px-3"
                placeholder="Min"
                onChange={(e) => handleTokenAddress(0, e.target.value)}
              ></input>
              <input
                value={token_address[1]}
                className="w-1/2 bg-oddColor rounded-md py-2 px-3"
                placeholder="Max"
                onChange={(e) => handleTokenAddress(1, e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="select-none">Price</div>
            <div className="flex flex-row justify-between w-full gap-5">
              <input
                value={price[0]}
                className="w-1/2 bg-oddColor rounded-md py-2 px-3"
                placeholder="Min"
                onChange={(e) => handlePrice(0, e.target.value)}
              ></input>
              <input
                value={price[1]}
                className="w-1/2 bg-oddColor rounded-md py-2 px-3"
                placeholder="Max"
                onChange={(e) => handlePrice(1, e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-700 text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Okay
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
