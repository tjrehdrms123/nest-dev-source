import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = {};

  constructor() {
    this.envConfig.port = +process.env.PORT;

    this.envConfig.itemService = {
      name: process.env.ITEM_SERVICE_NAME,
      transport: Transport.TCP,
      options: {
        host: process.env.ITEM_SERVICE_HOST,
        port: +process.env.ITEM_SERVICE_PORT,
      },
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}