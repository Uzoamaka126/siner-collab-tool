import { IBaseWorkspace } from './Invoices.types';
import { workspaceSchema } from './Invoices.schema'
import { model } from 'mongoose'

const Workspace = model <IBaseWorkspace >("Workspace", workspaceSchema)

module.exports = Workspace;