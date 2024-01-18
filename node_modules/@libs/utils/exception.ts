import { HttpException, HttpStatus } from '@nestjs/common';

export type ErrorModel = {
  error: {
    code: string | number;
    traceid: string;
    message: string;
    timestamp: string;
    path: string;
  };
};

export class ApiException extends HttpException {
  context: string;
  traceid: string;
  statusCode: number;
  code?: string;
  config?: unknown;
  user?: string;

  constructor(
    error: string | object,
    status?: HttpStatus,
    private readonly ctx?: string,
  ) {
    super(error, [status, 500].find(Boolean));
    this.statusCode = super.getStatus();

    if (ctx) {
      this.context = ctx;
    }
  }
}
