import { RequestMethod } from '@nestjs/common/enums';
import { NestFactory } from '@nestjs/core';
import { AppExceptionFilter } from '@shared/filters/http-exception.filter';
import { ExceptionInterceptor } from '@shared/interceptors/http-exception.interceptor';
import { LoggerService } from '@shared/modules/logger/service';
import { SecretsService } from '@shared/modules/secrets/service';
import { name } from 'apps/main-api/package.json';

import { MainModule } from './modules/module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    bufferLogs: true,
  });

  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalInterceptors(new ExceptionInterceptor());

  const { ENV, port } = new SecretsService();

  const loggerService = new LoggerService(ENV);
  app.useLogger(loggerService);

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  loggerService.log(
    `🟢 ${name} listening at ${port.MAIN_API} on ${ENV?.toUpperCase()} 🟢\n`,
    name,
  );

  await app.listen(port.MAIN_API);
}
bootstrap();
