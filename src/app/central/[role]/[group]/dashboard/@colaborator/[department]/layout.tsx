import { getServerSession } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SideBar from "@/components/SideBar";
import React from "react";
import { authOptions } from "@/authOptions";

interface Props {
  children: React.ReactNode;
  support: React.ReactNode;
  logistics: React.ReactNode;
  dispatch: React.ReactNode;
  maintenance: React.ReactNode;
  marketing: React.ReactNode;
}

const DepartmentsLayout = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const activeDepartment = session?.user.sub.department;

  // console.log(props[activeDepartment as keyof Props])
  return (
    <>
      {activeDepartment ? (
        <>{props[activeDepartment as keyof Props]}</>
      ) : (
        props.children
      )}
    </>
  );
};

export default DepartmentsLayout;
