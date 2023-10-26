import NextAuth from "next-auth";

export enum Departments {
  logistics = "logistics",
  dispatch = "dispatch",
  maintenance = "maintenance",
  support = "support",
  marketing = "marketing",
}

export enum Groups {
  colaborator = "colaborator",
  integrator = "integrator",
  distributor = "distributor",
  client = "client",
}

export enum Roles {
  USER = "USER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
}

declare module "next-auth" {
  interface Session {
    user: {
      username: string,
      sub: {
        id: number,
        name: string,
        lastname: string,
        role: Roles,
        group: Groups,
        department: Departments,
      },
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      username: string,
      sub: {
        id: number,
        name: string,
        lastname: string,
        role: Roles,
        group: Groups,
        department: Departments,
      },
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
