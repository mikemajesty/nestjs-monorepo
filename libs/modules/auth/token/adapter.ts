import * as jwt from 'jsonwebtoken';

import { Token } from './types';

export abstract class ITokenService {
  abstract sign(model: object, options?: jwt.SignOptions): Token;
  abstract verify(token: string): Promise<jwt.JwtPayload | string | unknown>;
  abstract decode(token: string): jwt.JwtPayload | string | unknown;
}
