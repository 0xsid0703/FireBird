import { cn } from "@/lib/classnames";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggleButton, WalletConnectButton } from "../buttons";
import clsx from "clsx";
import Image from "next/image";
import useDarkMode from "@/hooks/useDarkMode";

export function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("storage", () => {
      setIsDarkMode(window.localStorage.getItem("darkMode") === "true");
    });

    return () => window.removeEventListener("storage", () => {});
  }, []);

  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const { connected } = useWallet();

  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY <= lastScrollY.current || scrollY <= 50);
      lastScrollY.current = scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "w-full z-20 fixed top-0",
        "bg-background",
        "transition-transform duration-300",
        { "translate-y-0": isVisible },
        { "-translate-y-full": !isVisible }
      )}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center max-w-7xl mx-auto">
          <div className="flex items-center align-center">
            <span
              className="text-xl font-bold mr-2 cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            >
              {!isDarkMode ? (
                <Image
                  src={"/logo-light.png"}
                  width={64}
                  height={64}
                  className="w-16 h-16 hidden md:block"
                  alt=""
                />
              ) : (
                <Image
                  src={"/logo-dark.png"}
                  width={64}
                  height={64}
                  className="w-16 h-16 hidden md:block"
                  alt=""
                />
              )}
            </span>
            {connected && (
              <Link href="/treasuries" className="underline">
                Treasuries
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex flex-row divide-x divide-gray-500 py-3 text-lg">
              <Link
                href="/tokens"
                className={clsx(
                  "hover:text-gray-500 px-3 leading-none select-none",
                  {
                    "text-yellow-600": pathName === "/tokens",
                  }
                )}
              >
                Tokens
              </Link>
              <Link
                href="/builders"
                className={clsx(
                  "hover:text-gray-500 px-3 leading-none select-none",
                  {
                    "text-yellow-600": pathName === "/builders",
                  }
                )}
              >
                Builders
              </Link>
              <Link
                href="https://docs.zeta.markets/"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "hover:text-gray-500 px-3 leading-none select-none"
                )}
              >
                Docs
              </Link>
              <Link
                href="https://blog.zeta.markets/"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "hover:text-gray-500 px-3 leading-none select-none"
                )}
              >
                Blog
              </Link>
              <Link
                href="/team"
                className={clsx(
                  "hover:text-gray-500 px-3 leading-none select-none",
                  {
                    "text-yellow-600": pathName === "/team",
                  }
                )}
              >
                Team
              </Link>
            </div>
            <ThemeToggleButton />
            {/* {pathName !== "/" && <WalletConnectButton />} */}
          </div>
        </div>
      </div>
    </nav>
  );
}
