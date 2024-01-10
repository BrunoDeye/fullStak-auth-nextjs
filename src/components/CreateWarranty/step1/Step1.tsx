"use client";
import React from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  InputProps,
} from "@nextui-org/react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, FormProps, UseFormReturn } from "react-hook-form";
import br from "react-phone-number-input/locale/pt-BR.json";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useHookFormMask } from "use-mask-input";
import { validate } from "validation-br/dist/cpf";
import AddressForm from "./AddressForm";
import AddressPicker from "./AddressPicker";
import PhoneInput from "react-phone-number-input/input";
import { CountrySelect } from "./CountrySelect";
import useFormStep1, { FormStep1Type } from "./useFormStep1";
import { useParams } from "next/navigation";

export const PhoneNumberInput = (props: InputProps) => {
  const NewInput = Input;
  NewInput.defaultProps = {
    ...props,
  };

  return NewInput;
};

type Props = {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  formStep1: UseFormReturn<FormStep1Type, any, undefined>;
  setIsForm1Complete: React.Dispatch<React.SetStateAction<boolean>>;
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

function Step1({
  setSelected,
  formStep1,
  edited,
  setEdited,
  setIsForm1Complete,
  setShouldSaveAddress,
  shouldSaveAddress,
}: Props) {
  const [country, setCountry] = React.useState<string | undefined>("BR");
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value || undefined);
  };
  const { userType } = useParams();

  const registerWithMask = useHookFormMask(formStep1.register);

  async function onStep1Submit(values: FormStep1Type) {
    setIsForm1Complete(true);
    setSelected("step-2");
  }

  function onStep1Errors() {
    console.log(formStep1.formState.errors);
  }

  return (
    <Form {...formStep1}>
      <form
        onSubmit={formStep1.handleSubmit(onStep1Submit, onStep1Errors)}
        className="flex flex-col justify-between gap-4 min-h-[61vh]"
      >
        <div className="space-y-4">
          <div className="max-md:flex max-md:flex-wrap max-md:flex-col md:grid-cols-2 md:grid lg:grid-cols-5 gap-5">
            <FormField
              control={formStep1.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      isRequired
                      label="Email"
                      size="lg"
                      placeholder="Seu email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />

            <FormField
              control={formStep1.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      isRequired
                      label="Nome"
                      size="lg"
                      placeholder="Seu nome"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />

            {userType === "pessoa-fisica" ? (
              <FormField
                control={formStep1.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        isRequired
                        label="CPF"
                        type="text"
                        size="lg"
                        placeholder="___.___.___-__"
                        classNames={{
                          input: "tracking-widest",
                        }}
                        {...field}
                        {...registerWithMask("cpf", ["999.999.999-99"], {
                          required: true,
                          
                        })}
                      />
                    </FormControl>
                    <FormMessage className="ml-2" />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={formStep1.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        isRequired
                        label="CNPJ"
                        type="text"
                        size="lg"
                        classNames={{
                          input: "tracking-widest",
                        }}
                        placeholder="__.___.___/____-__"
                        {...field}
                        {...registerWithMask("cnpj", ["99.999.999/9999-99"], {
                          required: true,
                          
                        })}
                      />
                    </FormControl>
                    <FormMessage className="ml-2" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={formStep1.control}
              name={`phoneNumber`}
              render={({ field }) => (
                <FormItem className="lg:col-span-2">
                  <div className="flex gap-3 max-[330px]:flex-col">
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
                            placeholder: "Digite o telefone",
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
          </div>
          {/* <AddressPicker />
        <AddressPicker />
        <AddressPicker /> */}
          <AddressForm
            edited={edited}
            setEdited={setEdited}
            form={formStep1}
            addressType="authorAddress"
            setShouldSaveAddress={setShouldSaveAddress}
            shouldSaveAddress={shouldSaveAddress}
          />
          <AddressForm
            edited={edited}
            setEdited={setEdited}
            form={formStep1}
            addressType="colectAddress"
            setShouldSaveAddress={setShouldSaveAddress}
            shouldSaveAddress={shouldSaveAddress}
          />
          <AddressForm
            edited={edited}
            setEdited={setEdited}
            form={formStep1}
            addressType="returnAddress"
            setShouldSaveAddress={setShouldSaveAddress}
            shouldSaveAddress={shouldSaveAddress}
          />
        </div>
        <div className="flex mt-auto gap-2 justify-center ">
          <Button color="primary" type="submit">
            Confirmar
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default Step1;
