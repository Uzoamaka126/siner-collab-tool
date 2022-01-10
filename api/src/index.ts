// Entry point for all libraries
// Import necessary configured ports here
import { NODE_ENV, port } from "./config/index";
import { dbConnect } from "./config/db/db";
// import { routes } from "./router/index";
import { urlencoded, json } from 'body-parser';
import express, { Application, RouterOptions } from "express"

// import necessary packages
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app: Application = express();
const routes = require('./router/index');

// dbConnect();
// import error handler file

app.set("port", port);
app.use(helmet());
// app.use(
//   cors({
//     credentials: true,
//     exposedHeaders: ["set-cookie"],
//     origin: CLIENT_URL,
//   })
// );
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.json());
app.use(morgan('dev'));

// if (!(NODE_ENV === "development" || NODE_ENV === "test")) {
//   app.use(morgan("tiny"));
// }

// use express on the router
routes(app);

// setup the error handler here
// if (NODE_ENV === "dev" || NODE_ENV === "test") {
//   app.use(errorHandler());
// }

export const start = () => {   
    // dbConnect();
    app.listen(port, () => {
      console.log('__dirname', __dirname)
      console.log("Router is running here -->", port);
    })
}

// export const start = app.listen(port, () => {
//   console.log('__dirname', __dirname)
//   console.log("Router is running here -->", port);
// })

start();

export default start;
// export default app;
