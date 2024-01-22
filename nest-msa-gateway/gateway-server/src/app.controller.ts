import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Controller()
export class AppController {
  constructor(
    @Inject('ITEM_SERVICE')
    private readonly itemProxy: ClientProxy,
  ) {}

  @Get('list')
  getHello(@Query('name') name: string): Observable<string> {
    console.log('Gateway-Server');
    return this.itemProxy.send({ cmd: 'list' }, name);
  }
}