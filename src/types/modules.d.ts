declare namespace NodeJS {
  export interface ProcessEnv {
    // AUTH_TOKEN: string;
    // TOKEN_SECRET: string;
    // TOKEN_LIFE: string;
    // REFRESH_TOKEN_SECRET: string;
    // REFRESH_TOKEN_LIFE: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_DIALECT: Dialect;
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
  }
}

declare namespace Express {
  export interface Request {
    token?: string;
  }
  // export interface Response {
  //   token: any;
  // }
}

declare module "http" {
  interface IncomingHttpHeaders {
    "x-token"?: string;
    "x-user"?: string;
  }
}
