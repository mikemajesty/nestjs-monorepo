import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { ITokenService } from '../../../modules/auth/token/adapter';
import { ApiException } from '../../exception';

@Injectable()
export class IsLoggedMiddleware implements NestMiddleware {
  constructor(private tokenService: ITokenService) {}
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) throw new ApiException('no token provided', HttpStatus.UNAUTHORIZED, 'IsLoggedMiddleware');

    const token = tokenHeader.split(' ')[1];

    const userDecoded: { userId?: string } = await this.tokenService.verify(token).catch((e) => {
      const tokenDecoded: { userId?: string } = this.tokenService.decode(token);
      e.user = tokenDecoded?.userId;
      next(e);
    });

    req.headers.user = userDecoded?.userId;

    next();
  }
}
