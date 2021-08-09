import { IBaseWorkspace } from './Workspace.types';
import { workspaceSchema } from './Workspace.schema'
import { model } from 'mongoose'

const Workspace = model <IBaseWorkspace >("Workspace", workspaceSchema)

module.exports = Workspace;