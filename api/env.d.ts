declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dictionary<string> {
      JWT_SECRET?: string;
      NODE_ENV: "test" | "production" | "development";
      DB_CONNECTION_TEST?: string;
      DB_CONNECTION?: string;
      SENDER_EMAIL?: string;
      EMAIL_PASSWORD?: string;
      EMAIL_SECRET?: string;
      CLIENT_URL?: string;
      PORT?: number;
    }
  }
}

export {};