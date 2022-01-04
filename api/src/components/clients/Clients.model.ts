import { IClientDocument } from './Clients.types';
import { clientSchema } from './Clients.schema'
import { model, Model } from 'mongoose'

// schemas are building blocks for models
// to build a model, we pass a name and schema as arguments to the model function
// Create a client model from the client schema

const Client: Model<IClientDocument> = model("Client", clientSchema)

module.exports = Client;