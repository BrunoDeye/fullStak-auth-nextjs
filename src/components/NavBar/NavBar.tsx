"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Spinner,
} from "@nextui-org/react";
import DeyeLogo from "@/../public/centralDeye1.png";
import Image from "next/image";
import SignInButton from "../SignInButton";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { mapGroups } from "@/utils/mapGroupsFromBack";
import { Departments, Groups, Roles } from "@/lib/next-auth";
import { SideBarData, SideBarList, sideBars } from "@/utils/sideBars";
import AnimatedIcon from "@/animated/AnimatedIcon";
import lottie from "lottie-web";


export default function NavBar() {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  type SessionType = {
    role: Roles;
    group: Groups;
    department: Departments;
  };
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [sessionState, setSessionState] = useState<SessionType>();
  const [open, setOpen] = useState(false);
  const ariaCurrent = (href: string) => {
    if (pathname.startsWith(href)) {
      // Additionally, if the href is exactly "/", match only if the pathname is exactly "/"
      if (href === "/" && pathname === "/") {
        return "page";
      }

      // For other cases, check if the next character after href is a "/" to avoid matching partial paths
      const nextChar = pathname.charAt(href.length);
      if (nextChar === "/" || nextChar === "") {
        return "page";
      }
    }

    return undefined;
  };

  useEffect(() => {
    if (session) {
      const { role, group, department } = session.user.sub;
      setSessionState({ role, group, department });
    }
  }, [session]);

  const SideBarType: SideBarList = React.useMemo(() => {
    if (session) {
      const { role, group, department } = session.user.sub;
      return sideBars[role as never][group as never];
    }
  }, [session]) as SideBarList;

  // console.log("test1" + (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")));
  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) return null;
  // console.log("test1" + (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")));
  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      height="128px"
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: "h-[128px]",
        wrapper: "max-w-full h-full px-0",
        item: [
          "h-full",
          "flex",
          "relative",
          "items-center",
          "[&_a]:data-[active=true]:text-cyan-400",
          "hover:[&_a]:data-[active=true]:text-sky-100",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-1/4",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[5px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-cyan-400",
        ],
      }}
      className="bg-sky-800 [&_a]:text-sky-100 [&_a]:px-6 hover:[&_a]:bg-sky-950 hover:[&_a]:text-sky-100 [&_a]:rounded-xl [&_a]:p-3"
    >
      <NavbarContent className="md:hidden ml-6" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-sky-100"
        />
      </NavbarContent>
      
        <NavbarContent
          className={`${!open ? "" : "max-[440px]:hidden" } ( md:hidden max-[350px]:pr-0 pr-6`}
          justify="center"
        >
          <NavbarBrand>
            <Image
              className="text-center"
              quality={100}
              width={160}
              height={160}
              alt="Deye logo"
              src="/centralDeyeWhite.png"
            />
          </NavbarBrand>
        </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4 pl-6" justify="center">
        <NavbarBrand>
          <Image
            className="text-center min-w-[120px] -mt-1 pl-2"
            quality={100}
            width={200}
            height={200}
            alt="Deye logo"
            src="/centralDeyeWhite.png"
          />
        </NavbarBrand>
        <NavbarItem isActive={ariaCurrent("/") === "page"}>
          <Link aria-current={ariaCurrent("/")} href={"/"}>
            Home
          </Link>
        </NavbarItem>
        {sessionState === undefined ? (
          <div className="h-full flex justify-center px-10">
            <Spinner />
          </div>
        ) : (
          <NavbarItem
            isActive={
              ariaCurrent(
                `/central/${mapGroups(sessionState!.role)}/${mapGroups(
                  sessionState!.group
                )}/dashboard`
              ) === "page"
            }
          >
            <Link
              href={`/central/${mapGroups(sessionState!.role)}/${mapGroups(
                sessionState!.group
              )}/dashboard`}
              aria-current={ariaCurrent(
                `/central/${mapGroups(sessionState!.role)}/${mapGroups(
                  sessionState!.group
                )}/dashboard`
              )}
            >
              Dashboard
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="self-stretch h-full" justify="end">
        <NavbarItem>
          <SignInButton open={open} setOpen={setOpen} />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="pt-10 bg-gradient-to-t from-sky-100 to-sky-800">
        {sessionState !== undefined && SideBarType ? (
          SideBarType.map((sidebar: SideBarData, index) => (
            <NavbarMenuItem key={`${sidebar.label}-${index}`}>
              <Link
                className={`${
                  pathname.includes(sidebar.pathLabel)
                    ? "!bg-sky-950 relative items-center"
                    : ""
                } w-full gap-2 p-3 rounded-xl text-sky-100 hover:bg-sky-950 hover:text-white hover:shadow transition `}
                onMouseEnter={() =>
                  lottie.play(`${sidebar.icon}-mobile-sidebar-${index}`)
                }
                onMouseLeave={() =>
                  lottie.stop(`${sidebar.icon}-mobile-sidebar-${index}`)
                }
                href={
                  sidebar.pathName(
                    `/central/${mapGroups(sessionState.role)}/${mapGroups(
                      sessionState.group
                    )}/dashboard/${
                      sessionState.department
                        ? `${mapGroups(sessionState.department)}/`
                        : ""
                    }${sidebar.pathLabel}`
                  ) as any
                }
                size="lg"
              >
                <AnimatedIcon
                  animationName={`${sidebar.icon}-mobile-sidebar-${index}`}
                  icon={sidebar.icon}
                >
                  <span>{sidebar.label}</span>{" "}
                </AnimatedIcon>
              </Link>
            </NavbarMenuItem>
          ))
        ) : (
          <Spinner />
        )}
      </NavbarMenu>
    </Navbar>
  );
}
