import { ITagDocument } from './Tags.types';
import { tagSchema } from './Tags.schema'
import { model, Model } from 'mongoose'

// schemas are building blocks for models
// to build a model, we pass a name and schema as arguments to the model function
// Create a client model from the client schema

const Tag: Model<ITagDocument> = model("Tag", tagSchema)

module.exports = Tag;