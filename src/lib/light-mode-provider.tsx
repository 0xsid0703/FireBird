"use client";

import useLightMode from "@/hooks/useLightMode";
import { ReactNode } from "react";
import { cn } from "./classnames";

export default function DarkModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isLightMode } = useLightMode();

  return (
    <div
      id="main-content"
      className={cn({ dark: !isLightMode }, "w-screen h-screen")}
    >
      {children}
    </div>
  );
}
