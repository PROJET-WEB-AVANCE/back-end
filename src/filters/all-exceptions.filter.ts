import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {Request, Response} from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : 500;

    const message = exception.message || 'Internal server error';

    response.status(status).json({
      statusCode: status,
      path: request.url,
      message,
    });
  }
}
