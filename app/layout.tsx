import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"

const nunito = Nunito({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "AcaData",
  description: "Transform learning with data driven insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={nunito.className}>
        <main className="conatiner">{children}</main>
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
