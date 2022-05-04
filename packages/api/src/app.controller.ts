import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { Installation } from '@teampink/interaction-molecule';
import MB1 from '@teampink/major-beat1';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/beats')
  getBeats() {
    return ([MB1] as Installation[]).map(({ name, description }) => ({
      name,
      description,
    }));
  }
}
