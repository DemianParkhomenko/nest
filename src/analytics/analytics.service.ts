import { Injectable, Logger } from '@nestjs/common';
import { setTimeout as sleep } from 'node:timers/promises';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  async sendEvent(event: string, data: any) {
    // Simulate sending an event
    await sleep(500);
    this.logger.log(`Sent event: ${event} ${data}`);
  }
}
