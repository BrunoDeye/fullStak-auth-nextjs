"use client";
import React, { useEffect } from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  Textarea,
  useDisclosure,
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
import ProductsTable, { Product } from "./productsTable/ProductsTable";
import ProductModal from "./ProductModal";
import ProductsMobileTable from "./productsTable/ProductsMobileTable";
import { CountrySelect } from "../step1/CountrySelect";
import PhoneInput from "react-phone-number-input/input";
import { PhoneNumberInput } from "../step1/Step1";
import useFormStep2, { FormStep2Type } from "./useFormStep2";
import { FormProductsType } from "./useFormProducts";

export type ProductType = {
  id: number;
  model: string;
  serialNumber: string;
  type: string;
  description: string;
  alert: string[];
};

type Props = {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  formProducts: UseFormReturn<FormProductsType, any, undefined>;
  formStep2: UseFormReturn<FormStep2Type, any, undefined>;
  setIsForm2Complete: React.Dispatch<React.SetStateAction<boolean>>;
  productList: ProductType[];
  setProductList: React.Dispatch<React.SetStateAction<ProductType[]>>;
};

function Step2({ setSelected, formStep2, productList, setProductList, setIsForm2Complete, formProducts }: Props) {
  const [country, setCountry] = React.useState<string | undefined>("BR");
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value || undefined);
  };

  const registerWithMask = useHookFormMask(formStep2.register);

  async function onStep2Submit(values: FormStep2Type) {
    setIsForm2Complete(true)
    setSelected("step-3");
  }

  function onStep2Errors() {
    console.log()
    console.log(formStep2.formState.errors);
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isEditId, setIsEditId] = React.useState(0);
  const [deleteId, setDeleteId] = React.useState(0);

  // useEffect(() => {
  //   setProductList([...productList]);
  // }, [typeSelected]);]

  useEffect(() => {
    if (isEditId !== 0) {
      const productToEdit = productList.find(
        (product) => product.id === isEditId
      );
      console.log(productToEdit);
      if (productToEdit) {
        formProducts.setValue("description", productToEdit.description);
        formProducts.setValue("model", productToEdit.model);
        formProducts.setValue("serialNumber", productToEdit.serialNumber);
        formProducts.setValue("type", productToEdit.type as any);
        formProducts.setValue("alert", new Set(productToEdit.alert as any));
      } else {
        setIsEditId(0);
      }
    }
  }, [isEditId]);
  // console.log(productList)

  useEffect(() => {
    if (deleteId !== 0) {
      const updatedItems = productList.filter((item) => item.id !== deleteId);
      
      if (updatedItems.length === 0) {
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
      } else {
        const orderedUpdatedItems = updatedItems.map((item, index) => ({ ...item, id: index + 1}))
        setProductList(orderedUpdatedItems);
      }
      setDeleteId(0);
    }
  }, [deleteId]);

  // console.log(productList)
  return (
    <>
      <Form {...formStep2}>
        <form
          onSubmit={formStep2.handleSubmit(onStep2Submit, onStep2Errors)}
          className="flex flex-col space-y-6 min-h-[61vh] justify-between"
        >
          <div className="space-y-8">
            <div className="max-md:flex max-md:flex-wrap max-md:flex-col md:grid-cols-2 md:grid lg:grid-cols-5 gap-7">
              <FormLabel className="col-span-full font-bold mx-auto text-xl">
                Dados do(s) Produto(s)
              </FormLabel>
              <div className="col-span-full flex flex-col gap-5 justify-center">
                <div className="flex max-xl:flex-col max-sm:items-start w-full gap-5 justify-evenly items-center mb-2">
                  <ProductsTable
                    isEditId={isEditId}
                    setIsEditId={setIsEditId}
                    onOpen={onOpen}
                    products={productList}
                    handleDelete={setDeleteId}
                  />
                  <ProductsMobileTable
                    isEditId={isEditId}
                    setIsEditId={setIsEditId}
                    onOpen={onOpen}
                    products={productList}
                    handleDelete={setDeleteId}
                  />
                </div>

                <div className="flex justify-center">
                  <Button onClick={onOpen} color="success" variant="flat">
                    Adicionar Produto
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid space-y-6">
              <FormLabel className="col-span-full font-bold  mx-auto text-xl">
                Dados Complementares
              </FormLabel>
              <div className="col-span-full flex flex-col gap-5 justify-center mx-0 lg:mx-[10%]">
                <div className="max-md:flex max-md:flex-wrap max-md:flex-col md:grid-cols-2 md:grid lg:grid-cols-2 gap-5 mx-auto">
                  <FormField
                    control={formStep2.control}
                    name="distributor"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            isRequired
                            label="Distribuidora"
                            size="lg"
                            placeholder="Distribuidora"
                            type="text"
                            className="max-w-xs ml-auto"
                            
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formStep2.control}
                    name={`distributorPhoneNumber`}
                    render={({ field }) => (
                      <FormItem className="">
                        <div className="flex gap-3 max-[330px]:flex-col">
                          <div className="">
                            <CountrySelect
                              labels={br}
                              value={country}
                              onChange={handleSelectionChange}
                            />
                          </div>

                          <div className="w-full max-w-xs">
                            <FormControl>
                              <PhoneInput
                                autoComplete="on"
                                id="phoneNumber"
                                type={"text"}
                                inputComponent={PhoneNumberInput({
                                  label: "Tel. Distribuidora",
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
                  <FormField
                    control={formStep2.control}
                    name="integrator"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            isRequired
                            label="Integrador"
                            size="lg"
                            placeholder="Integrador"
                            type="text"
                            className="max-w-xs ml-auto"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formStep2.control}
                    name={`integratorPhoneNumber`}
                    render={({ field }) => (
                      <FormItem className="">
                        <div className="flex gap-3 max-[330px]:flex-col">
                          <div className="">
                            <CountrySelect
                              labels={br}
                              value={country}
                              onChange={handleSelectionChange}
                            />
                          </div>

                          <div className="w-full max-w-xs">
                            <FormControl>
                              <PhoneInput
                                autoComplete="on"
                                id="phoneNumber"
                                type={"text"}
                                inputComponent={PhoneNumberInput({
                                  label: "Tel. Integrador",
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

                  <FormField
                    control={formStep2.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            isRequired
                            label="Cliente Final"
                            size="lg"
                            placeholder="Cliente Final"
                            type="text"
                            className="max-w-xs ml-auto"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formStep2.control}
                    name={`clientPhoneNumber`}
                    render={({ field }) => (
                      <FormItem className="">
                        <div className="flex gap-3 max-[330px]:flex-col">
                          <div className="">
                            <CountrySelect
                              labels={br}
                              value={country}
                              onChange={handleSelectionChange}
                            />
                          </div>

                          <div className="w-full max-w-xs">
                            <FormControl>
                              <PhoneInput
                                autoComplete="on"
                                id="phoneNumber"
                                type={"text"}
                                inputComponent={PhoneNumberInput({
                                  label: "Tel. Cliente Final",
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
              </div>
            </div>
          </div>
          <div className="flex mt-10 gap-2 justify-center">
            <Button color="primary" type="submit">
              Confirmar
            </Button>
          </div>
          <ProductModal
            form={formProducts}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            productList={productList}
            setProductList={setProductList}
            setIsEditId={setIsEditId}
            isEditId={isEditId}
          />
        </form>
      </Form>
    </>
  );
}

export default Step2;
