"use client";
import AnimatedIcon from "@/animated/AnimatedIcon";
import { mapGroups } from "@/utils/mapGroupsFromBack";
import { SideBarData, sideBars, SideBarList } from "@/utils/sideBars";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import lottie from "lottie-web";
import { useWindowSize } from "@uidotdev/usehooks";

function SideBar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const size = useWindowSize()
  const [open, setOpen] = useState(false);

  const SideBarType: SideBarList = React.useMemo(() => {
    if (session) {
      const { role, group, department } = session.user.sub;
      return sideBars[role as never][group as never];
    }
  }, [session]) as SideBarList;


  if (session && SideBarType) {
    const { role, group, department } = session.user.sub;
    return (

      size.width && size.width <= 768 ? null :
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`grid-cols-4 ${
          open ? "min-w-[250px]" : "min-w-[80px]"
        } max-md:hidden  xl:min-w-[250px] bg-gradient-to-t from-sky-100 to-sky-800 col-span-1 sm:col-span-2 shadow h-screen p-2`}
      >
        <div className="flex flex-col gap-4 mt-2">
          {SideBarType.map((sidebar: SideBarData, index) => (
            <Link
              onMouseEnter={() =>
                lottie.play(`${sidebar.icon}-sidebar-${index}`)
              }
              onMouseLeave={() =>
                lottie.stop(`${sidebar.icon}-sidebar-${index}`)
              }
              key={sidebar.pathLabel}
              className={`${
                pathname.includes(sidebar.pathLabel)
                  ? "bg-sky-950 text-sky-100"
                  : ""
              } gap-2 p-3 rounded-xl text-sky-100 hover:bg-sky-950 hover:text-white hover:shadow transition `}
              href={
                sidebar.pathName(
                  `/central/${mapGroups(role)}/${mapGroups(group)}/dashboard/${
                    department ? `${mapGroups(department)}/` : ""
                  }${sidebar.pathLabel}`
                ) as any
              }
            >
              <AnimatedIcon
                animationName={`${sidebar.icon}-sidebar-${index}`}
                icon={sidebar.icon}
              >
                <span className={`${open ? "inline" : "hidden"} xl:inline`}>
                  {sidebar.label}
                </span>{" "}
              </AnimatedIcon>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default SideBar;
