import { ErrorModel } from '@libs/shared';

import { name } from '../../../package.json';

export class SwagggerResponse {
  static getHealth = {
    200: {
      content: {
        'text/plain': {
          schema: {
            example: `${name} UP!!`,
          },
        },
      },
      status: 200,
    },
    500: {
      schema: {
        example: {
          error: {
            code: 500,
            traceId: '<traceId>',
            message: 'Internal Server Error',
            timestamp: '<timestamp>',
            path: '/health',
          },
        } as ErrorModel,
      },
      status: 500,
    },
  };
}

export class SwagggerRequest {
  /** If the controller has a body.  */
}
