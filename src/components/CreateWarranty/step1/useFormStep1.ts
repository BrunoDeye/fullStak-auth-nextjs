import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { validate } from "validation-br/dist/cpf";
import { validate as validateCNPJ } from "validation-br/dist/cnpj";
import * as z from "zod";

const AddressDefaultValues = {
  street: "",
  number: "",
  complement: "",
  city: "",
  state: "",
  neighborhood: "",
  postalCode: "",
  title: "",
};

const formBaseSchemaStep1 = z.object({
  
  email: z
    .string()
    .min(1, { message: "Por favor preencher esse campo" })
    .email({ message: "Email inválido" }),
  name: z
    .string()
    .min(1, { message: "Por favor preencher esse campo" })
    .min(4, {
      message: "Seu nome deve conter pelo menos 4 caracteres.",
    }),
  phoneNumber: z
    .string()
    .transform((arg) => arg.replace(/[-()]/g, ""))
    .pipe(
      z
        .string()
        .regex(/^\+\d+$/)
        .min(1, { message: "Por favor preencher esse campo" })
    ),
  authorAddress: z.object({
    street: z
      .string()
      .min(4, { message: "Deve conter pelo menos 4 caracteres." }),
    number: z
      .string({
        errorMap: (issue, ctx) => ({
          message: "Por favor preencher esse campo.",
        }),
      })
      .regex(/^\d+$/),
    complement: z.string().optional().or(z.literal("")),
    city: z
      .string({ required_error: "Campo obrigatório" })
      .trim()
      .min(1, { message: "Por favor preencher esse campo" })
      .min(3, { message: "Deve conter pelo menos 3 caracteres." }),
    state: z
      .string({ required_error: "Campo obrigatório" })
      .trim()
      .min(1, { message: "Por favor preencher esse campo" })
      .min(2, { message: "Deve conter 2 caracteres." })
      .max(2, { message: "Deve conter 2 caracteres." }),
    neighborhood: z
      .string({ required_error: "Campo obrigatório" })
      .trim()
      .min(1, { message: "Por favor preencher esse campo" })
      .min(4, { message: "Deve conter pelo menos 4 caracteres." }),
    postalCode: z
      .string({ required_error: "Campo obrigatório" })
      .trim()
      .transform((arg) => arg.replace(/[-_]/g, ""))
      .pipe(
        z
          .string()
          .min(1, { message: "Por favor preencher esse campo" })
          .min(8, { message: "Deve conter 8 dígitos." })
          .max(8, { message: "Deve conter 8 dígitos." })
      ),
    title: z.string({ required_error: "Campo obrigatório" }).optional(),
  }),
  colectAddress: z.object({
    title: z.string({ required_error: "Campo obrigatório" }).optional(),
    street: z
      .string()
      .min(1, { message: "Por favor preencher esse campo" })
      .min(4, { message: "Deve conter pelo menos 4 caracteres." }),
    number: z
      .string({
        errorMap: (issue, ctx) => ({
          message: "Por favor preencher esse campo.",
        }),
      })
      .regex(/^\d+$/),
    complement: z.string().optional().or(z.literal("")),
    city: z
      .string({ required_error: "Campo obrigatório" })
      .trim()
      .min(1, { message: "Por favor preencher esse campo" })
      .min(3, { message: "Deve conter pelo menos 3 caracteres." }),
    state: z
      .string({ required_error: "Campo obrigatório" })
      .trim()
      .min(1, { message: "Por favor preencher esse campo" })
      .min(2, { message: "Deve conter 2 caracteres." })
      .max(2, { message: "Deve conter 2 caracteres." }),
    neighborhood: z
      .string({ required_error: "Campo obrigatório" })
      .trim()
      .min(1, { message: "Por favor preencher esse campo" })
      .min(4, { message: "Deve conter pelo menos 4 caracteres." }),
    postalCode: z
      .string({ required_error: "Campo obrigatório" })
      .trim()
      .transform((arg) => arg.replace(/[-_]/g, ""))
      .pipe(
        z
          .string()
          .min(1, { message: "Por favor preencher esse campo" })
          .min(8, { message: "Deve conter 8 dígitos." })
          .max(8, { message: "Deve conter 8 dígitos." })
      ),
    
  }),
  returnAddress: z.object({
    title: z.string({ required_error: "Campo obrigatório" }).optional(),
    street: z
      .string()
      .min(1, { message: "Por favor preencher esse campo" })
      .min(4, { message: "Deve conter pelo menos 4 caracteres." }),
    number: z
      .string({
        errorMap: (issue, ctx) => ({
          message: "Por favor preencher esse campo.",
        }),
      })
      .regex(/^\d+$/),
    complement: z.string().optional().or(z.literal("")),
    city: z
      .string({ required_error: "Campo obrigatório" })
      .trim()
      .min(1, { message: "Por favor preencher esse campo" })
      .min(3, { message: "Deve conter pelo menos 3 caracteres." }),
    state: z
      .string({ required_error: "Campo obrigatório" })
      .trim()
      .min(1, { message: "Por favor preencher esse campo" })
      .min(2, { message: "Deve conter 2 caracteres." })
      .max(2, { message: "Deve conter 2 caracteres." }),
    neighborhood: z
      .string({ required_error: "Campo obrigatório" })
      .trim()
      .min(1, { message: "Por favor preencher esse campo" })
      .min(4, { message: "Deve conter pelo menos 4 caracteres." }),
    postalCode: z
      .string({ required_error: "Campo obrigatório" })
      .trim()
      .transform((arg) => arg.replace(/[-_]/g, ""))
      .pipe(
        z
          .string()
          .min(1, { message: "Por favor preencher esse campo" })
          .min(8, { message: "Deve conter 8 dígitos." })
          .max(8, { message: "Deve conter 8 dígitos." })
      ),
    
  }),
  responsibleForCollecting: z.object({
    name: z.string().optional().or(z.literal("")),
    phoneNumber: z
      .string()
      .regex(/^\+\d+$/)
      .optional()
      .or(z.literal("")),
  }),
  addressList: z.array(z.coerce.number().gte(0)).length(3),
});

const CpfObject = z.object({
  cpf: z
    .string()
    .min(1, { message: "Por favor preencher esse campo" })
    .refine(validate, {
      message: "Cpf inválido.",
    }),
});

const CnpjObject = z.object({
  cnpj: z
    .string()
    .min(1, { message: "Por favor preencher esse campo" })
    .refine(validateCNPJ, {
      message: "Cnpj inválido.",
    }),
});

const formCpfSchemaStep1 = formBaseSchemaStep1.and(CpfObject);
const formCpnjSchemaStep1 = formBaseSchemaStep1.and(CnpjObject);

export type FormStep1Type = z.infer<
  typeof formCpfSchemaStep1 | typeof formCpnjSchemaStep1
>;

function useFormStep1(formType: "cpf" | "cnpj" = "cpf") {
  const formStep1 = useForm<FormStep1Type>({
    resolver: zodResolver(
      formType === "cpf" ? formCpfSchemaStep1 : formCpnjSchemaStep1
    ),
    reValidateMode: "onChange",
    criteriaMode: "all",

    defaultValues: {
      email: "",
      name: "",
      cpf: "",
      phoneNumber: "",
      authorAddress: {
        ...AddressDefaultValues,
      },
      colectAddress: {
        ...AddressDefaultValues,
      },
      returnAddress: {
        ...AddressDefaultValues,
      },
      responsibleForCollecting: {
        name: "",
        phoneNumber: "",
      },
      addressList: [-1, -1, -1],
    },
  });

  return formStep1;
}

export default useFormStep1;
