import React from 'react'
import { Backend_URL } from "@/lib/Constants";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SideBar from "@/components/SideBar";
import { authOptions } from "@/authOptions";
import WarrantiesList from '@/components/ApproveWarranty/WarrantiesList';

async function WarrantiesToApprove() {
  const session = await getServerSession(authOptions);
  const response = await fetch(Backend_URL + `/warranty/not-approved`, {
    method: "GET",
    cache: 'no-store',
    headers: {
      authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const warranties = await response.json();
  // console.log(warranties)
  if (warranties.length === 0) return;
  return (
    <div className='flex-col flex gap-5'>
      <WarrantiesList warrantiesList={warranties} />
    </div>
  )
}

export default WarrantiesToApprove