import { getServerSession } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SideBar from "@/components/SideBar";
import React from "react";
import { authOptions } from "@/authOptions";

interface Props {
  children: React.ReactNode;
  integrator: React.ReactNode;
  distributor: React.ReactNode;
  colaborator: React.ReactNode;
  ADMIN: React.ReactNode;
  MANAGER: React.ReactNode;
}

const DashBoardLayout = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const activeRole = session?.user.sub.role;
  const activeSession = session?.user.sub.group;

  return (
    <>
      {activeRole ? (
        <div className="flex overflow-hidden bg-sky-800">
          <SideBar session={session} />

          <div className="bg-sky-800 w-full ">
            <div className="min-h-full min-w-full md:rounded-tl-2xl bg-white">
              <div className="p-5 h-[85vh] max-w-full min-w-full sm:max-w-[85vw] xl:max-w-[70vw] overflow-scroll">
                {activeRole === "USER"
                  ? props[activeSession as keyof Props]
                  : props[activeRole as keyof Props]}
              </div>
            </div>
          </div>
        </div>
      ) : (
        props.children
      )}
    </>
  );
};

export default DashBoardLayout;
