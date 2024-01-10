import React from "react";
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

type AddressType = {
  number: string;
  street: string;
  complement?: string | undefined;
  city: string;
  state: string;
  neighborhood: string;
  postalCode: string;
  title?: string;
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

export default function CollectModal({
  form,
  addressType,
  isOpen,
  onOpen,
  onOpenChange,
  setEdited,
}: Props) {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const registerWithMask = useHookFormMask(form.register);
  const [country, setCountry] = React.useState("BR");
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };
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
    } else {
      close();
      const actualList = form.watch("addressList");
      // console.log(actualList)
      switch (addressType) {
        case "authorAddress":
          actualList[0] = 0;
          form.setValue("addressList", actualList);
          break;
        case "colectAddress":
          actualList[1] = 0;
          form.setValue("addressList", actualList);
          break;
        case "returnAddress":
          actualList[2] = 0;
          form.setValue("addressList", actualList);
          break;
      }
      setEdited((prevState) => ({ ...prevState, [addressType]: true }));
    }
  };
  // console.log(form.watch("addressList"));
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
              <ModalHeader className="flex flex-col gap-1">
                {mapTitles(addressType)}:
              </ModalHeader>
              <ModalBody className="grid grid-cols-1 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name={`${addressType}.postalCode`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          autoFocus
                          isRequired
                          label="CEP"
                          size="lg"
                          placeholder="CEP"
                          type="text"
                          classNames={{
                            input: "tracking-widest",
                          }}
                          {...field}
                          {...registerWithMask(
                            `${addressType}.postalCode`,
                            ["99999-999"],
                            {
                              required: true,
                              clearMaskOnLostFocus: true,
                              onChange: () =>
                                form.trigger(`${addressType}.postalCode`),
                            }
                          )}
                        />
                      </FormControl>
                      <FormMessage className="ml-2" />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name={`${addressType}.street`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          isRequired
                          label="Rua/Avenida"
                          size="lg"
                          placeholder="Rua/Avenida"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="ml-2" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${addressType}.number`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          isRequired
                          label="Nº"
                          size="lg"
                          placeholder="Nº"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="ml-2" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${addressType}.complement`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          label="Complemento"
                          placeholder="Complemento"
                          type="text"
                          size="lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="ml-2" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${addressType}.city`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          isRequired
                          label="Cidade"
                          size="lg"
                          placeholder="Cidade"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="ml-2" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${addressType}.state`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          isRequired
                          label="Estado"
                          size="lg"
                          placeholder="Estado"
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
                  name={`${addressType}.neighborhood`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          isRequired
                          label="Bairro"
                          size="lg"
                          placeholder="Bairro"
                          type="select"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="ml-2" />
                    </FormItem>
                  )}
                />
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
                <Button color="primary" onPress={() => handleSave(onClose)}>
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
