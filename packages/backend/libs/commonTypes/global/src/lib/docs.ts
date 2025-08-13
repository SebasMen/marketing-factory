import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { STATUS_CODES } from 'http';
import * as _ from 'lodash';
import { ApplicationError, IRequestError } from './errors';

/**
 * Generates API documentation for error responses.
 * It groups errors by HTTP status code and creates a response decorator for each group.
 * Each error is transformed into an example response using the ApplicationError class.
 * @param {IRequestError[]} errors Errors to return in the documentation.
 * @returns Api decorators for API documentation.
 */
export const ApiErrorsDocs = (...errors: IRequestError[]) => {
  const errorsByCode = _.groupBy(errors, 'httpCode');

  const decorators = Object.entries(errorsByCode).reduce((acc, [code, errors]) => {
    const exampleInfo =
      errors.length > 1
        ? {
            content: {
              'application/json': {
                examples: _.reduce(
                  errors,
                  (acc, error) => {
                    const value = new ApplicationError(error).asToResponse();
                    acc[value.id] = {
                      summary: error.description,
                      value,
                    };
                    return acc;
                  },
                  {},
                ),
              },
            },
          }
        : {
            example: new ApplicationError(errors[0]).asToResponse(),
          };

    acc.push(
      ApiResponse({
        status: Number(code),
        description: STATUS_CODES[code],
        ...exampleInfo,
      }),
    );
    return acc;
  }, []);

  return applyDecorators(...decorators);
};
