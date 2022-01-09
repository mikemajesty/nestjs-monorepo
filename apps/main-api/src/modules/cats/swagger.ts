import { CreatedModel } from 'libs/modules';
import { Swagger } from 'libs/utils';

export class SwagggerResponse {
  static save = {
    201: Swagger.defaultResponseJSON({
      json: { id: '<id>', created: true } as CreatedModel,
      status: 201,
      description: 'Save successfully',
    }),
    500: Swagger.defaultResponseError({
      status: 500,
      route: 'api/cats',
      description: 'Save unsuccessfully',
    }),
  };
}

export class SwagggerRequest {
  /** If requesters has a body.  */
}
