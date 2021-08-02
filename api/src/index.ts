// Entry point for all libraries
// Import necessary configured ports here
const dotenv = require("dotenv");
dotenv.config();

import { CLIENT_URL, NODE_ENV, port } from "./config/index";
import { dbConnect } from "./utils/db";
import { urlencoded, json } from 'body-parser'

// import necessary packages
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
export const app = express();
const router = express.Router()
const routes = require('./router')
// import error handler file

// connect to mongoose
dbConnect();

app.set("port", port);
app.use(helmet());

if (!(NODE_ENV == "development" || NODE_ENV == "test")) {
  app.use(morgan("tiny"));
}
app.use(
  cors({
    credentials: true,
    exposedHeaders: ["set-cookie"],
    origin: CLIENT_URL,
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

// use express on the router
routes(router);

// setup the error handler here
// if (NODE_ENV === "dev" || NODE_ENV === "test") {
//   app.use(errorHandler());
// }

export default app;