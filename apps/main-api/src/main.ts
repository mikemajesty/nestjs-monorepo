import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, name, version } from 'apps/main-api/package.json';
import { ICommonSecrets, ILoggerService } from 'libs/modules';
import { ApiException, AppExceptionFilter, ExceptionInterceptor, PerformanceInterceptor } from 'libs/utils';

import { MainModule } from './modules/module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    bufferLogs: true,
    cors: true,
  });

  const loggerService = app.get(ILoggerService);

  loggerService.setContext(name);
  app.useGlobalFilters(new AppExceptionFilter(loggerService));
  app.useGlobalInterceptors(new ExceptionInterceptor(), new PerformanceInterceptor(loggerService));

  const {
    mainAPI: { PORT },
    ENV,
  } = app.get(ICommonSecrets);

  app.useLogger(loggerService);

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addTag('Swagger Documentation')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  loggerService.log(`🟢 ${name} listening at ${PORT} on ${ENV?.toUpperCase()} 🟢\n`);

  await app.listen(PORT);

  loggerService.log(`🔵 Swagger listening at ${await app.getUrl()}/docs  🔵 \n`);

  process.on('unhandledRejection', (error: ApiException) => {
    error.context = 'unhandledRejection';
    loggerService.error(error);
  });
}

bootstrap();
