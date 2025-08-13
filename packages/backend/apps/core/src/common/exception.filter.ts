/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationError, GlobalErrors } from '@mfactory-be/commonTypes/global';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomAuthExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Controlled exception
    if (exception instanceof ApplicationError) {
      const httpCode = exception.httpCode || 500;
      return response.status(httpCode).json(exception.asToResponse());
    }

    // Continue error
    let httpCode = exception.response?.statusCode ?? exception.status;
    const error =
      httpCode === 401
        ? new ApplicationError(GlobalErrors.UNAUTHORIZED())
        : new ApplicationError(
            GlobalErrors.INTERNAL_SERVER_ERROR(
              exception.response?.statusCode ?? exception.status,
              exception.response?.message ?? exception.message,
              exception.response?.error ?? exception.name,
            ),
          );
    httpCode = error.httpCode || 500;
    
    return response.status(httpCode).json(error.asToResponse());
  }
}
