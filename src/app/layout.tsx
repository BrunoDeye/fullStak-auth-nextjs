import "@/styles/globals.css";
import Providers from "@/components/Providers";
import { Josefin_Sans } from "next/font/google";
import React from "react";
import { NextUIProviders } from "./providers";
import { cn } from "@/shad/utils";
import NavBar from "@/components/NavBar/NavBar";
import { Toaster } from "@/components/ui/toaster"

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--josefin-sans",
});

export const metadata = {
  title: "Central Deye",
  description: "Central Deye",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout(props: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
      className={cn(
        "min-h-screen light text-foreground bg-background font-sans antialiased",
        josefin.variable
      )}
       >
        <Providers>
          <NextUIProviders>
            <main>
                <NavBar />

                {props.children}
                <Toaster />
            </main>
          </NextUIProviders>
        </Providers>
      </body>
    </html>
  );
}
