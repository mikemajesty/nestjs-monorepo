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

  constructor(error: string, status?: HttpStatus) {
    super(error, status || 500);
    this.statusCode = super.getStatus();
  }
}
