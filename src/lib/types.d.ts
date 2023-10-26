import { Departments, Roles, Groups } from "./next-auth";

export type User = {
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
