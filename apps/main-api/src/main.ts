import { HttpStatus, RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, name, version } from 'apps/main-api/package.json';
import { ILoggerService } from 'libs/modules/global/logger/adapter';
import { ISecretsService } from 'libs/modules/global/secrets/adapter';
import { DEFAULT_TAG, SWAGGER_API_ROOT } from 'libs/utils/documentation/constants';
import { AppExceptionFilter } from 'libs/utils/filters/http-exception.filter';
import { ExceptionInterceptor } from 'libs/utils/interceptors/exception/http-exception.interceptor';
import { HttpLoggerInterceptor } from 'libs/utils/interceptors/logger/http-logger.interceptor';

import { MainModule } from './modules/module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    bufferLogs: true,
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED,
    }),
  );

  const loggerService = app.get(ILoggerService);

  loggerService.setApplication(name);
  app.useGlobalFilters(new AppExceptionFilter(loggerService));

  app.useGlobalInterceptors(new ExceptionInterceptor(), new HttpLoggerInterceptor(loggerService));

  const {
    mainAPI: { port: PORT },
    ENV,
  } = app.get(ISecretsService);

  app.useLogger(loggerService);

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addTag(DEFAULT_TAG)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);

  loggerService.log(`🟢 ${name} listening at ${PORT} on ${ENV?.toUpperCase()} 🟢\n`);

  await app.listen(PORT);

  loggerService.log(`🔵 Swagger listening at ${await app.getUrl()}/${SWAGGER_API_ROOT}  🔵 \n`);
}

bootstrap();
