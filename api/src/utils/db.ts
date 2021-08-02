import { mongoURI } from "../config/index";
const mongoose = require("mongoose");

export const dbConnect = (app:any) => {
    return mongoose.connect(
        mongoURI, 
        {
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
            console.log(err, "This shouldn't be happening", mongoURI);
        });
}