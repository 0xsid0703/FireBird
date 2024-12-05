import { cn } from "@/lib/classnames";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggleButton, WalletConnectButton } from "../buttons";

export function Navbar() {
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
              Firebird
            </span>
            {connected && (
              <Link href="/treasuries" className="underline">
                Treasuries
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggleButton />
            {pathName !== "/" && <WalletConnectButton />}
          </div>
        </div>
      </div>
    </nav>
  );
}
