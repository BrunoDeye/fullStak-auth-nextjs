import { IconNames } from "@/animated/AnimatedIcon";

export type SideBarData = {
  label: string;
  icon: IconNames;
  pathLabel: string;
  pathName: (path: string) => string;
};

export type USERType = {
  colaborator: SideBarData[];
  integrator: SideBarData[];
  distributor: SideBarData[];
};

export type ADMINType = {
  colaborator: SideBarData[];
};



export type MANAGERType = {
  colaborator: SideBarData[];
  integrator: SideBarData[];
  distributor: SideBarData[];
};

export type SideBarType = {
  USER: USERType;
  ADMIN: ADMINType;
  MANAGER: MANAGERType;
};

export type SideBarList = SideBarData[] | undefined

export const sideBars = {
  USER: {
    colaborator: [
      {
        label: "Garantias",
        icon: "warrantyIcon",
        pathLabel: "garantias",
        pathName: (path: "string") => path,
      },
      {
        label: "Gerar Acessos",
        icon: "keyIcon",
        pathLabel: "acessos",
        pathName: (path: "string") => path,
      },
      {
        label: "Aprovar Garantias",
        icon: "approveIcon",
        pathLabel: "aprovacao",
        pathName: (path: "string") => path,
      },
    ],
    integrator: [
      {
        label: "Acompanhar Garantias",
        icon: "warrantyIcon",
        pathLabel: "minhas-garantias",
        pathName: (path: "string") => path,
      },
    ],
    distributor: [
      {
        label: "Garantias",
        icon: "warrantyIcon",
        pathLabel: "garantias",
        pathName: (path: "string") => path,
      },
    ],
  },
  ADMIN: {
    colaborator: [
      {
        label: "Garantias",
        icon: "warrantyIcon",
        pathLabel: "garantias",
        pathName: (path: "string") => path,
      },
    ],
  },

  MANAGER: {
    colaborator: [
      {
        label: "Garantias",
        icon: "warrantyIcon",
        pathLabel: "garantias",
        pathName: (path: "string") => path,
      },
    ],
    integrator: [
      {
        label: "Garantias",
        icon: "warrantyIcon",
        pathLabel: "garantias",
        pathName: (path: "string") => path,
      },
    ],
    distributor: [
      {
        label: "Garantias",
        icon: "warrantyIcon",
        pathLabel: "garantias",
        pathName: (path: "string") => path,
      },
    ],
  },
} as  SideBarType;
