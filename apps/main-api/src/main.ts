import { AppExceptionFilter, ExceptionInterceptor, LoggerService, SecretsService } from '@libs/shared';
import { RequestMethod } from '@nestjs/common/enums';
import { NestFactory } from '@nestjs/core';
import { name } from 'apps/main-api/package.json';

import { MainModule } from './modules/module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    bufferLogs: true,
  });

  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalInterceptors(new ExceptionInterceptor());

  const {
    mainAPI: { PORT },
    ENV,
  } = new SecretsService();

  const loggerService = new LoggerService(ENV);
  app.useLogger(loggerService);

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  loggerService.log(`🟢 ${name} listening at ${PORT} on ${ENV?.toUpperCase()} 🟢\n`, name);

  await app.listen(PORT);
}
bootstrap();
