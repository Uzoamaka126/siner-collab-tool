import { userSchema } from './Users.schema'
const mongoose = require("mongoose");

const UserModel = mongoose.model("User", userSchema)


module.exports = UserModel;