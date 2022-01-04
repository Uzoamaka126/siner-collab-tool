import { IUserBaseDocument } from './User.types';
import { userSchema } from './Users.schema'
import { model, Model } from 'mongoose'

const User: Model<IUserBaseDocument>  = model("User", userSchema)

module.exports = User;