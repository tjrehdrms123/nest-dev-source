import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    {
      provide: 'ITEM_SERVICE',
      useFactory: (configService) => {
        const options = configService.get('service');
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    AppService,
  ],
})
export class AppModule {}