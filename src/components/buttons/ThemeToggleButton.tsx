"use client";

import { Button } from "@/components/ui/Button";
import useLightMode from "@/hooks/useLightMode";
import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeToggleButton() {
  const { isLightMode, toggleLightMode } = useLightMode();

  return (
    <Button
      onClick={() => toggleLightMode()}
      className="p-2 mr-2"
      size="icon"
      variant="ghost"
    >
      {isLightMode ? (
        <LuSun className="w-6 h-6" />
      ) : (
        <LuMoon className="w-6 h-6 text-gray-800" />
      )}
    </Button>
  );
}
