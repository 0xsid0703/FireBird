// app/ClientLayout.tsx
"use client";

import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/classnames";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bodyClass = cn(
    "min-h-screen",
    "flex flex-col justify-between",
    "bg-background",
    "text-primary text-sm font-inter"
  );

  return (
    <div>
      <section className={bodyClass}>
        <Navbar />
        <div className={cn("flex-grow flex flex-col pt-16")}>{children}</div>
        <ToastContainer
          autoClose={1000}
          transition={Flip}
          theme={"colored"}
          position="bottom-right"
        />
      </section>
    </div>
  );
}
