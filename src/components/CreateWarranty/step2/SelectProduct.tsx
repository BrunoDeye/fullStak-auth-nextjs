import { products } from "./products";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  MenuTriggerAction,
} from "@nextui-org/autocomplete";
import { useFilter } from "@react-aria/i18n";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FormProductsType } from "./useFormProducts";

type Props = {
  isDisabled: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<FormProductsType, any, undefined>;
};

export default function SelectProduct({
  isDisabled,
  setIsOpen,
  form,
}: Props) {
  // Store Autocomplete input value, selected option, open state, and items
  // in a state tracker
  const [productsData, setProductsData] = useState(
    products["hybrid"].map((item) => ({
      value: item.toUpperCase(),
      label: item,
    }))
  );

  const productKey = useMemo(() => form.watch("type"), [form.watch("type")]);

  useEffect(() => {
    if (productKey) {
      const setProducts = products[productKey].map((item) => ({
        value: item.toUpperCase(),
        label: item,
      }));
      setProductsData(setProducts);
    }
  }, [productKey]);

  // Implement custom filtering logic and control what items are
  // available to the Autocomplete.

  // Specify how each of the Autocomplete values should change when an
  // option is selected from the list box

  // Specify how each of the Autocomplete values should change when the input
  // field is altered by the user

  // Show entire list if user opens the menu manually
  const onOpenChange = (isOpen: boolean, menuTrigger: MenuTriggerAction) => {
    if (isOpen) {
      setIsOpen(true);
    } else {
      setTimeout(() => setIsOpen(false), 10);
    }
  };

  return (
    <>
      <FormField
        control={form.control}
        name="model"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Autocomplete
                className="max-sm:min-w-full max-w-xs"
                defaultItems={products["hybrid"].map((item) => ({
                  value: item.toUpperCase(),
                  label: item,
                }))}
                items={productsData}
                autoFocus={false}
                label="Produtos"
                isRequired
                isDisabled={isDisabled}
                placeholder="Procure um produto"
                listboxProps={{ emptyContent: "Produto não encontrado" }}
                inputProps={{ autoFocus: false }}
                onOpenChange={onOpenChange}
                selectedKey={field.value || ""}
                onSelectionChange={field.onChange}
              >
                {(item) => (
                  <AutocompleteItem key={item.value}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* <Autocomplete
        className="max-sm:min-w-full max-w-xs"
        defaultItems={products["hybrid"].map((item) => ({
          value: item.toLowerCase(),
          label: item,
        }))}
        autoFocus={false}
        label="Produtos"
        isDisabled={isDisabled}
        placeholder="Procure um produto"
        listboxProps={{ emptyContent: "Produto não encontrado" }}
        inputProps={{ autoFocus: false }}
        onOpenChange={onOpenChange}
        selectedKey={fieldState.selectedKey}
        onSelectionChange={onSelectionChange}
      >
        {(item) => (
          <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete> */}
    </>
  );
}
