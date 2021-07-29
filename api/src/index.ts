// Entry point for all libraries
// Import necessary configured ports here
const dotenv = require("dotenv");
dotenv.config();

import { CLIENT_URL, mongoURI, NODE_ENV, port } from "./config/index";
// import express typings

// import necessary packages
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const routes = require('./router')
// import error handler file

// connect to mongoose
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((conn: any) => {
    app.set("db_connection", conn);
    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `MongoDB connection with url successful @: ${conn.connection.host}:${conn.connection.port}`
    );
  })
  .catch((err: {}) => {
    console.log(err, "This shouldn't be happening", "Heyy:", mongoURI);
  });

app.set("port", port);
app.use(helmet());

if (!(NODE_ENV == "dev" || NODE_ENV == "test")) {
  app.use(morgan("tiny"));
}
app.use(
  cors({
    credentials: true,
    exposedHeaders: ["set-cookie"],
    origin: CLIENT_URL,
  })
);
app.use(cookieParser());
app.use(express.json());

// use express on the router
routes(app);

// setup the error handler here
// if (NODE_ENV === "dev" || NODE_ENV === "test") {
//   app.use(errorHandler());
// }

export default app;