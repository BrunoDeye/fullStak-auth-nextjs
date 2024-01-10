"use client"
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function Home() {
  // if (session) session.user.accessToken = "dddd";
  const { status } = useSession();

  if ( status === "loading") 
    return (<div>
      <Spinner />
    </div>)
  

  return (
    <div>
      <p>Olá, seja bem vindo.</p>
    </div>
  );
}
