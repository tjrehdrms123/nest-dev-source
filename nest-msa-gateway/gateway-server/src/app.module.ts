import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './config.service';

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
      useFactory: (configService: ConfigService) => {
        const options = configService.get('itemService');
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    AppService,
  ],
})
export class AppModule {}
