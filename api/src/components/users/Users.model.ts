import { IBaseUser } from './User.types';
import { userSchema } from './Users.schema'
import { model } from 'mongoose'

const User = model <IBaseUser >("User", userSchema)

module.exports = User;