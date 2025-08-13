import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Core')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get current status of the API' })
  @ApiOkResponse({
    description: 'Status of the API',
    example: { message: 'Core, current status OK' },
  })
  @Get('/ping')
  getDataOne() {
    return this.appService.getApiStatus();
  }
}
