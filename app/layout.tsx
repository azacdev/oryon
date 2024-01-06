import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/sonner";

import "@/styles/globals.css";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oryon",
  description: "Oryon Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
