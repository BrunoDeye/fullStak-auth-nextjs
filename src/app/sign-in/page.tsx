"use client";
import { Button } from "@nextui-org/button";
import { Input, Link  } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import DeyeBuilding from "@/../public/deye8.png";
import { useRouter } from "next/navigation";
import { mapGroups } from "@/utils/mapGroupsFromBack";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z.string().email({ message: "Email inválido" }),
  password: z.string().min(4, {
    message: "Senha deve conter pelo menos 4 caracteres.",
  }),
});

const LoginPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signIn("credentials", {
      username: form.getValues().username,
      password: form.getValues().password,
      redirect: false,
    });
    console.log(values);
  }

  useEffect(() => {
    if (session) {
      const { role, group } = session.user.sub;
      router.push(`/central/${mapGroups(role)}/${mapGroups(group)}/dashboard`);
      // router.push("/");
      
    }
  }, [session, router]);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="relative hidden img-gradient overflow-hidden sm:block">
          <div className="absolute text-white h-full top-[22%] ml-3 md:ml-4 xl:ml-10 2xl:ml-20 !max-w-[40vw] z-40">
            <div className="flex flex-col items-start">
              <div className="flex items-center mt-2">
                <Image
                  className="text-center mx-auto max-[300px]:max-w-[200px] max-[400px]:max-w-[250px] max-w-[300px] md:max-w-[350px] lg:md:max-w-[400px] xl:max-w-none"
                  quality={100}
                  width={500}
                  height={300}
                  alt="Deye logo"
                  src="/centralDeyeWhite.png"
                />
              </div>
              <h4 className="mt-6 uppercase">
                Gerencie sua conta na Central Deye{" "}
              </h4>

              <p className="mt-6 sm:max-w-[28vw] font-light text-2xl">
                A central da maior fabricante de Inversores do Brasil!
              </p>

              <ul className="marker:text-red-500 font-light marker:text-3xl text-xl list-disc list-inside mt-12">
                <li>
                  <span className="-ml-4">Abertura de garantias.</span>
                </li>
                <li>
                  <span className="-ml-4">Sistema seguro.</span>
                </li>
                <li>
                  <span className="-ml-4">Gerencie seus dados.</span>
                </li>
              </ul>
            </div>
          </div>

          <Image
            width={2000}
            height={1000}
            priority
            className="w-[50vw] h-full object-cover"
            src={DeyeBuilding}
            placeholder="blur"
            alt=""
          />
        </div>
        <div className="relative !w-[100%] img-gradient overflow-hidden !min-w-[100%] !min-h-[320px] !max-h-[320px] z-50 sm:hidden">
          <div className="absolute text-white min-h-[45vh] top-[20px] max-[300px]:top-3 max-w-[60%]  ml-10 z-50">
            <div className="flex flex-col items-start">
              <div className="flex items-center mt-2">
                <Image
                  className="text-center mx-auto max-[300px]:max-w-[200px] max-[400px]:max-w-[250px] max-w-[300px] md:max-w-[350px] lg:md:max-w-[400px] xl:max-w-none"
                  quality={100}
                  width={200}
                  height={300}
                  alt="Deye logo"
                  src="/centralDeyeWhite.png"
                />
              </div>
              <h4 className="mt-2 text-xs uppercase leading-tight">
                Gerencie sua conta na Central Deye{" "}
              </h4>

              <p className="mt-2 font-light text-sm leading-tight">
                A central da maior fabricante de Inversores do Brasil!
              </p>

              <ul className="marker:text-red-500 font-light !leading-tight !space-y-1 marker:!leading-tight marker:text-3xl text-sm list-disc list-inside mt-2">
                <li>
                  <span className="-ml-4 !leading-tight">
                    Abertura de garantias.
                  </span>
                </li>
                <li>
                  <span className="-ml-4  !leading-tight">Sistema seguro.</span>
                </li>
                <li>
                  <span className="-ml-4 !leading-tight">
                    Gerencie seus dados.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <Image
            width={2000}
            height={2000}
            priority
            className="absolute min-h-[320px] !object-cover"
            placeholder="blur"
            src={DeyeBuilding}
            alt=""
          />
        </div>

        <div className="bg-white flex flex-col justify-center max-sm:justify-start">
          <div className="text-center">
            <h2 className="hr max-[400px]:text-2xl max-sm:mt-6 text-4xl text-default-700 font-bold">
              Entrar
            </h2>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-9 sm:space-y-12 max-w-[400px] w-full mx-auto p-8"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Email"
                        labelPlacement="outside"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        autoComplete="on"
                        type={"email"}
                        startContent={<AiOutlineMail />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Senha"
                        labelPlacement="outside"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        type={"password"}
                        startContent={<RiLockPasswordLine />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                radius="sm"
                color="primary"
                type="submit"
                className="mt-7 mb-6 w-full px-unit-2 py-unit-1 min-w-unit-3xl"
              >
                Entrar
              </Button>
              {/* <div className="w-full text-center">
              <p className="text-center">
                Precisa criar uma conta?
                <Link
                  className="underline ml-2"
                  href={"/sign-up"}
                >
                  Cadastre-se
                </Link>
              </p>
              </div> */}
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
