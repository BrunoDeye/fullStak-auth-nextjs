import { TestsIds } from "@/types/testsIds";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";


const formSchemaStep3 = z.object({
  products: z.array(
    z.object({
      hybridFiles: z.array(
        z.object({
          content: typeof window === "undefined" ? z.any() : z.instanceof(File, { message: "Faça upload do arquivo requisitado." }),
          code: z.number()
        }).optional()
      ),
      microFiles: z.array(
        z.object({
          content: typeof window === "undefined" ? z.any() : z.instanceof(File, { message: "Faça upload do arquivo requisitado." }),
          code: z.number()
        }).optional()
      ),
      stringFiles: z.array(
        z.object({
          content: typeof window === "undefined" ? z.any() : z.instanceof(File, { message: "Faça upload do arquivo requisitado." }),
          code: z.number()
        }).optional()
      ),
    })
  ),
});

export type FormStep3Type = z.infer<typeof formSchemaStep3>;

export type ProductForm3Values = z.infer<typeof formSchemaStep3>;


function useFormStep3() {
  const formStep3 = useForm<FormStep3Type>({
    resolver: zodResolver(formSchemaStep3),
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true
  });

  return formStep3;
}

export default useFormStep3;
