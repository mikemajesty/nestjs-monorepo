import { Swagger } from 'libs/utils';

export class SwagggerResponse {
  static save = {
    200: Swagger.defaultResponseJSON({ json: { _id: '<id>', _v: 0 }, status: 201, description: 'Save successfully' }),
  };
}

export class SwagggerRequest {
  /** If requesters has a body.  */
}
