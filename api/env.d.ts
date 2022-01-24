declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET?: string;
      NODE_ENV: "test" | "production" | "development";
      DB_CONNECTION_TEST?: string;
      DB_CONNECTION?: string;
      SENDER_EMAIL?: string;
      EMAIL_PASSWORD?: string;
      EMAIL_SECRET?: string;
      CLIENT_URL?: string;
      PORT?: string;
    }
  }
}

export {};