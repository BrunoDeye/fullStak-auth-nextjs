export type WarrantyData = {
  id: number;
  usersUpdates: {
    status: string;
    visibleStatus: string;
    description: string;
    updatedAt: string;
  }[];
  authorId: number;
  responsibleEngineerId?: number | null;
  caseOrigin?: string | null;
  createdAt: string;
  approvalDate?: string | null;
  reasonToDisapprove?: string | null;
  warrantyType?: string | null;
  comments?: string | null;
  priority?: number | null;
  author: {
    name: string;
    lastName: string;
    group: {
      title: string;
      department: string;
      description: string | null;
    };
  };
  documentation: null;
  productsWarranty: {
    model: string;
    serialNumber: string;
    warrantyId: number;
    fault: string[];
    faultDescription: string;
  }[];
  registration: {
    warrantyId: number;
    name: string;
    email: string;
    phoneNumber: string | null;
    cpf: string | null;
    cnpj: string | null;
    onSiteContact: string | null;
    onSiteContactNumber: string | null;
    addressesWarranty: {
      addressId: number;
      warrantyId: number;
      type: "REGISTRATION" | "PICKUP" | "DELIVERY";
    }[];
    warrantyCompanies: null;
  };
  repairInfo: null;
  responsibleEngineer: null;
  testList: null;
};
