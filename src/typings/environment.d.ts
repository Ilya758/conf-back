declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: string;
    HOST: string;
    NAME: string;
    PASSWORD: string;
    DATABASE: string;
  }
}
