import React from "react";
import { Member } from "@/types/member";
import Image from "next/image";
type MemberProps = {
  photo: string;
  name: string;
  title: string;
  description: string[];
  linkedin: string;
  facebook: string;
  instagram: string;
  twitter: string;
};

const MemberCard = ({
  photo,
  name,
  title,
  description,
  linkedin,
  facebook,
  instagram,
  twitter,
}: MemberProps) => {
  return (
    <div className="w-full border border-border rounded-md relative shadow-md group cursor-pointer">
      <div className="w-full h-auto">
        <div className="bg-white opacity-5 w-full h-full absolute top-0 rounded-md"></div>
        <Image
          src={photo}
          width={300}
          height={500}
          className="w-full h-auto rounded-md"
          alt=""
        />
      </div>
      <div className="absolute py-1 px-3 bottom-0 bg-gray-400 w-full bg-opacity-70 rounded-b-md z-[2] text-black font-semibold group-hover:hidden group-hover:animate-fadeOut flex flex-col">
        <div className="text-2xl">{name}</div>
        <div className="text-xl">{title}</div>
      </div>
      <div className="absolute top-0 w-full h-full bg-white group-hover:flex hidden rounded-md bg-opacity-80 group-hover:animate-fadeIn group-hover:flex-col text-black p-3">
        <div className="text-xl">{name}</div>
        <div className="text-base">{title}</div>
        <div className="text-sm">
          <ul className="list-disc pl-5">
            {description.map((desc: string, index: number) => (
              <li className="" key={index}>
                {desc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
