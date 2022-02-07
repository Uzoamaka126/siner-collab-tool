import { Document, Types } from "mongoose"

export interface IBaseInvoice {
    client_email: string;
    currency: string;
    amount?: number;
    due_date?: Date;
    status: string;
    invoice_no: string;
    other_emails: string[];
    items: {}[];
    price: number;
    tax: {};
    total_amount: number;
    memo: string;
    user_id: string;
    project_id: string;
}
// export interface IWorkspaceInput {
//     title: IBaseWorkspace['title'];
//     type: IBaseWorkspace['type'];
//     description?: IBaseWorkspace['description'];
//     boards?: IBaseWorkspace['boards'];
//     members?: IBaseWorkspace['members'];
//     activities?: IBaseWorkspace['activities'];
//     cards?: IBaseWorkspace['cards'];
//     createdBy: IBaseWorkspace['createdBy'];
// }

export interface IInvoiceBaseDocument extends IBaseInvoice, Document<Types.ObjectId> {
  _id: Types.ObjectId;
}
export interface IUserCreateDataResponse {
  status: number;
  isSuccessful: boolean;
  message: string;
  data?: IBaseInvoice
}