import { IInvoiceDocument } from './Invoices.types';
import { invoiceSchema } from './Invoices.schema'
import { model } from 'mongoose'

const Invoice = model <IInvoiceDocument >("Invoice", invoiceSchema)

module.exports = Invoice;