import AppBar from "@/components/AppBar";
import "@/styles/globals.css";
import Providers from "@/components/Providers";
import { Josefin_Sans } from "next/font/google";
import React from "react";
import { NextUIProviders } from "./providers";
import { cn } from "@/shad/utils";

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
              <AppBar />
          

                {props.children}
                
            </main>
          </NextUIProviders>
        </Providers>
      </body>
    </html>
  );
}
