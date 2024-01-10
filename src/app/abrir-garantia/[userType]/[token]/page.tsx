
import { authOptions } from "@/authOptions";
import CreateWarranty from "@/components/CreateWarranty/CreateWarranty";
import { Backend_URL } from "@/lib/Constants";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {
  params: {
    token: string;
  };
};

async function OpenWarranty(props: Props) {
  const session = await getServerSession(authOptions);
  // console.log("TESTE" + session?.backendTokens.accessToken)
  const response = await fetch(
    Backend_URL + `/auth/verify-temp-auth/${props.params.token}`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.backendTokens.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  // console.log(data)

  return (
    <div className="min-h-full min-w-full md:rounded-tl-2xl bg-white">
      <div className="p-5 h-[85vh] max-w-full min-w-full sm:max-w-[85vw] xl:max-w-[100vw] overflow-y-scroll">
        <div>
          <CreateWarranty authData={data}/>
        </div>
      </div>
    </div>
  );
}

export default OpenWarranty;
