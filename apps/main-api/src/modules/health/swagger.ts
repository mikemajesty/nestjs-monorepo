import { name } from 'apps/main-api/package.json';
import { Swagger } from 'libs/utils/documentation/swagger';

export const SwagggerResponse = {
  getHealth: {
    200: Swagger.defaultResponseText({ status: 200, text: `${name} UP!!` }),
    500: Swagger.defaultResponseError({
      status: 500,
      route: '/health',
    }),
  },
};

export class SwagggerRequest {
  /** If requesters has a body.  */
}
