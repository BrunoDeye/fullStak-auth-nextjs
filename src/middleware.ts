import { withAuth } from "next-auth/middleware";
import { Departments, Groups, Roles } from "./lib/next-auth";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    req.nextUrl;
    // console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const roleGroupDepartment = req.nextUrl.pathname
          .split("/")
          .filter((segment) => segment);

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
        if(!token)
          return false
        const { role, group, department } = token.user.sub

        if (
          roleGroupDepartment.slice(0, 2).some(
            (item) =>
              ![role, group].includes(mapGroups[item as never])  
          )
        )
          return false;

        if (mapGroups[roleGroupDepartment[2] as keyof typeof mapGroups]) {

          console.log(mapGroups[roleGroupDepartment[2] as keyof typeof mapGroups])
          return department === mapGroups[roleGroupDepartment[2] as keyof typeof mapGroups]
        }
        

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/usuario/:path*", "/admin/:path*", "/manager/:path*", "/"],
};
