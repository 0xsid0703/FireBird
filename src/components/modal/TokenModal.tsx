"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, isValid } from "date-fns";

type FilterProps = {
  sol_amount: [string, string];
  token_amount: [string, string];
  token_burnt: [string, string];
  percentage: [string, string];
};

interface TokenModalProps {
  onClose: () => void;
  onSubmit: (values: FilterProps) => void;
  filters: FilterProps;
}

const TokenModal = ({ onClose, onSubmit, filters }: TokenModalProps) => {
  const [sol_amount, setSolAmount] = useState<[string, string]>(
    filters["sol_amount"]
  );
  const [token_amount, setTokenAmount] = useState<[string, string]>(
    filters["token_amount"]
  );
  const [token_burnt, setTokenBurnt] = useState<[string, string]>(
    filters["token_burnt"]
  );
  const [percentage, setPercentage] = useState<[string, string]>(
    filters["percentage"]
  );

  const handleSolAmount = (index: number, value: string) => {
    setSolAmount((prevState) => {
      const updatedSolAmount = [...prevState];
      updatedSolAmount[index] = value;
      return updatedSolAmount as [string, string];
    });
  };

  const handleTokenAmount = (index: number, value: string) => {
    setTokenAmount((prevState) => {
      const updatedTokenAmount = [...prevState];
      updatedTokenAmount[index] = value;
      return updatedTokenAmount as [string, string];
    });
  };

  const handleTokenBurnt = (index: number, value: string) => {
    setTokenBurnt((prevState) => {
      const updatedTokenBurnt = [...prevState];
      updatedTokenBurnt[index] = value;
      return updatedTokenBurnt as [string, string];
    });
  };

  const handlePercentage = (index: number, value: string) => {
    setPercentage((prevState) => {
      const updatedPercentage = [...prevState];
      updatedPercentage[index] = value;
      return updatedPercentage as [string, string];
    });
  };

  const handleSubmit = () => {
    const filter = {
      sol_amount: sol_amount,
      token_amount: token_amount,
      token_burnt: token_burnt,
      percentage: percentage,
    };
    onSubmit(filter);
  };

  const handleReset = () => {
    setSolAmount(["", ""]);
    setTokenAmount(["", ""]);
    setTokenBurnt(["", ""]);
    setPercentage(["", ""]);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-background rounded-lg p-6 md:w-1/3 w-full mx-5 shadow-lg border border-border">
        <h2 className="text-lg font-semibold mb-4 select-none">
          Token Filter Modal
        </h2>
        <div className="flex flex-col gap-4">
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
            <div className="select-none">Token Burnt</div>
            <div className="flex flex-row justify-between w-full gap-5">
              <input
                value={token_burnt[0]}
                className="w-1/2 bg-oddColor rounded-md py-2 px-3"
                placeholder="Min"
                onChange={(e) => handleTokenBurnt(0, e.target.value)}
              ></input>
              <input
                value={token_burnt[1]}
                className="w-1/2 bg-oddColor rounded-md py-2 px-3"
                placeholder="Max"
                onChange={(e) => handleTokenBurnt(1, e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="select-none">Percentage</div>
            <div className="flex flex-row justify-between w-full gap-5">
              <input
                value={percentage[0]}
                className="w-1/2 bg-oddColor rounded-md py-2 px-3"
                placeholder="Min"
                onChange={(e) => handlePercentage(0, e.target.value)}
              ></input>
              <input
                value={percentage[1]}
                className="w-1/2 bg-oddColor rounded-md py-2 px-3"
                placeholder="Max"
                onChange={(e) => handlePercentage(1, e.target.value)}
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

export default TokenModal;
