import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { usePathname } from "next/navigation";
import SideBar from "@/components/SideBar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const DashBoardLayout = async (props: Props) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex overflow-hidden bg-sky-800">
      <SideBar session={session} />

      <div className="bg-sky-800 w-full ">
        <div className="!overflow-y-scroll min-h-full rounded-tl-2xl bg-white">
          <div className="m-5 h-[80vh] max-w-[74vw] sm:max-w-[85vw] xl:max-w-[100vw] overflow-y-scroll">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
