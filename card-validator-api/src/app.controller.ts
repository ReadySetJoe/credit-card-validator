import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthy')
  healthCheck(): boolean {
    return this.appService.healthCheck();
  }
}
