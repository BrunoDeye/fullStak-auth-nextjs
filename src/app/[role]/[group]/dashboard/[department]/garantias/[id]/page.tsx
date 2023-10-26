import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Modal from "@/components/Modal";
import { Backend_URL } from "@/lib/Constants";
import { WarrantyData } from "@/types/warranty.type";
import dateFormatter from "@/utils/dateFormatter";
import findMostRecentUpdate from "@/utils/findMostRecentUpdate";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

async function WarrantyPage(props: Props) {

  const session = await getServerSession(authOptions);
  const response = await fetch(Backend_URL + `/warranty/${props.params.id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  // console.log({ response });
  const warranty: WarrantyData = await response.json();

  return (
    <Modal>
    <div className="bg-white p-10 rounded">
    
      <div className="m-2 border rounded shadow overflow-hidden">
        <div className="p-2 bg-sky-800 text-sky-100 text-center">Garantia</div>

        <div className="grid grid-cols-2  p-2 gap-2">
          <p className="p-2 text-sky-600">Numero do Caso:</p>
          <p className="p-2 text-slate-950">{warranty.id}</p>
          <p className="p-2 text-sky-600">Numero de Série:</p>
          <p className="p-2 text-slate-950">
            {warranty.productsWarranty[0].serialNumber}
          </p>
          <p className="p-2 text-sky-600">Modelo:</p>
          <p className="p-2 text-slate-950">
            {warranty.productsWarranty[0].model}
          </p>
          <p className="p-2 text-sky-600">Nome:</p>
          <p className="p-2 text-slate-950">{warranty.registration.name}</p>
          <p className="p-2 text-sky-600">Data abertura:</p>
          <p className="p-2 text-slate-950">
            {dateFormatter(warranty.createdAt as any)}
          </p>
          <p className="p-2 text-sky-600">Comentarios:</p>
          <p className="p-2 text-slate-950">{warranty.comments}</p>
          <p className="p-2 text-sky-600">Status:</p>
          <p className="p-2 text-slate-950">
            {findMostRecentUpdate(warranty.usersUpdates)?.status}
          </p>
          <p className="p-2 text-sky-600">Tipo:</p>
          <p className="p-2 text-slate-950">{warranty.warrantyType}</p>
        </div>
      </div>
    </div>
    </Modal>
  );
}

export default WarrantyPage;
