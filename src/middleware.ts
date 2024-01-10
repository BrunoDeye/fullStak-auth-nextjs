import { withAuth } from "next-auth/middleware";
import { Departments, Groups, Roles } from "./lib/next-auth";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { pathname } = req.nextUrl;

    if (
      pathname.startsWith("/_next") || // exclude Next.js internals
      // pathname.startsWith("/api") || //  exclude all API routes
      pathname.startsWith("/static") || // exclude static files
      PUBLIC_FILE.test(pathname) // exclude all files in the public folder
    )
      return NextResponse.next();
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        const mapGroups = {
          usuario: "USER",
          admin: "ADMIN",
          manager: "MANAGER",
          colaborador: "colaborator",
          integrador: "integrator",
          distribuidor: "distributor",
          logistica: "logistics",
          manutencao: "maintenance",
          marketing: "marketing",
          expedicao: "dispatch",
          suporte: "support",
        };
        if (!token) return false;
        const { role, group, department } = token.user.sub;

        if (pathname.split("/")[1] === "central") {
          const roleGroupDepartment = pathname
            .split("/")
            .filter((segment, index) => {
              if (segment === "central") {
                return false;
              } else if (!mapGroups[segment as never]) return false;
              return segment;
            });
          // console.log("TEST2" + token?.user.sub.id)

          if (
            roleGroupDepartment.length >= 2 &&
            roleGroupDepartment
              .slice(0, 2)
              .some((item) => ![role, group].includes(mapGroups[item as never]))
          ) {
            return false;
          }
          if (
            mapGroups[roleGroupDepartment[2] as keyof typeof mapGroups] !==
            undefined
          ) {
            // console.log(
            //   department ===
            //   mapGroups[roleGroupDepartment[2] as keyof typeof mapGroups]
            // );
            return (
              department ===
              mapGroups[roleGroupDepartment[2] as keyof typeof mapGroups]
            );
          }
        } else {
          return true;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/central/:path*",
    "/central/:path*",
    "/central/:path*",
    "/",
    "/abrir-garantia/:path*",
  ],
};
