import { userSchema } from './Users.schema'
const mongoose = require("mongoose");


module.exports = mongoose.model("User", userSchema)