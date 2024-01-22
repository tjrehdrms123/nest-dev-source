import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('ITEM_SERVICE')
    private readonly itemProxy: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'list' })
  executeList(name: string): string {
    console.log('Item-Server');
    return `todo: ${name}`;
  }

  @Get('list')
  getList(@Query('name') name: string): Observable<string> {
    return this.itemProxy.send({ cmd: 'list' }, name);
  }
}
