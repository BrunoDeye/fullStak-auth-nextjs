import React from 'react'
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
} from "@nextui-org/react";
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
import { CountrySelect } from './CountrySelect';
import { UseFormReturn } from 'react-hook-form';
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
} from "@nextui-org/react";


type AddressType = {
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
      cpf: string;
      phoneNumber: string;
      authorAddress: AddressType;
      colectAddress: AddressType;
      returnAddress: AddressType;
      responsibleForCollecting: ResponsibleType;
    },
    any,
    undefined
  >;
};

function CollectCard({ form }: Props) {
  const [country, setCountry] = React.useState("BR");
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };

  const PhoneNumberInput = () =>  {
    const NewInput = Input;
    NewInput.defaultProps = { label: "Telefone", placeholder: "Telefone"}

    return NewInput
  }
  return (
    <div className="flex justify-between items-center space-x-3 w-1/2">
    <Divider orientation="vertical" />
    <h6 className="pl-6">Responsável Pela Coleta:</h6>

    <FormField
      control={form.control}
      name={`responsibleForCollecting.name`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              classNames={{inputWrapper: "min-h-[56px]"}}
              label="Nome"
              size="sm"
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
                  inputComponent={PhoneNumberInput()}
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
    </div>
  )
}

export default CollectCard