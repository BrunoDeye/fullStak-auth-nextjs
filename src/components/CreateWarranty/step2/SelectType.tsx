import React from "react";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FormStep2Type } from "./useFormStep2";
import { FormProductsType } from "./useFormProducts";

type Props = {
  isDisabled: boolean;
  form: UseFormReturn<FormProductsType, any, undefined>;
};

export const mapTypes = {
  hybrid: "Híbrido",
  string: "String",
  micro: "Micro",
};

export default function SelectType({ isDisabled, form }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <FormField
      
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem  className="space-y-3">
            <FormControl >
              <RadioGroup
                label="Tipo de Inversor"
                onValueChange={field.onChange}
                // @ts-ignore
                isRequired
                isDisabled={isDisabled}
                value={field.value || ''}
                className="flex flex-col space-y-1"
                orientation="horizontal"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <Radio value="hybrid">Híbrido</Radio>
                  </FormControl>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <Radio value="string">String</Radio>
                  </FormControl>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <Radio value="micro">Micro</Radio>
                  </FormControl>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
