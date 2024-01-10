"use client";
import React, { useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, FormProps, UseFormReturn } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Divider,
  useDisclosure,
  User,
  Checkbox,
} from "@nextui-org/react";
import br from "react-phone-number-input/locale/pt-BR.json";
import PhoneInput, {
  getCountryCallingCode,
} from "react-phone-number-input/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AddressPicker from "./AddressPicker";
import { mapTitles } from "../utils/mapPickerTitles";
import { CountrySelect } from "./CountrySelect";
import CollectCard from "./CollectCard";
import CollectModal from "./CollectModal";
import { FormStep1Type } from "./useFormStep1";
import ListModal from "./ListModal";
import TitleModal from "./TitleModal";

type Props = {
  form: UseFormReturn<FormStep1Type, any, undefined>;
  addressType: "authorAddress" | "colectAddress" | "returnAddress";
  edited: {
    authorAddress: boolean;
    colectAddress: boolean;
    returnAddress: boolean;
  };
  setEdited: React.Dispatch<
    React.SetStateAction<{
      authorAddress: boolean;
      colectAddress: boolean;
      returnAddress: boolean;
    }>
  >;
  setShouldSaveAddress: React.Dispatch<
    React.SetStateAction<{
      authorAddress: boolean;
      colectAddress: boolean;
      returnAddress: boolean;
    }>
  >;
  shouldSaveAddress: {
    authorAddress: boolean;
    colectAddress: boolean;
    returnAddress: boolean;
  };
};

type AddressApi = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

async function requestAddress<T>(CEP: string): Promise<T> {
  const apiUrl = `https://viacep.com.br/ws/${CEP}/json/`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
}

function AddressForm({
  form,
  addressType,
  edited,
  setEdited,
  setShouldSaveAddress,
  shouldSaveAddress,
}: Props) {
  const registerWithMask = useHookFormMask(form.register);
  const [selected, setSelected] = React.useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isTitleOpen,
    onOpen: onTitleOpen,
    onOpenChange: onTitleOpenChange,
  } = useDisclosure();

  const {
    isOpen: isListOpen,
    onOpen: onListOpen,
    onOpenChange: onOpenListChange,
  } = useDisclosure();

  useEffect(() => {
    const CEP = form.watch(`${addressType}.postalCode`);

    const getAddress = async () => {
      requestAddress<AddressApi & Error>(CEP)
        .then((data) => {
          // Handle successful response data here
          form.setValue(`${addressType}.street`, data.logradouro);
          form.setValue(`${addressType}.complement`, data.complemento);
          form.setValue(`${addressType}.city`, data.localidade);
          form.setValue(`${addressType}.state`, data.uf);
          form.setValue(`${addressType}.neighborhood`, data.bairro);
        })
        .catch((error) => {
          // Handle errors, including HTTP 400 Bad Request
          console.error("Error:", error.message);
          // You can display an error message to the user or perform other error-handling logic
        });
    };

    const timer = setTimeout(() => {
      if (CEP.replace(/[-_]/g, "").length === 8) {
        const addressesList = form.watch(`addressList`);
        let isAddressFromList = false;
        switch (addressType) {
          case "authorAddress":
            if (addressesList[0] > 0) isAddressFromList = true;
            break;
          case "colectAddress":
            if (addressesList[1] > 0) isAddressFromList = true;
            break;
          case "returnAddress":
            if (addressesList[2] > 0) isAddressFromList = true;
            break;
        }
        if (!isAddressFromList) {
          getAddress();
        }
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [form.watch(`${addressType}.postalCode`)]);

  const [isAddressFromList, setIsAddressFromList] = React.useState(false);

  useEffect(() => {
    const actualList = form.watch("addressList");
    // console.log("TESTE")
    switch (addressType) {
      case "authorAddress":
        if (actualList[0] > 0) {
          setIsAddressFromList(true);
          setShouldSaveAddress((prev) => ({ ...prev, [addressType]: false }));
        } else {
          setIsAddressFromList(false);
        }
        break;

      case "colectAddress":
        if (actualList[1] > 0) {
          setIsAddressFromList(true);
          setShouldSaveAddress((prev) => ({ ...prev, [addressType]: false }));
        } else {
          setIsAddressFromList(false);
        }
        break;
      case "returnAddress":
        if (actualList[2] > 0) {
          setIsAddressFromList(true);
          setShouldSaveAddress((prev) => ({ ...prev, [addressType]: false }));
        } else {
          setIsAddressFromList(false);
        }
        break;
    }
  }, [...form.watch("addressList")]);
  return (
    <>
      <Card className="mt-auto">
        <CardHeader className="flex justify-between gap-3">
          {" "}
          <div className="flex flex-col">
            <p className="text-md">{mapTitles(addressType)}</p>
          </div>
          {edited[addressType] ? (
            <div className="flex max-sm:items-stretch max-sm:flex-col-reverse items-center gap-3">
              <div
                className={`${isAddressFromList ? "cursor-not-allowed" : ""}`}
              >
                <Checkbox
                  isDisabled={isAddressFromList}
                  isSelected={shouldSaveAddress[addressType]}
                  onValueChange={(value) => {
                    setShouldSaveAddress((prev) => ({
                      ...prev,
                      [addressType]: value,
                    }));

                    if (value) {
                      onTitleOpen();
                    } else {
                      form.setValue(`${addressType}.title`, "");
                    }
                  }}
                >
                  Salvar na lista de endereços
                </Checkbox>
              </div>

              <Button
                onClick={onOpen}
                variant="solid"
                color="primary"
                size="sm"
              >
                Editar
              </Button>
              <Button
                onClick={onListOpen}
                variant="solid"
                color="primary"
                size="sm"
              >
                Escolher da lista
              </Button>
            </div>
          ) : null}
        </CardHeader>
        <Divider />
        {edited[addressType] ? (
          <CardBody>
            <div className="flex flex-col max-md:items-start max-md:justify-start w-full md:flex-row flex-nowrap">
              <div className="grid max-md:grid-cols-2 max-md:justify-items-start md:flex md:justify-start xl:items-end xl:justify-around items-end my-auto w-full gap-5 max-xl:flex-wrap sm:mr-5">
                <User
                  name={form.watch(`${addressType}.postalCode`)}
                  description="CEP"
                  classNames={{ name: "text-lg", description: "text-sm" }}
                  // className="my-auto"
                  avatarProps={{
                    className: "hidden",
                  }}
                />

                <User
                  name={form.watch(`${addressType}.street`)}
                  description="Rua/Avenida"
                  classNames={{ name: "text-lg", description: "text-sm" }}
                  // className="my-auto"
                  avatarProps={{
                    className: "hidden",
                  }}
                />

                <User
                  // className="my-auto"
                  name={form.watch(`${addressType}.number`)}
                  classNames={{ name: "text-lg", description: "text-sm" }}
                  description="Nº"
                  avatarProps={{
                    className: "hidden",
                  }}
                />
                <User
                  name={form.watch(`${addressType}.complement`)}
                  description="Complemento"
                  classNames={{
                    name: "text-lg",
                    description: "text-sm",
                  }}
                  title={form.watch(`${addressType}.complement`)}
                  className={`${
                    form.watch(`${addressType}.complement`)
                      ? "max-md:my-auto"
                      : "hidden"
                  }`}
                  avatarProps={{
                    className: "hidden",
                  }}
                />
                <User
                  // className="my-auto"
                  name={form.watch(`${addressType}.city`)}
                  classNames={{ name: "text-lg", description: "text-sm" }}
                  description="Cidade"
                  avatarProps={{
                    className: "hidden",
                  }}
                />
                <User
                  // className="my-auto"
                  name={form.watch(`${addressType}.state`)}
                  classNames={{ name: "text-lg", description: "text-sm" }}
                  description="Estado"
                  avatarProps={{
                    className: "hidden",
                  }}
                />
                <User
                  // className="my-auto"
                  name={form.watch(`${addressType}.neighborhood`)}
                  classNames={{ name: "text-lg", description: "text-sm" }}
                  description="Bairro"
                  avatarProps={{
                    className: "hidden",
                  }}
                />
              </div>

              {addressType === "colectAddress" && edited[addressType] ? (
                <div className="flex flex-col md:flex-row items-start max-md:w-full md:items-center">
                  <Divider
                    orientation="horizontal"
                    className="visible block my-5 w-full md:hidden md:invisible"
                  />
                  <Divider
                    orientation="vertical"
                    className="h-full hidden invisible md:visible md:block md:ml-auto"
                  />
                  <div className="ml-0 md:ml-16 flex flex-col gap-3 pr-10 pb-5">
                    <div className="flex items-center">
                      <h6 className="">Responsável Pela Coleta:</h6>
                    </div>
                    <div className="flex flex-col justify-between gap-2 items-start w-full">
                      <User
                        name={form.watch(`responsibleForCollecting.name`)}
                        description="Nome"
                        classNames={{
                          name: "text-base",
                          description: "text-sm",
                        }}
                        avatarProps={{
                          className: "hidden",
                        }}
                      />
                      <User
                        name={form.watch(
                          `responsibleForCollecting.phoneNumber`
                        )}
                        description="Telefone"
                        classNames={{
                          name: "text-base",
                          description: "text-sm",
                        }}
                        avatarProps={{
                          className: "hidden",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </CardBody>
        ) : (
          <CardBody className="flex flex-col sm:flex-row gap-3 justify-between">
            <AddressPicker
              onOpen={onOpen}
              onListOpen={onListOpen}
              setSelected={setSelected}
              selected={selected}
            />
          </CardBody>
        )}
      </Card>
      <CollectModal
        form={form}
        addressType={addressType}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        setEdited={setEdited}
      />
      <ListModal
        form={form}
        addressType={addressType}
        isOpen={isListOpen}
        onOpen={onListOpen}
        onOpenChange={onOpenListChange}
        setEdited={setEdited}
      />
      <TitleModal
        form={form}
        addressType={addressType}
        isOpen={isTitleOpen}
        onOpen={onTitleOpen}
        onOpenChange={onTitleOpenChange}
        setEdited={setEdited}
      />
    </>
  );
}

export default AddressForm;
