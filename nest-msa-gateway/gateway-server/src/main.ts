import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from './config.service';

async function bootstrap() {
  const config = new ConfigService();
  const port = config.get('port');

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`,
    'bootstrap',
  );
}
bootstrap();