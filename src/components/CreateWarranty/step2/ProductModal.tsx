import React, { useEffect, useState } from "react";
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
  Textarea,
} from "@nextui-org/react";
import { CountrySelect } from "../step1/CountrySelect";
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
import { PhoneNumberInput } from "../step1/Step1";
import SelectType, { mapTypes } from "./SelectType";
import SelectProduct from "./SelectProduct";
import SelectAlert from "./SelectAlert";
import { Product } from "./productsTable/ProductsTable";
import { FormStep2Type } from "./useFormStep2";
import { FormProductsType } from "./useFormProducts";

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
  form: UseFormReturn<FormProductsType, any, undefined>;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  productList: Product[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>;
  setIsEditId: React.Dispatch<React.SetStateAction<number>>;
  isEditId: number;
};

export default function ProductModal({
  form,
  isOpen,
  onOpen,
  onOpenChange,
  productList,
  setProductList,
  setIsEditId,
  isEditId,
}: Props) {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [alertList, setAlertList] = useState([""]);

  const resetProductsFields = () => {
    [`type`, `model`, `serialNumber`, `description`, `alert`].forEach((field) => form.resetField(field as any))
  }

  const handleSave = async (close: () => void) => {
    await form.trigger([`type`, `model`, `serialNumber`, `description`, `alert`]);

    if (Object.keys(form.formState.errors).length !== 0) {
      console.log(form.formState.errors);
    } else {
      const lastProduct = productList[productList.length - 1];
      const newProduct = {
        id: lastProduct.id + 1,
        model: form.watch("model"),
        serialNumber: form.watch("serialNumber"),
        type: form.watch("type"),
        description: form.watch("description"),
        alert: Array.from(form.watch("alert")),
      };

      if (isEditId !== 0) {
        const updatedProductList = productList.map((product) => {
          if (product.id === isEditId) {
            return {
              ...newProduct,
              id: isEditId,
            };
          }
          return product;
        });
        setProductList([...updatedProductList]);
        setIsEditId(0);
        resetProductsFields()
        close();
      } else if (newProduct.id === 1) {
        setProductList([newProduct]);
      } else {
        setProductList([...productList, newProduct]);
      }
      resetProductsFields()
      close();
    }
  };
  // console.log(productList);
  // console.log(form.watch("model"))

  const [isProductOpen, setIsProductOpen] = React.useState<boolean>(false);

  
  // console.log(alertList)
  return (
    <>
      {/* <Button onPress={onOpen} color="primary">
        Editar
      </Button> */}
      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() =>{ setIsEditId(0); resetProductsFields();  }}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Dados do Produto:
              </ModalHeader>
              <ModalBody className="grid grid-cols-1 sm:grid-cols-2 sm:items-center">
                <SelectType form={form} isDisabled={isProductOpen} />
                <SelectProduct
                  form={form}
                  setIsOpen={setIsProductOpen}
                  isDisabled={!form.watch("type")}
                />
                <FormField
                  control={form.control}
                  name="serialNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          isRequired
                          label="Nº de Série"
                          size="lg"
                          placeholder="S/N do Produto"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="ml-2" />
                    </FormItem>
                  )}
                />
                <SelectAlert form={form} setAlertList={setAlertList} />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormControl>
                        <Textarea
                          label="Breve Descrição"
                          size="lg"
                          classNames={{
                            label: "text-md",
                          }}
                          placeholder="Descreva com mais detalhes seu problema caso necessário"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="ml-2" />
                    </FormItem>
                  )}
                />
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
