"use client";

import { Backend_URL, Frontend_URL } from "@/lib/Constants";
import { useCallback, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Snippet,
  Button,
} from "@nextui-org/react";
import { PiCertificateBold } from "react-icons/pi";
import { useSession } from "next-auth/react";
import {
  FaHouseUser,
  FaIndustry,
  FaUserFriends,
  FaUsersCog,
} from "react-icons/fa";
import RadioDepartments, { Departments } from "./(components)/RadioDepartments";
import { CardDescription } from "@/components/ui/card";

function Page() {
  const { data: session, update } = useSession();
  const [isWarrantyLinkReady, setIsWarrantyLinkReady] = useState(false);
  const [warrantyLink, setWarrantyLink] = useState("");
  const [department, setDepartment] = useState<Departments>("support");
  const [isNewUserLinkReady, setIsNewUserLinkReady] = useState({
    integrator: false,
    distributor: false,
    client: false,
    colaborator: false,
  });
  const [newUserLink, setNewUserLink] = useState({
    integrator: "",
    distributor: "",
    client: "",
    colaborator: "",
  });

  const getLink = useCallback(
    (type: "pessoa-fisica" | "pessoa-juridica") => async () => {
      const sessionUpdated = await update();
      const res = await fetch(Backend_URL + "/auth/create-temp-auth", {
        method: "POST",
        // body: JSON.stringify({
        //   name,
        //   lastName,
        //   password,
        //   email,
        //   uuid: props.params.token,
        // }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionUpdated?.backendTokens.accessToken}`,
        },
      });
      if (!res.ok) {
        alert(res.statusText);
        return;
      }
      const response = await res.json();
      setWarrantyLink(
        `${Frontend_URL}/abrir-garantia/${type}/${response.code}`
      );
      setIsWarrantyLinkReady(true);
      alert("Link criado!");
      console.log({ response });
    },
    []
  );
  // console.log(session?.backendTokens.accessToken)
  const getRegisterLink = useCallback(
    (groupName: "integrator" | "distributor" | "client") => async () => {
      const sessionUpdated = await update();
      const res = await fetch(Backend_URL + "/auth/create-temp-auth", {
        method: "POST",
        body: JSON.stringify({
          groupName,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionUpdated?.backendTokens.accessToken}`,
        },
      });
      if (!res.ok) {
        alert(res.statusText);
        return;
      }
      const response = await res.json();

      setNewUserLink((prev) => ({
        ...prev,
        [groupName]: `${Frontend_URL}/sign-up/${response.code}`,
      }));
      setIsNewUserLinkReady((prev) => ({ ...prev, [groupName]: true }));
      alert("Link criado!");
      console.log({ response });
    },
    []
  );

  const getInternalRegisterLink = useCallback(
    (
        department:
          | "logistics"
          | "dispatch"
          | "maintenance"
          | "support"
          | "marketing"
      ) =>
      async () => {
        const sessionUpdated = await update();
        
        const res = await fetch(Backend_URL + "/auth/create-temp-auth", {
          method: "POST",
          body: JSON.stringify({
            department,
          }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${sessionUpdated?.backendTokens.accessToken}`,
          },
        });
        if (!res.ok) {
          alert(res.statusText);
          return;
        }
        const response = await res.json();

        setNewUserLink((prev) => ({
          ...prev,
          colaborator: `${Frontend_URL}/sign-up/${response.code}`,
        }));
        setIsNewUserLinkReady((prev) => ({ ...prev, colaborator: true }));
        alert("Link criado!");
        console.log({ response });
      },
    []
  );

  // const handleWarrantyLink = () => {
  //   getLink();
  // };

  return (
    <div className="grid mb-10 gri-cols-1 gap-5 2xl:grid-cols-2 2xl:gap-8">
      <div className="max-lg:mx-auto">
        <Card className="min-h-[100%] max-md:!max-w-[90vw] max-lg:!max-w-[85vw] max-md:!min-w-[90vw] max-lg:!min-w-[85vw]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">
                Gerar link para usuário solicitar garantia
              </p>
              <p className="text-small text-default-500">
                Usuário precisa estar logado em sua conta. Link de uso único,
                expira em 6 horas.
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <Snippet

              symbol={
                <PiCertificateBold
                  width={20}
                  className="min-w-[30px] min-h-[30px]"
                />
              }
              hideCopyButton={!isWarrantyLinkReady}
              classNames={{
                pre: "flex items-center overflow-hidden",
                symbol: "mr-5 min-w-[20px]",
              }}
              // onCopy={() => setIsWarrantyLinkReady(false)}
              color="success"
              tooltipProps={{
                content: "Copiar para a área de transferência"
              }}
            >
              <span className="truncate">
                {isWarrantyLinkReady
                  ? warrantyLink
                  : `${Frontend_URL}/abrir-garantia`}
              </span>
            </Snippet>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-around">
            <Button
              onClick={getLink("pessoa-fisica")}
              color="success"
              size="lg"
              variant="shadow"
            >
              Pessoa Física
            </Button>
            <Button
              onClick={getLink("pessoa-juridica")}
              color="success"
              size="lg"
              variant="shadow"
            >
              Pessoa Jurídica
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="max-lg:mx-auto">
        <Card className="min-h-[100%] max-md:!max-w-[90vw] max-lg:!max-w-[85vw] max-md:!min-w-[90vw] max-lg:!min-w-[85vw]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">
                Gerar link para usuário INTEGRADOR se cadastrar na plataforma
              </p>
              <p className="text-small text-default-500">
                Link de uso único, expira em 6 horas
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <Snippet

              symbol={
                <FaUserFriends
                  width={20}
                  className="min-w-[30px] min-h-[30px]"
                />
              }
              hideCopyButton={!isNewUserLinkReady.integrator}
              classNames={{
                pre: "flex items-center overflow-hidden",
                symbol: "mr-5 min-w-[20px]",
              }}
              // onCopy={() => setIsWarrantyLinkReady(false)}
              color="danger"
              tooltipProps={{
                content: "Copiar para a área de transferência"
              }}
            >
              <span className="truncate">
                {isNewUserLinkReady.integrator
                  ? newUserLink.integrator
                  : `${Frontend_URL}/sign-up`}
              </span>
            </Snippet>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-center">
            <Button
              onClick={getRegisterLink("integrator")}
              color="danger"
              size="lg"
              variant="shadow"
            >
              Gerar link
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="max-lg:mx-auto">
        <Card className="min-h-[100%] max-md:!max-w-[90vw] max-lg:!max-w-[85vw] max-md:!min-w-[90vw] max-lg:!min-w-[85vw]" >
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">
                Gerar link para usuário DISTRIBUIDOR se cadastrar na plataforma
              </p>
              <p className="text-small text-default-500">
                Link de uso único, expira em 6 horas
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <Snippet
              symbol={
                <FaIndustry width={20} className="min-w-[30px] min-h-[30px]" />
              }
              hideCopyButton={!isNewUserLinkReady.distributor}
              classNames={{
                pre: "flex items-center overflow-hidden",
                symbol: "mr-5 min-w-[20px]",
              }}
              // onCopy={() => setIsWarrantyLinkReady(false)}
              color="warning"
              tooltipProps={{
                content: "Copiar para a área de transferência"
              }}
            >
              <span className="truncate">
                {isNewUserLinkReady.distributor
                  ? newUserLink.distributor
                  : `${Frontend_URL}/sign-up`}
              </span>
            </Snippet>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-center">
            <Button
              onClick={getRegisterLink("distributor")}
              color="warning"
              variant="shadow"
              size="lg"
            >
              Gerar link
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="max-lg:mx-auto">
        <Card className="min-h-[100%] max-md:!max-w-[90vw] max-lg:!max-w-[85vw] max-md:!min-w-[90vw] max-lg:!min-w-[85vw]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">
                Gerar link para usuário CLIENTE FINAL se cadastrar na plataforma
              </p>
              <p className="text-small text-default-500">
                Link de uso único, expira em 6 horas
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <Snippet
              symbol={
                <FaHouseUser width={20} className="min-w-[30px] min-h-[30px]" />
              }
              hideCopyButton={!isNewUserLinkReady.client}
              classNames={{
                pre: "flex items-center overflow-hidden",
                symbol: "mr-5 min-w-[20px]",
              }}
              // onCopy={() => setIsWarrantyLinkReady(false)}
              color="secondary"
              tooltipProps={{
                content: "Copiar para a área de transferência"
              }}
            >
              <span className="truncate">
                {isNewUserLinkReady.client
                  ? newUserLink.client
                  : `${Frontend_URL}/sign-up`}
              </span>
            </Snippet>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-center">
            <Button
              onClick={getRegisterLink("client")}
              color="secondary"
              size="lg"
              variant="shadow"
            >
              Gerar link
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="max-lg:mx-auto col-span-full">
        <Card className="mx-auto min-h-[100%] max-md:!max-w-[90vw] max-lg:!max-w-[85vw] max-md:!min-w-[90vw] max-lg:!min-w-[85vw] 2xl:max-w-[70%] 2xl:max-lg:mx-auto ">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">
                Gerar link para usuário COLABORADOR se cadastrar na plataforma
              </p>
              <p className="text-small text-default-500">
                Link de uso único, expira em 6 horas
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
              {" "}
              <RadioDepartments useDeparmentsState={[department, setDepartment]} />
          </CardBody>

          <Divider />
          <CardBody>
            <Snippet
              symbol={
                <FaUsersCog width={20} className="min-w-[30px] min-h-[30px]" />
              }
              hideCopyButton={!isNewUserLinkReady.colaborator}
              classNames={{
                pre: "flex items-center overflow-hidden",
                symbol: "mr-5 min-w-[20px]",
              }}
              // onCopy={() => setIsWarrantyLinkReady(false)}
              color="primary"
              tooltipProps={{
                content: "Copiar para a área de transferência"
              }}
            >
              <span className="truncate">
                {isNewUserLinkReady.colaborator
                  ? newUserLink.colaborator
                  : `${Frontend_URL}/sign-up`}
              </span>
            </Snippet>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-center">
            <Button
              onClick={getInternalRegisterLink(department)}
              color="primary"
              size="lg"
              variant="shadow"
            >
              Gerar link
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Page;
