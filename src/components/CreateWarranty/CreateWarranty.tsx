"use client";
import React, { ChangeEvent, useEffect, useMemo } from "react";
import { Tabs, Tab, Card, CardBody, useDisclosure } from "@nextui-org/react";
import Step1 from "./step1/Step1";
import Step3 from "./step3/Step3";
import Step2 from "./step2/Step2";
import useFormStep2 from "./step2/useFormStep2";
import useFormStep1 from "./step1/useFormStep1";
import useFormStep3, { ProductForm3Values } from "./step3/useFormStep3";
import { useFileStore } from "@/store/fileList";
import { Backend_URL } from "@/lib/Constants";
import HandleCreateModal from "./step3/result/HandleCreateModal";
import useFormProducts from "./step2/useFormProducts";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Groups } from "@/utils/mapGroupsFromBack";
import { Departments, Roles } from "@/lib/next-auth";
import { useParams } from "next/navigation";
import { AddressType } from "./step1/ListModal";

export const initialMicroState = {
  id: 0,
  doesntTurnOn: false,
  noPV: false,
  doesntEmitAP: false,
  doesntIdentify: false,
  doesntConnect: false,
  noCommunication: false,
  physicalDmg: false,
  f14: false,
  f19: false,
  f23: false,
  f30: false,
  f35: false,
  f55: false,
  f64: false,
  standby: false,
  noise: false,
};

const { id, ...initialState } = initialMicroState;

export type KeysOfInitialState = keyof typeof initialState;

type UserInfo = {
  address: [
    {
      id: number;
      userId: number;
      companyId: number | null;
      city: string;
      state: string;
      street: string;
      number: string;
      postalCode: string;
      complement: string;
      isPrimary: boolean;
      title: string;
      neighborhood: string;
    }
  ];
  group: {
    id: number;
    title: Groups;
    department: Departments;
    description: string | null;
  };
  id: number;
  companyId: number | null;
  email: string;
  name: string;
  cpf: string | null;
  lastName: string;
  role: Roles;
  verified: boolean;
  groupId: number;
  phoneNumber: string | null;
  cnpj: string | null;
};

async function requestUserInfo<T>(session: Session): Promise<T> {
  const response = await fetch(Backend_URL + `/user/${session?.user.sub.id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
}

const testListSave = [1, 1, 1];

type AuthData = {
  uuid: string;
  responsibleEngineerId: number;
  groupId: null;
};

type Props = {
  authData: AuthData;
};

function CreateWarranty({ authData }: Props) {
  const [selected, setSelected] = React.useState("step-1");
  const { userType } = useParams();
  const formProducts = useFormProducts();
  const formStep1 = useFormStep1(userType === "pessoa-fisica" ? "cpf" : "cnpj");
  const formStep2 = useFormStep2();
  const formStep3 = useFormStep3();
  const [shouldSaveAddress, setShouldSaveAddress] = React.useState({
    authorAddress: false,
    colectAddress: false,
    returnAddress: false,
  });
  //  console.log(shouldSaveAddress)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isForm1Complete, setIsForm1Complete] = React.useState(false);
  const [isForm2Complete, setIsForm2Complete] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);
  const [isSessionLoaded, setIsSessionLoaded] = React.useState(false);
  const { data: session, update } = useSession();
  const [removeAll] = useFileStore((state) => [state.removeAll]);
  const [productList, setProductList] = React.useState([
    {
      id: 0,
      model: "",
      serialNumber: "",
      type: "",
      description: "",
      alert: [""],
    },
  ]);

  const [edited, setEdited] = React.useState({
    authorAddress: false,
    colectAddress: false,
    returnAddress: false,
  });

  useEffect(() => {
    if (session && session.user.sub && !isSessionLoaded) {
      const getUserInfo = async () => {
        const updatedSession = await update();

        if (updatedSession) {
          // console.log(updatedSession?.backendTokens.accessToken)
          const data = await requestUserInfo<UserInfo>(updatedSession);
          formStep1.setValue("email", data.email);
          formStep1.setValue("name", data.name);
          if (data.cpf) formStep1.setValue("cpf", data.cpf);
          if (data.phoneNumber)
            formStep1.setValue("phoneNumber", data.phoneNumber);
          if (data.address[0]) {
            formStep1.setValue(
              "authorAddress.postalCode",
              data.address[0].postalCode
            );
            formStep1.setValue("authorAddress.number", data.address[0].number);
            if (data.address[0].complement)
              formStep1.setValue(
                "authorAddress.complement",
                data.address[0].complement
              );
            if (data.address[0].street)
              formStep1.setValue(
                "authorAddress.street",
                data.address[0].street
              );
            if (data.address[0].city)
              formStep1.setValue("authorAddress.city", data.address[0].city);
            if (data.address[0].state)
              formStep1.setValue("authorAddress.state", data.address[0].state);
            if (data.address[0].neighborhood)
              formStep1.setValue(
                "authorAddress.neighborhood",
                data.address[0].neighborhood
              );
            setEdited((prevState) => ({ ...prevState, authorAddress: true }));
            formStep1.setValue("addressList", [data.address[0].id, -1, -1]);
          }
        }
        // formStep1.setValue("cnpj", data.cnpj);
      };
      setIsSessionLoaded(true);

      getUserInfo();
    }
  }, [session]);
  // console.log(productList)
  const createAddresses = async (): Promise<[number, number, number]> => {
    const addresses = [
      formStep1.watch("authorAddress"),
      formStep1.watch("colectAddress"),
      formStep1.watch("returnAddress"),
    ];

    const addressesIds = [];

    for (const [index, address] of addresses.entries()) {
      if (session) {
        const addressData = {
          userId: Object.values(shouldSaveAddress)[index]
            ? +session.user.sub.id
            : null,
          city: address.city,
          state: address.state,
          street: address.street,
          number: address.number,
          postalCode: address.postalCode,
          complement: address.complement,
          neighborhood: address.neighborhood,
          title:
            formStep1.watch(
              `${Object.keys(shouldSaveAddress)[index]}.title` as any
            ) || "",
        };
        addressesIds.push(
          await fetch(Backend_URL + "/address/create", {
            method: "POST",
            body: JSON.stringify(addressData),
            headers: {
              authorization: `Bearer ${session?.backendTokens.accessToken}`,
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              return data.id;
            })
            .catch((error) => {
              console.error("Error uploading files:", error);
            })
        );
      } else if (!session) {
        console.error("Session error");
      } else {
        const list = formStep1.watch("addressList");
        addressesIds.push(list[index]);
      }
    }

    return addressesIds as [number, number, number];
  };

  const onSubmitHandler = async (data: ProductForm3Values) => {
    // console.log(data);
    setIsloading(true);

    onOpen();
    const addressesList = await createAddresses();

    // {
    //   "authorId": 1,
    //   "name": "Marquinho",
    //   "email": "johndoe@example.com",
    //   "phoneNumber": "+55999123674",
    //   "addresses": [
    //     {
    //       "addressId": 4,
    //       "type": "REGISTRATION"
    //     },
    //     {
    //       "addressId": 5,
    //       "type": "PICKUP"
    //     },
    //     {
    //       "addressId": 5,
    //       "type": "DELIVERY"
    //     }
    //   ],
    //   "products": [
    //     {
    //       "model": "SUN-3k",
    //       "fault": [
    //         "NOISE"
    //       ],
    //       "faultDescription": "to much noise",
    //       "serialNumber": "3XYZ789"
    //     }
    //   ]
    // }

    const warrantyData = {
      authorId: +session!.user.sub.id,
      name: formStep1.watch("name"),
      email: formStep1.watch("email"),
      phoneNumber: formStep1.watch("phoneNumber"),
      [userType === "pessoa-fisica" ? "cpf" : "cnpj"]: formStep1.watch(
        userType === "pessoa-fisica" ? "cpf" : "cnpj"
      ),
      // cnpj: formStep1.watch("cpf"),
      onSiteContact: formStep1.watch("responsibleForCollecting.name"),
      onSiteContactNumber: formStep1.watch(
        "responsibleForCollecting.phoneNumber"
      ),
      finalClientName: formStep2.watch("client"),
      finalClientNumber: formStep2.watch("clientPhoneNumber"),

      addresses: [
        {
          addressId: addressesList[0],
          type: "REGISTRATION",
        },
        {
          addressId: addressesList[1],
          type: "PICKUP",
        },
        {
          addressId: addressesList[2],
          type: "DELIVERY",
        },
      ],
      products: productList.map((product) => ({
        model: product.model,
        fault: [...product.alert],
        faultDescription: product.description,
        serialNumber: product.serialNumber,
      })),
      distributorPhoneNumber: formStep2.watch("distributorPhoneNumber"),
      integratorPhoneNumber: formStep2.watch("integratorPhoneNumber"),
      integratorName: formStep2.watch("integrator"),
      distributorName: formStep2.watch("distributor"),
    };
    console.log(warrantyData);
    const warranty = await fetch(Backend_URL + "/warranty/create", {
      method: "POST",
      body: JSON.stringify(warrantyData),
      headers: {
        // authorization: `Bearer ${session?.backendTokens.accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error creating warranty:", error);
      });
    console.log(warranty);
    // /warranty/create
    if (data) {
      // build FormData for uploading image
      const formData = new FormData();
      console.log(data);
      // formData.append("file", data.products[0].microFiles[0]!.content);
      data.products.forEach((product, productIndex) => {
        if (product.hybridFiles!.length !== 0) {
          product.hybridFiles!.forEach((file, typeIndex) => {
            if (file?.content instanceof File && file?.content) {
              const modifiedFileName = `Hybrid_${file.code}_${file.content.name}`;
              const modifiedFile = new File([file.content], modifiedFileName, { type: file.content.type });
              formData.append(`files`, modifiedFile);
            }
          });
        } else if (product.microFiles!.length !== 0) {
          product.microFiles!.forEach((file) => {
            if (file?.content instanceof File && file?.content) {
              const modifiedFileName = `Micro_${file.code}_${file.content.name}`;
              const modifiedFile = new File([file.content], modifiedFileName, { type: file.content.type });
              formData.append("files", modifiedFile);
            }
          });
        } else if (product.stringFiles!.length !== 0) {
          product.stringFiles!.forEach((file) => {
            if (file?.content instanceof File && file?.content) {
              const modifiedFileName = `String_${file.code}_${file.content.name}`;
              const modifiedFile = new File([file.content], modifiedFileName, { type: file.content.type });
              formData.append("files", modifiedFile);
            }
          });
        }
      });

      await fetch(Backend_URL + `/file/upload/${warranty.warrantyId}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Upload successful:", data);
        })
        .catch((error) => {
          console.error("Error uploading files:", error);
        });

      removeAll();
    }
    // create product
    // console.log({ ...data, image: imageUrl! });
    formStep1.reset();
    formStep2.reset();
    formStep3.reset({
      products: [{ stringFiles: [], hybridFiles: [], microFiles: [] }],
    });
    setProductList([
      {
        id: 0,
        model: "",
        serialNumber: "",
        type: "",
        description: "",
        alert: [""],
      },
    ]);
    setIsloading(false);
  };

  const [microTestsIsSelected, microTestsSetIsSelected] = React.useState([
    initialMicroState,
  ]);

  useEffect(() => {
    if (productList[0].model !== "") {
      if (microTestsIsSelected[0].id === 0) {
        microTestsSetIsSelected([
          {
            ...initialMicroState,
            id: productList[0].id,
          },
        ]);
      } else {
        const newState = [] as (typeof initialMicroState)[];

        productList.forEach((product) =>
          newState.push({
            ...initialMicroState,
            id: product.id,
          })
        );
        microTestsSetIsSelected(newState);
      }
    } else {
      microTestsSetIsSelected([initialMicroState]);
    }
  }, [productList]);
  // useMemo(() => {
  //   console.log(productList)
  // }, [productList])
  // useMemo(() => {
  // console.log(formStep3.watch('products'))
  // }, [formStep3.watch('products')])
  // useMemo(() => {
  // console.log(formStep3.formState.errors)
  // }, [formStep3.formState.errors])
  // console.log(formStep3.watch("products"));

  return (
    <div className="flex flex-col h-full w-full">
      <Card className="max-w-[1600px] my-2 mx-0 sm:mx-auto w-full max-md:mb-10">
        <CardBody className="overflow-hidden p-2 sm:p-5">
          <Tabs
            fullWidth
            color="primary"
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(e) => setSelected(e as string)}
            classNames={{
              tab: "py-12 sm:py-7 px-2 text-sm sm:text-lg",
              base: "py-0 sm:py-3",
              tabContent: " whitespace-break-spaces line-clamp-3",
            }}
          >
            <Tab key="step-1" title="Passo 1 (Cadastro)">
              <Step1
                edited={edited}
                setEdited={setEdited}
                formStep1={formStep1}
                setSelected={setSelected}
                setIsForm1Complete={setIsForm1Complete}
                shouldSaveAddress={shouldSaveAddress}
                setShouldSaveAddress={setShouldSaveAddress}
              />
            </Tab>
            <Tab
              isDisabled={
                Object.keys(formStep1.formState.errors).length > 0 ||
                !isForm1Complete
              }
              key="step-2"
              title="Passo 2 (Produto e Complemento)"
            >
              <Step2
                productList={productList}
                setProductList={setProductList}
                formStep2={formStep2}
                formProducts={formProducts}
                setSelected={setSelected}
                setIsForm2Complete={setIsForm2Complete}
              />
            </Tab>
            <Tab
              isDisabled={
                Object.keys(formStep2.formState.errors).length > 0 ||
                !isForm2Complete
              }
              key="step-3"
              title="Passo 3 (Testes)"
            >
              <Step3
                formStep3={formStep3}
                onSubmitHandler={onSubmitHandler}
                microTestsIsSelected={microTestsIsSelected}
                microTestsSetIsSelected={microTestsSetIsSelected}
                productList={productList}
                setProductList={setProductList}
                setSelected={setSelected}
              />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
      <HandleCreateModal
        setSelected={setSelected}
        isLoading={isLoading}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setEdited={setEdited}
      />
    </div>
  );
}

export default CreateWarranty;
