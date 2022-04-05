import { ITokenDocument, tokenSchema } from './Token.schema'
import { model, Model } from 'mongoose'

const Token: Model<ITokenDocument>  = model("Token", tokenSchema)

module.exports = Token;