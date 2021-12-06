import { ICommonSecrets, ILoggerService } from '@libs/modules';
import { AppExceptionFilter, ExceptionInterceptor } from '@libs/utils';
import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, name, version } from 'apps/other-api/package.json';

import { MainModule } from './modules/module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    bufferLogs: true,
    cors: true,
  });

  const loggerService = app.get(ILoggerService);

  app.useGlobalFilters(new AppExceptionFilter(loggerService));
  app.useGlobalInterceptors(new ExceptionInterceptor());

  const {
    otherAPI: { PORT },
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

  loggerService.log(`🟢 ${name} listening at ${PORT} on ${ENV?.toUpperCase()} 🟢\n`, 'Application');

  await app.listen(PORT);

  loggerService.log(`🔵 Swagger listening at ${await app.getUrl()}/docs 🔵 \n`, 'Swaggger');
}
bootstrap();
