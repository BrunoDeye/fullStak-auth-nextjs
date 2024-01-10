"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: ReactNode;
}

function Providers({ children }: Props) {
  return (
    <SessionProvider refetchInterval={60 * 10} refetchOnWindowFocus={false}>{children}</SessionProvider>
  );
}

export default Providers;
