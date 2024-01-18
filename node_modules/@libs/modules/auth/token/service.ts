import { HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ISecretsService } from 'libs/modules/global/secrets/adapter';
import { ApiException } from 'libs/utils';

import { ITokenService as ITokenService } from './adapter';
import { Token } from './types';

@Injectable()
export class TokenService implements ITokenService {
  constructor(private readonly secret: ISecretsService) {}

  sign(model: object, options?: jwt.SignOptions): Token {
    const token = jwt.sign(
      model,
      this.secret.authAPI.jwtToken,
      options || {
        expiresIn: 300, // 5 minutes
      },
    );

    return { token };
  }

  async verify(token: string): Promise<jwt.JwtPayload | string> {
    return new Promise((res, rej) => {
      jwt.verify(token, this.secret.authAPI.jwtToken, (error, decoded) => {
        if (error)
          rej(new ApiException(error.message, HttpStatus.UNAUTHORIZED, `${TokenService.name}/${this.verify.name}`));

        res(decoded);
      });
    });
  }

  decode(token: string): jwt.JwtPayload | string {
    return jwt.decode(token);
  }
}
