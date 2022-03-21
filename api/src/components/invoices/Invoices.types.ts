import { Document, Types } from "mongoose"

export interface IBaseInvoice {
    amount?: number;
    client_email: string;
    currency: string;
    due_date?: Date;
    date_paid?: Date;
    invoice_no: string;
    memo?: string;
    meta?: {};
    user_id: string;
    project_id: string;
    status: string;
    title: string;
}

export interface IInvoiceDocument extends IBaseInvoice, Document<Types.ObjectId> {
  _id: Types.ObjectId;
}
export interface IInvoiceResponsePayload {
  status: number;
  isSuccessful: boolean;
  message: string;
  data?: {
    invoices: IBaseInvoice[],
    pageDetails: {
      total: number;
      currentPage: number;
      totalPages: number;
      pageSize: number;
    };
  }
}

export type InvoiceQueryData = {
    page?: number;
    limit?: number;
    offset?: number
    where?: any
}

export type QueryStringsInvoice = {
    page?: string;
    limit?: string;
    userId?: string;
    download?: string;
    clientEmail?: string;
    clientName?: string;
    dateCreated?: Date;
    status?: string;
    dueDate?: Date;
    invoiceNo?: string;
    projectId?: string;
}