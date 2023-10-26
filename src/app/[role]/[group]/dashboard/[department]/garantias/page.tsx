import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Backend_URL } from "@/lib/Constants";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { WarrantyData } from "../../../../../../types/warranty.type";
import dateFormatter from "@/utils/dateFormatter";
import findMostRecentUpdate from "@/utils/findMostRecentUpdate";
import WarrantiesTable from "@/components/Table";

async function WarrantiesPage() {
  const session = await getServerSession(authOptions);
  const response = await fetch(Backend_URL + `/warranty`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  // console.log({ response });
  const warranties = await response.json();
  // console.log(warranties)
  if (warranties.length === 0) return;

  return (
    <div>
      <WarrantiesTable warrantiesList={warranties} />{" "}
    </div>
  );
}

export default WarrantiesPage;
