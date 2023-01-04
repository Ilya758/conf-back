import { cleanEnv, port, str } from 'envalid';

export const validateEnv = (): void => {
  cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str(),
    USERNAME: str(),
    HOST: str(),
    PASSWORD: str(),
  });
};
