import { IProjectDocument } from './Projects.types';
import { clientSchema } from './Projects.schema'
import { model, Model } from 'mongoose'

// schemas are building blocks for models
// to build a model, we pass a name and schema as arguments to the model function
// Create a client model from the client schema

const Project: Model<IProjectDocument> = model("Project", clientSchema)

module.exports = Project;