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

export default function TitleModal({
  form,
  addressType,
  isOpen,
  onOpen,
  onOpenChange,
}: Props) {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
 
 
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
        hideCloseButton
        isDismissable={false}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Título para {mapTitles(addressType)}:
              </ModalHeader>
              <ModalBody className="grid grid-cols-1">
                
                  <>
                    
                    <FormField
                      control={form.control}
                      name={`${addressType}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              classNames={{ inputWrapper: "min-h-[56px]" }}
                              label="Título"
                              size="lg"
                              placeholder=""
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="ml-2" />
                        </FormItem>
                      )}
                    />
                    
                  </>
              </ModalBody>
              <ModalFooter>
                <Button isDisabled={!form.watch(`${addressType}.title`)} color="primary" onPress={onClose}>
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
