// Entry point for all libraries
// Import necessary configured ports here
import { NODE_ENV, port } from "./config/index";
import { dbConnect } from "./config/db/db";
import { urlencoded, json } from 'body-parser';
import express, { Application, RouterOptions } from "express"

// import necessary packages
const cookieParser = require("cookie-parser");
const cors = require("cors");
const sessions = require('express-session');
const helmet = require("helmet");
const morgan = require("morgan");
const app: Application = express();
const routes = require('./router/index');
const oneDay = 1000 * 60 * 60 * 24;

app.set("port", port);
app.use(helmet());
// app.use(
//   cors({
//     credentials: true,
//     exposedHeaders: ["set-cookie"],
//     origin: CLIENT_URL,
//   })
// );
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());
//session middleware
// app.use(sessions({
//     secret: process.env.JWT_SECRET || "nebula",
//     saveUninitialized:false,
//     cookie: { maxAge: oneDay },
//     resave: false
// }));
app.use(express.json());
app.use(morgan('dev'));

if (!(NODE_ENV === "development")) {
  app.use(morgan("tiny"));
}

// use express on the router
routes(app);

// setup the error handler here
// if (NODE_ENV === "dev") {
//   app.use(errorHandler());
// }

export const start = () => {   
    dbConnect();
    app.listen(port, () => {
      console.log("Router is running here -->", port);
    })
}

start();
