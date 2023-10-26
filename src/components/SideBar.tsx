"use client";
import AnimatedIcon from "@/animated/AnimatedIcon";
import { mapGroups } from "@/utils/mapGroupsFromBack";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

function SideBar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (session) {
    const { role, group, department } = session.user.sub;
    return (
      <div className="grid-cols-4 min-w-[80px] xl:min-w-[250px] bg-gradient-to-t from-sky-100 to-sky-800 col-span-1 sm:col-span-2 shadow h-screen p-2">
        <div className="flex flex-col gap-3">
          <Link
            className={`${
              pathname.includes("user") ? "bg-sky-950 text-sky-100" : ""
            } flex items-center gap-2 p-3 rounded text-sky-100 hover:bg-sky-950 hover:text-white hover:shadow transition `}
            href={`/${mapGroups(role)}/${mapGroups(group)}/dashboard/user/${
              session.user.sub.id
            }`}
          >
            <AnimatedIcon icon="userIcon">
              <span className="hidden xl:inline">Perfil do Usuário</span>{" "}
            </AnimatedIcon>
          </Link>
          <Link
            className={`${
              pathname.includes("garantias") ? "bg-sky-950 text-sky-100" : ""
            } gap-2 p-3 rounded text-sky-100 hover:bg-sky-950 hover:text-white hover:shadow transition `}
            href={`/${mapGroups(role)}/${mapGroups(
              group
            )}/dashboard/${mapGroups(department)}/garantias`}
          >
            <AnimatedIcon icon="warrantyIcon">
              <span className="hidden xl:inline">Garantias</span>{" "}
            </AnimatedIcon>
          </Link>
        </div>
      </div>
    );
  }
}

export default SideBar;
