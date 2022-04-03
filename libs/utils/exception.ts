import { HttpException, HttpStatus } from '@nestjs/common';

export type ErrorModel = {
  error: {
    code: string | number;
    traceId: string;
    message: string;
    timestamp: string;
    path: string;
  };
};

export class ApiException extends HttpException {
  context: string;
  uuid: string;
  statusCode: number;
  code?: string;
  config?: unknown;
  user?: string;

  constructor(error: string, status?: HttpStatus, context?: string) {
    super(error, status || 500);
    this.statusCode = super.getStatus();
    if (context) {
      this.context = context;
    }
  }
}
