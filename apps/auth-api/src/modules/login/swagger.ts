import { Token } from 'libs/modules/auth/token/types';
import { Swagger } from 'libs/utils/documentation/swagger';

export const SwagggerResponse = {
  login: {
    200: Swagger.defaultResponseJSON({
      status: 200,
      json: { token: '<token>' } as Token,
      description: 'user logged',
    }),
    412: Swagger.defaultResponseError({
      status: 412,
      route: 'api/login',
      message: 'username or password is invalid.',
      description: 'username or password is invalid.',
    }),
  },
};

export class SwagggerRequest {
  /** If requesters has a body.  */
}
