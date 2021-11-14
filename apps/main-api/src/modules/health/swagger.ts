import { Swagger } from '@libs/utils';

import { name } from '../../../package.json';

export class SwagggerResponse {
  static getHealth = {
    200: Swagger.defaultResponseText({ status: 200, text: `${name} UP!!` }),
    500: Swagger.defaultResponseError({ status: 500, route: '/health', message: 'Internal Server Error' }),
  };
}

export class SwagggerRequest {
  /** If requesters has a body.  */
}
