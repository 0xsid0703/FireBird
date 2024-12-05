import { WalletContextProvider } from "@/contexts/WalletContextProvider";
import DarkModeProvider from "@/lib/dark-mode-provider";
import { ReactQueryProvider } from "@/lib/react-query-provider";
import "@/styles/globals.scss";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Firebird",
  description: "MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <DarkModeProvider>
            <WalletContextProvider>
              <ClientLayout>{children}</ClientLayout>
            </WalletContextProvider>
          </DarkModeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
