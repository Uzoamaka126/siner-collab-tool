import { IInvoiceBaseDocument } from './Invoices.types';
import { invoiceSchema } from './Invoices.schema'
import { model } from 'mongoose'

const Invoice = model <IInvoiceBaseDocument >("Invoice", invoiceSchema)

module.exports = Invoice;