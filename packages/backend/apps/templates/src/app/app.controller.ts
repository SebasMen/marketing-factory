import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('one/:id')
  getOneData(@Param('id') id: string) {
    return this.appService.getOneData(id);
  }
}
