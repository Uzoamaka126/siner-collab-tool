import { DB_CONNECTION_STRING } from "../index";
import config from "config";
import { connect, ConnectOptions, ConnectionOptions } from "mongoose";
import app from '../../index'

// export const dbConnect = () => {
//     console.log(DB_CONNECTION_STRING);
//     // const mongoURI: string = DB_CONNECTION_STRING;
//     const mongoURI: string = config.get("mongoURI");
//     const options: ConnectionOptions = {
//         // useNewUrlParser: true, 
//         // useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         connectTimeoutMS: 1000
//     };
    
//     return connect(mongoURI, options)
//     .then((conn: any) => {
//         app.set("db_connection", conn);
//         console.log(
//         // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//         `MongoDB connection with url successful @: ${conn.connection.host}:${conn.connection.port}`
//         );
//     })
//     .catch((err: {}) => {
//         console.log(err, "This shouldn't be happening", DB_CONNECTION_STRING);
//         process.exit(1);
//     });
// }

export const dbConnect = async () => {
  try {
    const mongoURI: string = config.get("mongoURI");
    const options: ConnectionOptions = {
    //   useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    //   useUnifiedTopology: true,
    };
    await connect(mongoURI, options);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};