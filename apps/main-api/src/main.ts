import { NestFactory } from '@nestjs/core';
import { LoggerService } from '@shared/logger/service';
import { AppModule } from './app.module';
import { name } from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  const ENV = 'dev';

  const loggerService = new LoggerService(ENV);
  app.useLogger(loggerService);

  loggerService.log(
    `🟢 ${name} listening at ${PORT} on ${ENV?.toUpperCase()} 🟢\n`,
    'Application',
  );

  await app.listen(PORT);

  loggerService.log(
    `🔵 Swagger listening at ${await app.getUrl()}/api 🔵 \n`,
    'Swaggger',
  );
}
bootstrap();
