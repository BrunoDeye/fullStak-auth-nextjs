"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import { signOut } from "next-auth/react";
import {Button} from '@nextui-org/button';

function SignInButton() {
  const { data: session, status, update } = useSession();
  const pathname = usePathname();
  // console.log(session);

  if (status === "loading")
    return <div className="flex gap-4 ml-auto">Carregando...</div>;

  if (session && session.user)
    return (
      <div className="flex gap-4 pl-unit-3xl transition-all delay-100 duration-200 w-unit-80 hover:w-unit-9xl pr-unit-8 rounded rounded-l-full justify-around items-center bg-sky-700">
        <p className="text-sky-100">{session.user.sub.name} {session.user.sub.lastname}</p>

        <Button radius="sm" color="danger"  onClick={() => signOut()} className="ml-auto">
          Sair
        </Button>
      </div>
    );

  return null;
}

export default SignInButton;
