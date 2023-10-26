const groupsMap = {
  support: "suporte",
  dispatch: "expedicao",
  marketing: "marketing",
  maintenance: "manutencao",
  logistics: "logistica",
  distributor: "distribuidor",
  integrator: "integrador",
  colaborator: "colaborador",
  client: "cliente",
  MANAGER: "manager",
  ADMIN: "admin",
  USER: "usuario",
} as const;

export type Groups = keyof typeof groupsMap

export const mapGroups = (group: Groups) => groupsMap[group];
