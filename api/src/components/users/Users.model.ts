import { IUserType } from './User.types';
import { userSchema } from './Users.schema'
const mongoose = require("mongoose");

const UserModel:IUserType = mongoose.model("User", userSchema)

module.exports = UserModel;