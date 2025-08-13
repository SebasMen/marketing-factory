/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationErrorItem } from 'joi';

const domain = 'application';

/** Interface used to handle errors */
export interface IRequestError {
  code: string;
  httpCode: number;
  description: string;
  domain: string;
  details?: any;
}

/** It is responsible for handling all general application errors. */
export class ApplicationError {
  public code: string;
  public httpCode: number;
  public description: string;
  public domain: string;
  public details?: any;
  public id: string;

  constructor(args: IRequestError) {
    this.code = args.code;
    this.httpCode = args.httpCode;
    this.description = args.description;
    this.domain = args.domain;
    this.details = args.details;
    this.id = `${args.domain}-${args.code}`;
  }

  asToResponse(): Partial<ApplicationError> {
    return {
      code: this.code,
      description: this.description,
      domain: this.domain,
      details: this.details,
      id: this.id,
    };
  }
}

/** It is responsible for handling all validation routes application errors */
export class ApplicationValidationError {
  public errors: {
    field: string;
    message: string;
  }[];

  constructor(fieldErrors: ValidationErrorItem[]) {
    this.errors = fieldErrors.map((fieldError: any) => ({
      field: fieldError.path[0],
      message: `Field ${fieldError.message}`,
    }));
  }
}

export const GlobalErrors = {
  INTERNAL_SERVER_ERROR: (
    httpCode = 500,
    description = 'Internal server error',
    details = {},
  ): IRequestError => ({
    code: '001',
    httpCode,
    description,
    domain,
    details,
  }),
  UNAUTHORIZED: (): IRequestError => ({
    code: '002',
    httpCode: 401,
    description: 'Unauthorized',
    domain,
    details: 'UnauthorizedException',
  }),
};
