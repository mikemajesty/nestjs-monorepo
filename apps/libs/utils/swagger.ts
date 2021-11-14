import { ApiResponseOptions } from '@nestjs/swagger';

import { ErrorModel } from './exception';

type SwaggerError = {
  status: number;
  route: string;
  message: string | unknown;
};

type SwaggerText = {
  status: number;
  text: string | unknown;
};

type SwaggerJSON = {
  status: number;
  json: unknown;
};

export class Swagger {
  static defaultResponseError({ message, route, status }: SwaggerError): ApiResponseOptions {
    return {
      schema: {
        example: {
          error: {
            code: status,
            traceId: '<traceId>',
            message: message,
            timestamp: '<timestamp>',
            path: route,
          },
        } as ErrorModel,
      },
      status: status,
    };
  }

  static defaultResponseText({ status, text }: SwaggerText): ApiResponseOptions {
    return {
      content: {
        'text/plain': {
          schema: {
            example: text,
          },
        },
      },
      status,
    };
  }

  static defaultResponseJSON({ status, json }: SwaggerJSON): ApiResponseOptions {
    return {
      content: {
        'application/json': {
          schema: {
            example: json,
          },
        },
      },
      status,
    };
  }
}
