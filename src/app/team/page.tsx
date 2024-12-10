import React from "react";
import { Member } from "@/types/member";
import MemberCard from "@/components/team/member";
const TeamPage = () => {
  const members: Member[] = [
    {
      photo: "/member/jim.png",
      name: "Jim",
      title: "Co-founder & CEO",
      description: [
        "Worked at Electric Capital, investing in Web3 startups and building liquidity for various DeFi protocols",
        "Co-founded a crypto derivatives exchange",
        "Spent 9+ years on Wall Street trading rates & FX at Citigroup and a macro hedge fund",
        "Graduated from Carnegie Mellon University with dual degrees in Computer Science and Computational Finance",
      ],
      linkedin: "",
      facebook: "",
      instagram: "",
      twitter: "",
    },
    {
      photo: "/member/andrew.png",
      name: "Andrew",
      title: "Technical Advisor",
      description: [
        "Worked in HFT as an Engineer and as co-founder and CTO of “Zeta.markets”, a crypto derivatives exchange on Solana.",
        "Graduated from UNSW with a Bachelor of Commerce and Computer Science",
      ],
      linkedin: "",
      facebook: "",
      instagram: "",
      twitter: "",
    },
    {
      photo: "/member/jeevan.png",
      name: "Jeevan",
      title: "Co-founder & COO",
      description: [
        "With an economics and VC background, he managed VCs and FoFs for about $100 million and invested in 30+ projects, including “Nasdaq: Li Auto.” ",
        "Worked as a chief consultant at a Nasdaq listing Bitcoin-mining company, Bit Digital.",
        "Graduated from the University of Sydney with two master’s degrees.",
      ],
      linkedin: "",
      facebook: "",
      instagram: "",
      twitter: "",
    },
  ];
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* <div className="max-w-7xl mx-auto mt-10 lg:gap-5 md:gap-3 gap-1 lg:grid-cols-4 md:grid-cols-2 grid grid-cols-1 "> */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-col gap-3 items-center">
        <div className="text-4xl">Meet the team</div>
        <div className="lg:gap-5 gap-3 flex md:flex-row flex-col">
          {members.map((member: Member, index: number) => (
            <MemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
