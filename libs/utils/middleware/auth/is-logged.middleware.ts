import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ITokenService } from 'libs/modules/auth/token/adapter';
import { ILoggerService } from 'libs/modules/global/logger/adapter';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class IsLoggedMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: ITokenService, private readonly loggerService: ILoggerService) {}
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      if (!req.headers?.traceid) {
        req.headers.traceid = uuidv4();
      }

      this.loggerService.pino(req, res);
      throw new UnauthorizedException('no token provided');
    }

    const token = tokenHeader.split(' ')[1];

    const userDecoded: { userId?: string } = await this.tokenService.verify(token).catch((e) => {
      const tokenDecoded: { userId?: string } = this.tokenService.decode(token);
      e.user = tokenDecoded?.userId;

      if (!req.headers?.traceid) {
        req.headers.traceid = uuidv4();
      }

      this.loggerService.pino(req, res);
      next(e);
    });

    req.headers.user = userDecoded?.userId;

    next();
  }
}
