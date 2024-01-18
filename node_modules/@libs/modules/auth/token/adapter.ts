import * as jwt from 'jsonwebtoken';

import { Token } from './types';

export abstract class ITokenService {
  abstract sign<T = jwt.SignOptions>(model: object, options?: T): Token;
  abstract verify<T = jwt.JwtPayload>(token: string): Promise<T | string | unknown>;
  abstract decode<T = jwt.JwtPayload>(token: string): T | string | unknown;
}
