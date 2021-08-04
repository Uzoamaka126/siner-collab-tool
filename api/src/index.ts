// Entry point for all libraries
// Import necessary configured ports here
const dotenv = require("dotenv");
dotenv.config();

import { CLIENT_URL, NODE_ENV, port } from "./config/index";
import { dbConnect } from "./utils/db";
import { urlencoded, json } from 'body-parser';
import express, { Application } from "express"

// import necessary packages
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app: Application = express();
const routes = require('./router/index')
// import error handler file

// connect to mongoose
// dbConnect(app);

app.set("port", port);
app.use(helmet());
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

// if (!(NODE_ENV === "development" || NODE_ENV === "test")) {
//   app.use(morgan("tiny"));
// }

// use express on the router
routes(app, port);

// setup the error handler here
// if (NODE_ENV === "dev" || NODE_ENV === "test") {
//   app.use(errorHandler());
// }

export const start = async () => {   
  try {
    dbConnect();

    app.listen(port, () => {
      console.log("Router is running here -->", port);
    })

  } catch (e) {
    console.error(e)
  }
}

start();

export default app;