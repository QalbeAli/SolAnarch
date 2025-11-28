import type { Metadata } from "next";
import { Luckiest_Guy, } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "./context/Providers/WallectConnect";
const luckiestGuy = Luckiest_Guy({
  weight: "400", // Specify the required font weight
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SolAnarch - $SOLA",
  description: "SolAnarch is a community-driven token on the Solana blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <WalletContextProvider>
        <body className={`${luckiestGuy.variable} antialiased h-full overflow-hidden`}>
          {children}
        </body>
      </WalletContextProvider>
    </html>
  );
}
