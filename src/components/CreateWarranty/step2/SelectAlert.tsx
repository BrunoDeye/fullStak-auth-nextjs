import { Alerts, alerts, mapAlerts } from "./alerts";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  MenuTriggerAction,
} from "@nextui-org/autocomplete";
import { useFilter } from "@react-aria/i18n";

type Props = {
  setAlertList: React.Dispatch<React.SetStateAction<string[]>>;
  form: UseFormReturn<FormProductsType, any, undefined>;
};

import {
  Select,
  SelectItem,
  Avatar,
  Chip,
  SelectedItems,
  Button,
} from "@nextui-org/react";
import { XIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem } from "@/components/ui/form";
import { FormStep2Type } from "./useFormStep2";
import { FormProductsType } from "./useFormProducts";

type User = {
  value: string;
  label: string;
};

export default function SelectAlert({ setAlertList, form }: Props) {

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>, formHandle: any) => {
    const filterEmpty = e.target.value.split(",").filter((item) => item !== "" )
    formHandle(new Set(filterEmpty) as never);
  };

  useEffect(() => {
    setAlertList(Array.from(form.watch("alert") as never || new Set()).filter((item) => item !== "" ) as string[]);
  }, [form.watch("alert")]);
  const handleRemove = (value: any) => {
    const newArray = Array.from(form.watch("alert") as never);

    // Remove the specified value from the array
    const indexToRemove = newArray.indexOf(value);
    if (indexToRemove !== -1) {
      newArray.splice(indexToRemove, 1);
    }

    // Create a new Set from the modified array
    form.setValue("alert", new Set(newArray) as never);
  };
  return (
    <FormField
      control={form.control}
      name="alert"
      render={({ field }) => (
        <FormItem>
          <Select
            items={alerts.map((item: Alerts) => ({
              value: mapAlerts[item.toUpperCase() as Alerts],
              label: item,
            }))}
            as="div"
            size="lg"
            label="Alertas"
            isMultiline={true}
            selectedKeys={field.value as never || new Set() as never}
            onChange={(e) =>{ handleSelectionChange(e, field.onChange); }}
            
            selectionMode="multiple"
            placeholder="Selecione um alerta"
            isRequired
            className="max-sm:min-w-full max-w-xs cursor-pointer"
            classNames={{
              label: "text-md",
              base: "max-w-xs",
            }}
            renderValue={(items: SelectedItems<User>) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip
                      className="py-4"
                      as="div"
                      endContent={
                        <Button
                          onClick={() => handleRemove(item.data!.value)}
                          isIconOnly
                          size="sm"
                          radius="full"
                          className="leading-none"
                          variant="solid"
                        >
                          <XIcon size="15px" />
                        </Button>
                      }
                      key={item.key}
                    >
                      {item.data!.label}
                    </Chip>
                  ))}
                </div>
              );
            }}
          >
            {(item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                textValue={item.label}
              >
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <span className="">{item.label}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </FormItem>
      )}
    />
  );
}
