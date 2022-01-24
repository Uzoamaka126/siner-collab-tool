// eslint-disable-next-line @typescript-eslint/no-var-requires;

// require("dotenv").config({path:__dirname+'/.env'});
const dotenv = require("dotenv");
dotenv.config();

export const port = process.env.PORT || 5500;
export const JWT_SECRET = process.env.JWT_SECRET || "nebula";
export const NODE_ENV = process.env.NODE_ENV || "development";
const { DB_CONNECTION, DB_CONNECTION_TEST } = process.env;
export const DB_CONNECTION_STRING = DB_CONNECTION;
export const SENDER_EMAIL = process.env.SENDER_EMAIL || "test@email.com";
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "12345";
export const EMAIL_SECRET = process.env.EMAIL_SECRET || "bleep";
// export const CLIENT_URL = process.env.CLIENT_URL || "https://issue-tracker-webapp.netlify.app";

  export const baseConfig = {
    NODE_ENV,
    isDev: NODE_ENV === 'development',
    isTest: NODE_ENV === 'test',
    port: 5000,
    secrets: {
      jwt: JWT_SECRET,
      jwtExp: '100d'
    }
  }

  let envConfig = {};

  switch(NODE_ENV) {

  }

if (NODE_ENV === "test" && DB_CONNECTION_TEST) {
  // DB_CONNECTION_STRING = DB_CONNECTION_TEST.split("issue_tracker_testing").join(
  //   // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  //   "testing_db_" + process.env.JEST_WORKER_ID
  // );
  // console.log(DB_CONNECTION_STRING);
} else if (DB_CONNECTION) {
  // DB_CONNECTION_STRING = DB_CONNECTION;
}
// console.log("db_connection", process.env.DB_CONNECTION, process.env.JWT_SECRET, process.env.PORT);
console.log("DB_CONNECTION_STRING -->:", DB_CONNECTION_STRING);

