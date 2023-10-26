"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Backend_URL } from "@/lib/Constants";
import Link from "next/link";
import React, { useRef } from "react";
import Image from "next/image";

type FormInputs = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

function SignupPage() {
  const register = async () => {
    const res = await fetch(Backend_URL + "/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.current.name,
        email: data.current.email,
        password: data.current.password,
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
    alert("Usuário não cadastrado!");
    console.log({ response });
  };

  const data = useRef<FormInputs>({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <div className="overflow-scroll min-h-[3000px]">
      <div className="min-h-[3000px]">
        <Image
          className="m-10 max-[300px]:max-w-[200px] max-[400px]:max-w-[250px] max-w-[300px] md:max-w-[350px] lg:md:max-w-[400px] xl:max-w-none"
          quality={100}
          width={200}
          height={300}
          alt="Deye logo"
          src="/centralDeye2.png"
        />

        <div className="flex justify-center items-start  min-h-[2000px]">
          <div className="border mt-2 min-w-[95%] sm:min-w-[50%] rounded overflow-hidden shadow">
            <div className="p-6 text-center space-y-3">
              <h4>Crie sua conta</h4>{" "}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                register();
              }}
              className="p-12 flex flex-col gap-12 overflow-y-scroll"
            >
              <Input
                autoComplete="off"
                name="name"
                label="Nome"
                size="lg"
                variant="faded"
                labelPlacement="outside"
                required
                onChange={(e) => (data.current.name = e.target.value)}
              />
              <Input
                autoComplete="off"
                name="lastName"
                label="Sobrenome"
                variant="faded"
                size="lg"
                labelPlacement="outside"
                required
                onChange={(e) => (data.current.name = e.target.value)}
              />
              <Input
                name="email"
                label="Email"
                size="lg"
                variant="faded"
                labelPlacement="outside"
                required
                onChange={(e) => (data.current.email = e.target.value)}
              />
              <Input
                name="password"
                label="Senha"
                size="lg"
                type="password"
                variant="faded"
                labelPlacement="outside"
                required
                onChange={(e) => (data.current.password = e.target.value)}
              />
              <div className="flex justify-center items-center gap-6">
                <Button type="submit" size="lg" variant="ghost" color="primary">
                  Registrar
                </Button>
                <Link className="hover:text-sky-600" href={"/"}>
                  Voltar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
