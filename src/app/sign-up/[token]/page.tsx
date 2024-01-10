"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Backend_URL } from "@/lib/Constants";
import Link from "next/link";
import React, { useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import DeyeImage from "@/../../public/deye8.png";
import { useWindowSize } from "@uidotdev/usehooks";

type FormInputs = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

type Props = {
  params: {
    token: string;
  };
};

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Nome menor que 2 caracteres",
    }),
    lastName: z.string().min(2, {
      message: "Sobrenome menor que 2 caracteres",
    }),
    email: z.string().email({ message: "Formato de email incorreto" }),
    // phoneNumber: z.string(),
    password: z.string().min(6, {
      message: "Senha menor que 6 digitos",
    }),
    confirmPassword: z.string().min(6, {
      message: "Senha menor que 6 digitos",
    }),
    // terms: z.literal<boolean>(true, {
    //   errorMap: (issue, _ctx) => {
    //     switch (issue.code) {
    //       default:
    //         return {
    //           message: "Por favor, aceite os termos para continuar.",
    //         };
    //     }
    //   },
    // }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem.",
        path: ["confirmPassword"],
      });
    }
  });

function SignupPage(props: Props) {
  const size = useWindowSize()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const register = async (values: z.infer<typeof formSchema>) => {
    const { name, lastName, password, email } = values;
    const res = await fetch(Backend_URL + "/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        lastName,
        password,
        email,
        uuid: props.params.token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    const response = await res.json();
    alert("Usuário cadastrado!");
    console.log({ response });
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await register(values);
  }

  return (
    <div className="overflow-hidden relative sm:min-h-[100vh] max-h-[100vh] ">
      <Image
        alt="Deye"
        src={DeyeImage}
        placeholder="blur"
        quality={100}
        unoptimized={true}
        fill
        sizes="100vw"
        // className="sm:bg-cover max-sm:[background-position-x:-2360px] [background-position-y:-850px] sm:[background-position-y:-250px]"
        className="max-h-[100vh]  object-cover"
      />
      <div className="min-h-[100vh] lg:max-w-[90%] flex flex-col justify-center lg:items-end  max-h-[100vh] ">
        <Image
          className="my-5  ml-2 fixed top-1 left-1  bg-white/40 backdrop-blur-md p-2 rounded-2xl shadow md:m-10 max-[300px]:max-w-[200px] max-[400px]:max-w-[250px] max-w-[300px] md:max-w-[350px] lg:md:max-w-[400px] xl:max-w-none"
          quality={100}
          width={350}
          height={70.63}
          alt="Deye logo"
          src="/centralDeye2.png"
        />

        <div className="flex mt-20 justify-center items-start overflow ">
          <div className=" mt-2 min-w-[95%] sm:min-w-[50vw] lg:min-w-[45vw] xl:min-w-[40vw] 2xl:min-w-[30vw] bg-white/10 backdrop-blur-md rounded-2xl shadow">
            <div className="pt-2 md:pt-6 text-center">
              <h3 className="font-extrabold mt-2 hr ">Crie sua conta</h3>{" "}
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>

                <div className="p-4 md:px-12 md:pb-12 md:pt-6 flex flex-col gap-3 md:gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            label="Nome"
                            id="name"
                            color="default"
                            size={`${size.width && size.width < 640 ? "sm" : "lg"}`}
                            variant="flat"
                            labelPlacement="inside"
                            classNames={{ inputWrapper: "shadow-lg" }}
                            placeholder=""
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-white/100 text-center bg-red-500/80 rounded-lg  max-sm:text-xs max-sm:leading-none py-[2px] sm:p-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            label="Sobrenome"
                            id="lastName"
                            color="default"
                            size={`${size.width && size.width < 640 ? "sm" : "lg"}`}
                            variant="flat"
                            labelPlacement="inside"
                            classNames={{ inputWrapper: "shadow-lg" }}
                            placeholder=""
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-white/100 text-center bg-red-500/80 rounded-lg max-sm:text-xs max-sm:leading-none py-[2px] sm:p-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            label="Email"
                            id="email"
                            color="default"
                            size={`${size.width && size.width < 640 ? "sm" : "lg"}`}
                            type="email"
                            variant="flat"
                            labelPlacement="inside"
                            classNames={{ inputWrapper: "shadow-lg" }}
                            placeholder=""
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-white/100 text-center bg-red-500/80 rounded-lg max-sm:text-xs max-sm:leading-none py-[2px] sm:p-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            label="Senha"
                            id="password"
                            color="default"
                            size={`${size.width && size.width < 640 ? "sm" : "lg"}`}
                            type="password"
                            variant="flat"
                            labelPlacement="inside"
                            classNames={{ inputWrapper: "shadow-lg" }}
                            placeholder=""
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-white/100 text-center bg-red-500/80 rounded-lg max-sm:text-xs max-sm:leading-none py-[2px] sm:p-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            label="Confirmar Senha"
                            id="confirmPassword"
                            color="default"
                            size={`${size.width && size.width < 640 ? "sm" : "lg"}`}
                            type="password"
                            variant="flat"
                            labelPlacement="inside"
                            classNames={{ inputWrapper: "shadow-lg" }}
                            placeholder=""
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-white/100 text-center bg-red-500/80 rounded-lg max-sm:text-xs max-sm:leading-none py-[2px] sm:p-1" />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center mt-1 md:mt-3 items-center gap-6">
                    <Button
                      type="submit"
                      size={`${size.width && size.width < 640 ? "md" : "lg"}`}
                      variant="solid"
                      color="primary"
                    >
                      Registrar
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
