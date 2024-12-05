"use client";
import React from "react";
import Image from "next/image";
import { Router, useRouter } from "next/router";
type Props = {
  id: string;
  icon: string;
  name: string;
  price: string;
  symbol: string;
};

const Token = ({ id, icon, name, price, symbol }: Props) => {
  return (
    <a
      className="w-full flex flex-row items-center border border-border rounded-md gap-2 py-1 px-2"
      href={`/builders/${id}`}
    >
      <Image
        src={icon}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
        alt=""
      />
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <span className="text-base">{name}</span>
          <span className="text-gray-400 font-bold text-[14px]">{symbol}</span>
        </div>
        <div className="text-sm">{price}</div>
      </div>
    </a>
  );
};

export default Token;
