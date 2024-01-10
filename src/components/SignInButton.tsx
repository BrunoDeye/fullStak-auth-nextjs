"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@nextui-org/button";
import AnimatedIcon from "@/animated/AnimatedIcon";
import { ChevronLeft, ChevronRight, LogOut, User, User2Icon, UserCircle, UserCircle2Icon, UserCircleIcon, Users2Icon } from "lucide-react";
import { mapGroups } from "@/utils/mapGroupsFromBack";
import { Spinner } from "@nextui-org/react";


type Props = {
  open: boolean;
  setOpen: any;
}


function SignInButton({ open, setOpen }: Props) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  // console.log(session);

  if (status === "loading")
    return (
      <div className="flex gap-4 ml-auto pr-10">
        <Spinner />
      </div>
    );

  if (session && session.user) {
    const { role, group } = session.user.sub;

    return (
      <>
        <div  onMouseEnter={() =>
                  setOpen(true)
                }
                onMouseLeave={() =>
                  setOpen(false)
                } className="md:hidden flex pl-5 h-full gap-4 transition-all duration-200 w-[60px] group max-[435px]:hover:w-[55vw] hover:w-[40vw] pr-unit-8 rounded rounded-l-full items-center bg-sky-700">
          <ChevronLeft className="text-sky-100 min-w-[20px] visible group-hover:invisible" />{" "}
          <ChevronRight className="text-sky-100 min-w-[20px] invisible group-hover:visible" />
          <div className="w-[25vw] flex max-[300px]:flex-col items-center gap-2">
            <Button
            isIconOnly
            size="sm"
            // startContent={<AnimatedIcon size={23} animationName="user-topbar" icon="userIcon"/>}
            radius="sm"
            onClick={() =>
              router.push(
                `/${mapGroups(role)}/${mapGroups(group)}/perfil/${
                  session.user.sub.id
                }`
              )
            }
            className="max-[330px]:hidden ml-auto overflow-visible shadow-xl bg-background/80 after:content-[''] after:absolute after:rounded-md after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0 absolute invisible scale-0 transition-all delay-100 group-hover:visible group-hover:relative group-hover:scale-100"
          >
            <User2Icon className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            isIconOnly
            // startContent={<AnimatedIcon size={23} animationName="user-topbar" icon="userIcon"/>}
            radius="sm"
            onClick={() =>
              router.push(
                `/${mapGroups(role)}/${mapGroups(group)}/perfil/${
                  session.user.sub.id
                }`
              )
            }
            className="min-[330px]:hidden min-[330px]:ml-auto overflow-visible shadow-xl bg-background/80 after:content-[''] after:absolute after:rounded-md after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0 absolute invisible scale-0 transition-all delay-100 group-hover:visible group-hover:relative group-hover:scale-100"
          >
            <User2Icon className="h-4 w-4" />
          </Button>
          <Button
           size="sm"
            radius="sm"
            color="danger"
            onClick={() => signOut()}
            isIconOnly
            className="min-[330px]:ml-auto "
          >
            <LogOut className="h-4 w-4" />
          </Button>
          </div>
          
        </div>
        <div className="hidden md:flex pl-unit-3xl h-full gap-4 transition-all duration-200 w-[420px] group hover:w-unit-8xl pr-unit-8 rounded rounded-l-full items-center bg-sky-700">
          <p className="text-sky-100 truncate flex gap-4">
            {session.user.sub.name} {session.user.sub.lastname}{" "}
            <ChevronLeft className="visible group-hover:invisible" />{" "}
            <ChevronRight className="invisible group-hover:visible" />
          </p>
          <Button
            // startContent={<AnimatedIcon size={23} animationName="user-topbar" icon="userIcon"/>}
            radius="sm"
            isIconOnly
            onClick={() =>
              router.push(
                `/${mapGroups(role)}/${mapGroups(group)}/perfil/${
                  session.user.sub.id
                }`
              )
            }
            className="ml-auto overflow-visible shadow-xl bg-background/80 after:content-[''] after:absolute after:rounded-md after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0 absolute invisible scale-0 transition-all delay-100 group-hover:visible group-hover:relative group-hover:scale-100"
          >
            <User2Icon className="h-4 w-4" />
          </Button>
          <Button
            radius="sm"
            color="danger"
            onClick={() => signOut()}
            className="ml-auto"
          >
            Sair
          </Button>
        </div>
      </>
    );
  }
  return null;
}

export default SignInButton;
