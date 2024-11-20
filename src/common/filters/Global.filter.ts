import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch()  // This will catch all types of exceptions
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();  // Access the request/response context for HTTP requests
    const response = ctx.getResponse(); // Get the response object
    const request = ctx.getRequest();  // Get the request object

    // Determine the status code from the exception (default to 500 for unknown exceptions)
    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    
    // Get the error message (from HttpException or the default error message)
    const message = exception.message || exception.response || 'Internal Server Error';

    // Send a structured error response
    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),  // Timestamp when the error was caught
      path: request.url,  // The URL of the request that caused the error
    });
  }
}
