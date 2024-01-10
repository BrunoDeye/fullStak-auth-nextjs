"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { WarrantyData } from "@/types/warranty.type";
import dateFormatter from "@/utils/dateFormatter";
import Carousel from "../Caroussel/Carousel";
import DeyeImage from "@/../../public/deye8.png";
import IconImage from "@/../../public/datasheettest.png";
import NextImage from "next/image";
import { useWindowSize } from "@uidotdev/usehooks";
import ApproveModal from "./ApproveModal";
import { useRouter } from "next/navigation";
import { mapGroups } from "@/utils/mapGroupsFromBack";
import { useSession } from "next-auth/react";
import FilesModal from "./FilesModal";

type Props = {
  warrantiesList: WarrantyData[];
};

const imagesItems = [
  {
    title: "Datasheet dos módulos",
    subtitle: "Micro",
    type: "Obrigatório",
    image: "https://s3.sa-east-1.amazonaws.com/deye-web-storage/24000040_SupportDeye/Micro_10104_logoDeye.png",
  },
  {
    title: "Datasheet dos módulos",
    subtitle: "Micro",
    type: "Obrigatório",
    image: "/datasheettest.png",
  },
  {
    title: "Datasheet dos módulos",
    subtitle: "Micro",
    type: "Obrigatório",
    image: "/datasheettest.png",
  },
  {
    title: "Datasheet dos módulos",
    subtitle: "Micro",
    type: "Obrigatório",
    image: "/datasheettest.png",
  },
  {
    title: "Datasheet dos módulos",
    subtitle: "Micro",
    type: "Obrigatório",
    image: "/deye8.png"
  },
  {
    title: "Datasheet dos módulos",
    subtitle: "Micro",
    type: "Obrigatório",
    image: "/deye8.png",
  },
  {
    title: "Datasheet dos módulos",
    subtitle: "Micro",
    type: "Obrigatório",
    image: "/deye8.png",
  },
  {
    title: "Datasheet dos módulos",
    subtitle: "Micro",
    type: "Obrigatório",
    image: "/deye8.png",
  },
];

function WarrantiesList({ warrantiesList }: Props) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  const router = useRouter()
  const { data: session } = useSession();
  

  
  const size = useWindowSize()
  return isClient
    ? warrantiesList.map((warranty, index) => (
      
        <Card
          key={`${warranty.id}-${index}`}
          // classNames={{ base: "min-w-full w-full", body: "min-w-full w-full" }}
          className="min-w-full  w-full min-h-[360px] max-h-[360px] sm:min-h-[500px] sm:max-h-[500px]  border-2 border-blue-200"
        >
          <CardHeader className="justify-between items-center">
            Caso Nº {warranty.id}
           <FilesModal warrantyId={warranty.id}/>
          </CardHeader>
          <CardBody className="px-3 max-sm:overflow-x-hidden py-0 text-small text-default-400">
            <div className="">
              <div>
                <span>
                  Autor: {warranty.author.name} {warranty.author.lastName}
                </span>
                <div>
                  Produtos:{" "}
                  {warranty.productsWarranty.map((product, index) => (
                    <span
                      className="me-3"
                      key={`${product.serialNumber}-${index}`}
                    >
                      {product.model}
                    </span>
                  ))}
                </div>
               
              </div>
              <div className="relative mt-5">
                <Carousel items={imagesItems} />
              </div>
            </div>
            {/* <div>{warranty.testList}</div> */}
          </CardBody>
          <CardFooter className="gap-3 flex justify-between items-center">
            {dateFormatter(warranty.createdAt as any)}
            <ApproveModal warrantyId={warranty.id} />
          </CardFooter>
        </Card>
      ))
    : null;
}

export default WarrantiesList;
