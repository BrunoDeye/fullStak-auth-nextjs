export type FormattedWarranty = {
  id: number;
  status: string;
  caseOrigin?: string | null;
  createdAt: string;
  approvalDate?: string | null;
  reasonToDisapprove?: string | null;
  warrantyType?: string | null;
  comments?: string | null;
  priority?: number | null;
  author: string;
  authorTitle: string | null;
  serialNumber: string;
  model: string;
};