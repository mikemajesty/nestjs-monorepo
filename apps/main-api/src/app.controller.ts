import { Controller, Get } from '@nestjs/common';
import { ILoggerService } from '@shared/logger/adapter';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private logger: ILoggerService,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.logger.log('OI POVO', 'APP'));
    return this.appService.getHello();
  }
}
