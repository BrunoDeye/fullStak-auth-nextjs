import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchemaStep2 = z.object({
  // type: z.enum(["hybrid", "string", "micro"], {
  //   required_error: "Você precisa selecionar um tipo de inversor.",
  // }),
  // model: z
  //   .string({
  //     required_error: "Por favor selecione um modelo de inversor.",
  //   })
  //   .trim()
  //   .min(1, { message: "Por favor selecione um modelo de inversor." }),
  // serialNumber: z
  //   .string()
  //   .regex(/^\d+$/, {
  //     message: "Por favor preencher esse campo.",
  //   })
  //   .min(1, { message: "Por favor preencher esse campo." }),
  // description: z.string(),
  // alert: z.set(z.string()).min(1),
  distributor: z.string(),
  distributorPhoneNumber: z.string(),
  integrator: z.string(),
  integratorPhoneNumber: z.string(),
  client: z.string(),
  clientPhoneNumber: z.string(),
});

export type FormStep2Type = z.infer<typeof formSchemaStep2>;

function useFormStep2() {
  const formStep2 = useForm<FormStep2Type>({
    resolver: zodResolver(formSchemaStep2),
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      distributor: "",
      distributorPhoneNumber: "",
      integrator: "",
      integratorPhoneNumber: "",
      client: "",
      clientPhoneNumber: "",
    },
  });

  return formStep2;
}

export default useFormStep2;
