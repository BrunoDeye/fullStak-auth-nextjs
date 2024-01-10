import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Image,
  Divider,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { CountrySelect } from "./CountrySelect";
import { useHookFormMask } from "use-mask-input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import br from "react-phone-number-input/locale/pt-BR.json";
import PhoneInput, {
  getCountryCallingCode,
} from "react-phone-number-input/input";
import { UseFormReturn } from "react-hook-form";
import { PhoneNumberInput } from "./Step1";
import { mapTitles } from "../utils/mapPickerTitles";
import { Backend_URL } from "@/lib/Constants";
import { useSession } from "next-auth/react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { BsHouse, BsHouseFill } from "react-icons/bs";

export type AddressType = {
  number: string;
  street: string;
  complement?: string | undefined;
  city: string;
  state: string;
  neighborhood: string;
  postalCode: string;
};

type ResponsibleType = {
  name?: string | undefined;
  phoneNumber?: string | undefined;
};

type Props = {
  form: UseFormReturn<
    {
      name: string;
      email: string;
      phoneNumber: string;
      authorAddress: AddressType;
      colectAddress: AddressType;
      returnAddress: AddressType;
      responsibleForCollecting: ResponsibleType;
      addressList: number[];
    } & ({ cpf: string } | { cnpj: string }),
    any,
    undefined
  >;
  addressType: "authorAddress" | "colectAddress" | "returnAddress";
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  setEdited: React.Dispatch<
    React.SetStateAction<{
      authorAddress: boolean;
      colectAddress: boolean;
      returnAddress: boolean;
    }>
  >;
};

export default function ListModal({
  form,
  addressType,
  isOpen,
  onOpen,
  onOpenChange,
  setEdited,
}: Props) {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState("0");
  const registerWithMask = useHookFormMask(form.register);
  const [country, setCountry] = React.useState("BR");
  const [addresses, setAddresses] = React.useState<
    | (AddressType & {
        title: string;
        isPrimary: boolean;
        id: number;
      })[]
    | never[]
  >([]);
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };
  const { data: Session, update } = useSession();
  const handleSave = async (close: () => void) => {
    form.clearErrors();
    await form.trigger([
      `${addressType}.postalCode`,
      `${addressType}.street`,
      `${addressType}.number`,
      `${addressType}.complement`,
      `${addressType}.city`,
      `${addressType}.state`,
      `${addressType}.neighborhood`,
    ]);

    if (Object.keys(form.formState.errors).length !== 0) {
      console.log(form.formState.errors);
      setSelected("0");
    } else {
      close();
      const actualList = form.watch("addressList");
      // console.log(actualList)
      switch (addressType) {
        case "authorAddress":
          actualList[0] = +selected;
          form.setValue("addressList", actualList);
          break;
        case "colectAddress":
          actualList[1] = +selected;
          form.setValue("addressList", actualList);
          break;
        case "returnAddress":
          actualList[2] = +selected;
          form.setValue("addressList", actualList);
          break;
      }
      setEdited((prevState) => ({ ...prevState, [addressType]: true }));
    }
  };
  // console.log(form.watch("addressList"));
  const [isSessionLoaded, setIsSessionLoaded] = React.useState(false);
  useEffect(() => {
    if (Session && Session.user.sub && !isSessionLoaded) {
      const getAdresses = async () => {
        if (Session) {
          // const session = await update();
          // console.log(Session?.backendTokens.accessToken + "oisafasfafa");
          const addressesList = await fetch(Backend_URL + "/address", {
            method: "GET",
            headers: {
              authorization: `Bearer ${Session?.backendTokens.accessToken}`,
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              return data;
            })
            .catch((error) => {
              console.error("Error uploading files:", error);
            });
          setAddresses(addressesList || []);
          setIsSessionLoaded(true);
        }
      };
      getAdresses();
    }
  }, [Session]);

  useEffect(() => {
    const actualList = form.watch("addressList");
    // console.log(actualList)
    switch (addressType) {
      case "authorAddress":
        if (actualList[0] > 0) setSelected(`${actualList[0]}`);
        else setSelected("0");
        break;

      case "colectAddress":
        if (actualList[1] > 0) setSelected(`${actualList[1]}`);
        else setSelected("0");
        break;
      case "returnAddress":
        if (actualList[2] > 0) setSelected(`${actualList[2]}`);
        else setSelected("0");
        break;
    }
  }, [form.watch("addressList")]);

  return (
    <>
      {/* <Button onPress={onOpen} color="primary">
        Editar
      </Button> */}
      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">
                {mapTitles(addressType)}:
              </ModalHeader>
              <ModalBody className="grid grid-cols-1 ">
                <RadioGroup
                  orientation="vertical"
                  classNames={{
                    wrapper: "w-full min-w-full max-w-full ",
                    base: "w-full min-w-full max-w-full ",
                  }}
                  value={selected}
                  onValueChange={(value) => {
                    setSelected(value);
                  }}
                >
                  <h3 >Lista de Endereços</h3>
                  <p className="mb-3">Escolha um endereço da lista a seguir:

                  </p>
                  {Array.isArray(addresses) &&
                  typeof addresses.map === "function" &&
                  addresses.length !== 0
                    ? addresses.map(
                        (
                          address: AddressType & {
                            title: string;
                            isPrimary: boolean;
                            id: number;
                          },
                          index
                        ) => (
                          <div
                            className="relative"
                            key={`${address.postalCode}-${index}`}
                          >
                            <Radio
                              className="data-[selected=true]:bg-blue-200 hover:bg-sky-50 border-blue-200 data-[selected=true]:border-blue-400 border-2 w-full flex-row-reverse  justify-between min-w-full max-w-full gap-2 rounded-lg p-5"
                              value={`${address.id}`}
                            >
                              <div className="min-w-full">
                                <h4 className="flex items-center justify-between">
                                  {address.title || address.street}{" "}
                                </h4>
                                <p>
                                  <strong>Logradouro: </strong> {address.street}
                                </p>
                                <p>
                                  <strong>Bairro: </strong>{" "}
                                  {address.neighborhood}
                                </p>
                                <p>
                                  <strong>CEP: </strong>
                                  {address.postalCode}
                                </p>
                                <p>
                                  <strong>Cidade: </strong> {address.city}
                                </p>
                              </div>
                            </Radio>
                            {address.isPrimary ? (
                              <div className="absolute top-2 right-5 z-50">
                                <BsHouseFill height={25} width={25} />
                              </div>
                            ) : null}
                          </div>
                        )
                      )
                    : null}
                </RadioGroup>
                {addressType === "colectAddress" ? (
                  <>
                    <div className="flex items-center col-span-full py-3">
                      <h6 className="pl-6">Responsável Pela Coleta:</h6>
                    </div>
                    <FormField
                      control={form.control}
                      name={`responsibleForCollecting.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              classNames={{ inputWrapper: "min-h-[56px]" }}
                              label="Nome"
                              size="lg"
                              placeholder="Nome"
                              type="select"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="ml-2" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`responsibleForCollecting.phoneNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-3 max-[340px]:flex-col">
                            <div className="">
                              <CountrySelect
                                labels={br}
                                value={country}
                                onChange={handleSelectionChange}
                              />
                            </div>

                            <div className="w-full">
                              <FormControl>
                                <PhoneInput
                                  autoComplete="on"
                                  id="phoneNumber"
                                  type={"text"}
                                  inputComponent={PhoneNumberInput({
                                    label: "Telefone",
                                    placeholder: "Telefone",
                                    size: "lg",
                                  })}
                                  required
                                  country={country as any}
                                  aria-required
                                  {...field}
                                />
                              </FormControl>
                            </div>
                          </div>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                ) : null}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Fechar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    const addressSelected = addresses.find(
                      (
                        address: AddressType & {
                          title: string;
                          isPrimary: boolean;
                          id: number;
                        }
                      ) => address.id === +selected
                    );

                    form.setValue(
                      `${addressType}.postalCode`,
                      addressSelected!.postalCode as any
                    );
                    form.setValue(
                      `${addressType}.street`,
                      addressSelected!.street as any
                    );
                    form.setValue(
                      `${addressType}.number`,
                      addressSelected!.number as any
                    );
                    form.setValue(
                      `${addressType}.complement`,
                      addressSelected!.complement as any
                    );
                    form.setValue(
                      `${addressType}.city`,
                      addressSelected!.city as any
                    );

                    form.setValue(
                      `${addressType}.state`,
                      addressSelected!.state as any
                    );
                    form.setValue(
                      `${addressType}.neighborhood`,
                      addressSelected!.neighborhood as any
                    );
                    handleSave(onClose);
                  }}
                >
                  Salvar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
