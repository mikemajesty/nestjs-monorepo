import { CreatedModel } from 'libs/modules';
import { Swagger } from 'libs/utils/documentation/swagger';

export class SwagggerResponse {
  static save = {
    201: Swagger.defaultResponseJSON({
      json: { id: '<id>', created: true } as CreatedModel,
      status: 201,
      description: 'save successfully',
    }),
    401: Swagger.defaultResponseError({
      status: 401,
      route: 'api/cats',
      description: 'unauthorized',
    }),
    500: Swagger.defaultResponseError({
      status: 500,
      route: 'api/cats',
      description: 'save unsuccessfully',
    }),
  };
}

export class SwagggerRequest {
  /** If requesters has a body.  */
}
