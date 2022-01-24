require("dotenv").config();

import { DB_CONNECTION_STRING } from "../index";
import config from "config";
// import { connect } from "mongoose";
const mongoose = require('mongoose');

export const dbConnect = async () => {
  try {
   const mongoURI: string = process.env.DB_CONNECTION || DB_CONNECTION_STRING;
   console.log(mongoURI);
   
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      connectTimeoutMS: 1000
    };
    await mongoose.connect(mongoURI, options);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    console.log('Connected to Database')
    // Exit process with failure
    process.exit(1);
  }
};