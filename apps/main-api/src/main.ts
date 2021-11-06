import { NestFactory } from '@nestjs/core';
import { LoggerService } from '@shared/logger/service';
import { AppModule } from './app.module';
import { name } from '../package.json';
import { RequestMethod } from '@nestjs/common/enums';
import { SecretsService } from '@shared/secrets/service';
import { AppExceptionFilter } from '@shared/filters/http-exception.filter';
import { ExceptionInterceptor } from '@shared/interceptors/http-exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
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
    'Application',
  );

  await app.listen(port.MAIN_API);

  loggerService.log(
    `🔵 Swagger listening at ${await app.getUrl()}/api 🔵 \n`,
    'Swaggger',
  );
}
bootstrap();
