"use client";
import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

const AppBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname === "/sign-in" || pathname === "/sign-up" ) return null;
  return (
    <header className="flex items-stretch bg-sky-800" >
      <div className="flex items-center w-full gap-4 py-8 px-6 shadow">
      <Image
        className="text-center -mt-1 pl-2"
        quality={100}
        width={200}
        height={200}
        alt="Deye logo"
        src="/centralDeyeWhite.png"
      />

      {pathname === "/sign-up" ? null : (
        <>
          <Link
            className="px-6 font-bold text-xl transition-colors rounded text-sky-100 hover:bg-sky-950 hover:text-sky-100 p-3"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="px-6 font-bold text-xl transition-colors rounded text-sky-100 hover:bg-sky-950 hover:text-sky-100 p-3"
            href={`/usuario/colaborador/dashboard`}
          >
            Dashboard
          </Link>
        </>
      )}
      </div>
      <SignInButton />
    </header>
  );
};

export default AppBar;
