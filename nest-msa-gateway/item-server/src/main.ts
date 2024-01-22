
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from './config.service';

async function bootstrap() {
  const config = new ConfigService();
  const options = config.get('service');
  const port = config.get('port');
  
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   options,
  // );
  
  // 하이브리드 설정
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(options);
  await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: TCP ${JSON.stringify(options)}`,
    'bootstrap-msa',
  );
}
bootstrap();