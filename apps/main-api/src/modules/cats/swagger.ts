import { CreatedModel } from 'libs/modules/global/database/entity';
import { Swagger } from 'libs/utils';

export class SwagggerResponse {
  static save = {
    201: Swagger.defaultResponseJSON({
      json: { id: '<id>', created: true } as CreatedModel,
      status: 201,
      description: 'Save successfully',
    }),
  };
}

export class SwagggerRequest {
  /** If requesters has a body.  */
}
