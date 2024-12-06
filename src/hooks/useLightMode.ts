import { useEffect, useState } from "react";

const useLightMode = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Apply the light mode class to the document body
    if (isLightMode) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("lightMode", JSON.stringify(isLightMode));
    window.dispatchEvent(new Event("storage"));
  }, [isLightMode]);

  const toggleLightMode = () => {
    setIsLightMode((prev) => !prev);
  };

  return { isLightMode, toggleLightMode };
};

export default useLightMode;
