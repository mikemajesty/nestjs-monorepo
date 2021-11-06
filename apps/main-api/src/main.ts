import { NestFactory } from '@nestjs/core';
import { LoggerService } from '@shared/logger/service';
import { AppModule } from './app.module';
import { name } from '../package.json';
import { SecretsService } from '@shared/secrets/service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { ENV, port } = new SecretsService();

  const loggerService = new LoggerService(ENV);
  app.useLogger(loggerService);

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
