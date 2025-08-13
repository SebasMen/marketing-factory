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
      // Remove httpCode from the exception to avoid sending it in the response
      // delete exception.httpCode;
      return response.status(httpCode).json(exception.asToResponse());
    }

    // Continue error
    const error = new ApplicationError(
      GlobalErrors.INTERNAL_SERVER_ERROR(
        exception.response?.statusCode ?? exception.status,
        exception.response?.message ?? exception.message,
        exception.response?.error ?? exception.name,
      ),
    );
    const httpCode = error.httpCode || 500;
    // Remove httpCode from the exception to avoid sending it in the response
    // delete error.httpCode;
    return response.status(httpCode).json(error.asToResponse());
  }
}
