declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: string;
    HOST: string;
    USERNAME: string;
    PASSWORD: string;
    DATABASE: string;
  }
}
