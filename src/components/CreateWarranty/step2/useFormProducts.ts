import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchemaProducts = z.object({
  type: z.enum(["hybrid", "string", "micro"], {
    required_error: "Você precisa selecionar um tipo de inversor.",
  }),
  model: z
    .string({
      required_error: "Por favor selecione um modelo de inversor.",
    })
    .trim()
    .min(1, { message: "Por favor selecione um modelo de inversor." }),
  serialNumber: z
    .string()
    .regex(/^\d+$/, {
      message: "Por favor preencher esse campo.",
    })
    .min(1, { message: "Por favor preencher esse campo." }),
  description: z.string(),
  alert: z.set(z.string()).min(1),
});

export type FormProductsType = z.infer<typeof formSchemaProducts>;

function useFormProducts() {
  const formProducts = useForm<FormProductsType>({
    resolver: zodResolver(formSchemaProducts),
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      model: "",
      serialNumber: "",
      description: "",
    },
  });

  return formProducts;
}

export default useFormProducts;
