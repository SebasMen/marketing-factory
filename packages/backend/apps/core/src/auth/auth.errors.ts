import { IRequestError } from '@mfactory-be/commonTypes/global';

const domain = 'auth';

export const AuthErrors = {
  AUTH_UNAUTHORIZED: (): IRequestError => ({
    code: '001',
    httpCode: 401,
    description: `The domain is not allowed access`,
    domain,
    details: null,
  }),
  AUTH_CLIENT_NOT_BELONG_TO_COMPANY: (): IRequestError => ({
    code: '002',
    httpCode: 401,
    description: `The client does not belong to the company`,
    domain,
    details: null,
  }),
  AUTH_USER_NOT_FOUND: (userId: string): IRequestError => ({
    code: '003',
    httpCode: 404,
    description: `The user was not found`,
    domain,
    details: { userId },
  }),
};
