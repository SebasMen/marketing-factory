import { getCurrentEnv } from '@mfactory-be/commonTypes/global';

const SECRET_VALUT = 'MARKETING_FACTORY';

export enum ApplicationSecret {
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_USER = 'DB_USER',
  DB_PASS = 'DB_PASS',
  DB_NAME = 'DB_NAME',
  JWT_SECRET = 'JWT_SECRET',
  SHA_KEY = 'SHA_KEY',
  BLIND_ENCRYPTION_KEY = 'BLIND_ENCRYPTION_KEY',
  AZURE_CLIENT_ID = 'AZURE_CLIENT_ID',
  AZURE_CLIENT_SECRET = 'AZURE_CLIENT_SECRET',
  API_URL = 'API_URL',
  APPLICATION_URL = 'APPLICATION_URL',
}

export enum SecretServiceAPIs {
  LOGIN = 'LOGIN',
  GET_SECRET = 'GET_SECRET',
}

export const SecretServicePaths = {
  [SecretServiceAPIs.LOGIN]: '/v1/auth/approle/login',
  [SecretServiceAPIs.GET_SECRET]: `/v1/${getCurrentEnv()}/data/${SECRET_VALUT}`,
};

export const SecretServiceMethods = {
  [SecretServiceAPIs.LOGIN]: 'POST',
  [SecretServiceAPIs.GET_SECRET]: 'GET',
};

export type SecretServicePayload = {
  [SecretServiceAPIs.LOGIN]: void;
  [SecretServiceAPIs.GET_SECRET]: ApplicationSecret;
};

export type SecretServiceResponse = {
  [SecretServiceAPIs.LOGIN]: void;
  [SecretServiceAPIs.GET_SECRET]: number | string | boolean;
};
